<template>
  <v-sheet class="page fill-height" style="overflow: hidden">
    <div ref="page" id="panel-grid" @mouseup="endDrag" @mousemove="onDrag">
      <div id="editor" class="pa-0">
        <editor-panel></editor-panel>
      </div>
      <div class="vertical-dragbar" @mousedown="startLeftDrag"></div>
      <div id="score" v-show="showScore">
        <client-only>
          <OSMD-panel></OSMD-panel>
        </client-only>
      </div>
      <div id="plotDragbar" class="horizontal-dragbar" v-show="showScore && showPlot" @mousedown="startUpperDrag"></div>

      <div class="vertical-dragbar" v-if="showFirstColumn" @mousedown="startRightDrag"></div>

      <div id="plot" v-show="showPlot">
        <plot-panel></plot-panel>
      </div>
      <div id="details" class="pa-0">
        <details-panel />
      </div>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, ProvideReactive, Vue, Watch } from "nuxt-property-decorator";
import Rete, { NodeEditor } from "rete";

import ConnectionPlugin from "rete-connection-plugin";
// @ts-ignore
import MinimapPlugin from "rete-minimap-plugin";
// @ts-ignore
import AutoArrangePlugin from 'rete-auto-arrange-plugin';
import HistoryPlugin from "~/plugins/rete/history";

import Vuetify from "vuetify";
import DetailsPanel from "~/components/editor/panels/details_panel.vue";
import EditorPanel from "~/components/editor/panels/editor_panel.vue";
import OSMDPanel from "~/components/editor/panels/osmd_panel.vue";
import PlotPanel from "~/components/editor/panels/plot_panel.vue";
import AnalysisAmbitusComponent from "~/components/editor/rete/components/analysis/analysis_ambitus_component";
import AnalysisKeyComponent from "~/components/editor/rete/components/analysis/analysis_key_component";
import AnalysisRomanNumeralComponent from "~/components/editor/rete/components/analysis/analysis_roman_numeral_component";
import DetectModulationComponent from "~/components/editor/rete/components/detect/detect_modulation_component";
import DetectParallelsComponent from "~/components/editor/rete/components/detect/detect_parallels_component";
import DetectVoiceCrossingsComponent from "~/components/editor/rete/components/detect/detect_voice_crossings_component";
import FiguredBassRealizeComponent from "~/components/editor/rete/components/figured_bass/figured_bass_realize_component";
import OutputComponent from "~/components/editor/rete/components/output/output_component";
import PlotBarComponent from "~/components/editor/rete/components/plot/plot_bar_component";
import PlotBarWeightedComponent from "~/components/editor/rete/components/plot/plot_bar_weighted";
import PlotHistogramComponent from "~/components/editor/rete/components/plot/plot_histogram_component";
import PlotScatterComponent from "~/components/editor/rete/components/plot/plot_scatter_component";
import PlotScatterWeightedComponent from "~/components/editor/rete/components/plot/plot_scatter_weighted_component";
import SearchLyricsComponent from "~/components/editor/rete/components/search/search_lyrics_component";
import SearchPartComponent from "~/components/editor/rete/components/search/search_part_component";
import SelectMeasuresComponent from "~/components/editor/rete/components/select/select_measures_component";
import SelectNotesComponent from "~/components/editor/rete/components/select/select_notes_component";
import SelectPartsComponent from "~/components/editor/rete/components/select/select_parts_component";
import SourceCorpusComponent from "~/components/editor/rete/components/source/source_corpus_component";
import SourceTinynotationComponent from "~/components/editor/rete/components/source/source_tinynotation_component";
import TransformChordifyComponent from "~/components/editor/rete/components/transform/transform_chordify_component";
import TransformTransposeComponent from "~/components/editor/rete/components/transform/transform_transpose_component";

import { Context } from "@nuxt/types";
import { RecordSubscription } from "pocketbase";
import { $pb, authStore, engineStore, fileStore, osmdStore, pluginStore, settingsStore } from "~/store";
// @ts-ignore
import { zoomAt } from "rete-area-plugin/src/zoom-at";
import { Data } from "rete/types/core/data";
import PluginComponent from "~/components/editor/rete/components/plugins/plugin_component";
import SourceScoreComponent from "~/components/editor/rete/components/source/source_score_component";
import TransformAppendComponent from "~/components/editor/rete/components/transform/transform_append_component";
import TransformStackComponent from "~/components/editor/rete/components/transform/transform_stack_component";
import { example_files, FileData } from "~/models/file";
import { EditorSettings } from "~/models/settings";
import { NodePluginEditor } from "~/utils/rete";

@Component({
  head: {
    title: "Editor",
  },
  layout: "editor",
  fetchOnServer: false,
  components: {
    EditorPanel,
    DetailsPanel,
    OSMDPanel,
    PlotPanel
  },
})
export default class Editor extends Vue {
  @ProvideReactive()
  editor: NodeEditor | null = null;

  isLeftDragging: boolean = false;
  isRightDragging: boolean = false;
  isUpperDragging: boolean = false;

  nodeWasTranslated: boolean = false;
  removingNode: boolean = false;

  get loggedIn() {
    return authStore.loggedIn;
  }

  get showFirstColumn() {
    return settingsStore.settings.score || settingsStore.settings.plot;
  }

  get showScore() {
    return settingsStore.settings.score;
  }

  get showPlot() {
    return settingsStore.settings.plot;
  }

  async fetch() {
    await settingsStore.getEditorSettings()
    await pluginStore.list({ page: 1 });
  }

  @Watch("showScore")
  onShowScoreChange(value: boolean) {
    let bottomcol = document.getElementById("plot");
    if (bottomcol) {
      bottomcol.style.gridRow = value ? "3/4" : "1/4";
    }
  }

  @Watch("showPlot")
  onShowPlotChange(value: boolean) {
    let bottomcol = document.getElementById("score");
    if (bottomcol) {
      bottomcol!.style.gridRow = value ? "1/2" : "1/4";
      bottomcol!.style.gridColumn = "3/4";
    }
  }

  @Watch("showFirstColumn")
  onShowFirstColumnChange(value: boolean) {
    let editorcol = document.getElementById("editor");
    let page = document.getElementById("panel-grid");

    if (value) {
      editorcol!.style.gridColumn = "1/2";
      page!.style.gridTemplateColumns = "50% 2px calc(50% - 304px) 2px 300px";
    } else {
      editorcol!.style.gridColumn = "1/4";
    }
    this.editor?.view.resize()
  }

  validate({ params }: Context) {
    return params.id !== undefined;
  }

  async mounted() {
    const fid = this.$route.params.id;
    if (fileStore.file == null || fileStore.file.id != fid) {
      await fileStore.get(fid);
    }

    if (fileStore.file) {
      console.log("Subscribing...");

      $pb.collection('file_data').subscribe<FileData>(fileStore.file.expand.data.id, async (e: RecordSubscription<FileData>) => {
        if (e.action == "update") {
          const fileData = e.record;

          if (fileData.editors?.length != fileStore.file?.expand.data.editors?.length) {
            fileStore.setEditors(fileData.editors);

            await fileStore.getEditors(fileData.editors);
          }

          if (JSON.stringify(fileStore.file?.expand.data.json) !== JSON.stringify(fileData.json)) {
            fileStore.setData(fileData.json);

            if (this.editor) {
              this.editor.trigger('setdata' as any, { data: fileData.json, updateBackend: false });
            }
          }

        }
      });
    }

    let page = document.getElementById("panel-grid");

    if (page) {
      page.style.gridTemplateRows = settingsStore.settings.grid_rows;
      page.style.gridTemplateColumns = settingsStore.settings.grid_columns;
    }

    if (!this.showFirstColumn) {
      this.onShowFirstColumnChange(false)
    }
    if (!this.showScore) {
      this.onShowScoreChange(false)
    }
    if (!this.showPlot) {
      this.onShowPlotChange(false)
    }

    if (process.client) {
      await this.initEditor()
    }
  }


  beforeDestroy() {
    console.log("Unsubscribing...");

    if (fileStore.file) {
      $pb.collection('file_data').unsubscribe(fileStore.file.expand.data.id);
    }
    this.editor?.trigger('clearhistory' as any);
    fileStore.setFile(null)
  }

  async initEditor() {
    const container = document.querySelector<HTMLElement>("#rete");
    const editor = new NodePluginEditor("vimu@0.1.0", container!);

    const background = document.createElement("div");
    if (settingsStore.settings.pixel_grid) {
      background.classList.add("pixel-grid");
    }

    const AreaPlugin = require("rete-area-plugin").default;
    editor.use(AreaPlugin, { background: background });
    editor.use(ConnectionPlugin);
    const VueRenderPlugin = require("rete-vue-render-plugin").default;
    editor.use(VueRenderPlugin, {
      options: {
        vuetify: new Vuetify(
          {
            theme: {
              themes: {
                light: {
                  primary: '#000000',
                  accent: '#2962FF',
                }
              }
            }
          }
        ),
      },
    });
    editor.use(MinimapPlugin);
    editor.use(HistoryPlugin);

    const minimap = document.getElementsByClassName(
      "minimap"
    )[0] as HTMLElement;

    if (settingsStore.settings.minimap === false) {
      minimap.style.display = "none"
    }

    const [w, h] = [
      editor.view.container.clientWidth,
      editor.view.container.clientHeight,
    ];
    editor.use(AutoArrangePlugin, { offset: { x: w / 2, y: h / 2 } });

    (editor.view.area as any)._zoom.intensity = 0.03;

    const engine = new Rete.Engine("vimu@0.1.0");


    const out = new OutputComponent(editor);

    const components = [
      new SourceCorpusComponent(editor),
      new SourceScoreComponent(editor),
      new SourceTinynotationComponent(editor),
      new SelectMeasuresComponent(editor),
      new SelectPartsComponent(editor),
      new SelectNotesComponent(editor),
      new AnalysisKeyComponent(editor),
      new AnalysisAmbitusComponent(editor),
      new AnalysisRomanNumeralComponent(editor),
      new TransformTransposeComponent(editor),
      new TransformChordifyComponent(editor),
      new TransformAppendComponent(editor),
      new TransformStackComponent(editor),
      new SearchPartComponent(editor),
      new SearchLyricsComponent(editor),
      new FiguredBassRealizeComponent(editor),
      new DetectModulationComponent(editor),
      new DetectParallelsComponent(editor),
      new DetectVoiceCrossingsComponent(editor),
      new PlotBarComponent(editor),
      new PlotHistogramComponent(editor),
      new PlotScatterComponent(editor),
      new PlotScatterWeightedComponent(editor),
      new PlotBarWeightedComponent(editor),
      new PluginComponent(editor),
      out

    ];

    for (const component of components) {
      editor.register(component);
      engine.register(component);
    }

    editor.on(
      [
        "process",
        "connectioncreated",
      ],
      async () => {
        if (editor.silent) {
          return
        }
        console.log(JSON.stringify(editor.toJSON()));

        engineStore.process(editor.toJSON());
        await this.updateFileData();
      }
    );

    editor.on(
      [
        "connectionremoved"
      ],
      async () => {
        if (editor.silent || this.removingNode) {
          return
        }
        console.log(JSON.stringify(editor.toJSON()));

        engineStore.process(editor.toJSON());
        await this.updateFileData();
      }
    );


    editor.on("noderemove", () => {
      this.removingNode = true;
    })

    editor.on(
      [
        "noderemoved"
      ],
      async () => {
        this.removingNode = false;

        if (editor.silent) {
          return
        }
        console.log(JSON.stringify(editor.toJSON()));

        engineStore.process(editor.toJSON());
        await this.updateFileData();
      }
    );

    editor.on(
      [
        "nodecreated",
      ],
      async (source) => {
        await this.updateFileData();
      }
    );

    editor.on('translatenode', (node) => {
      this.nodeWasTranslated = true;
    })

    editor.on("nodedragged", async () => {
      if (this.nodeWasTranslated === true) {
        await this.updateFileData();
      }
      this.nodeWasTranslated = false;
    })

    editor.bind('setdata');
    editor.on('setdata' as any, async ({ data, updateBackend }: { data: Data, updateBackend: boolean }) => {
      if (!data) {
        return;
      }
      await editor.fromJSON(JSON.parse(JSON.stringify(data)));
      engineStore.process(editor.toJSON());
      if (updateBackend) {
        await this.updateFileData(false);
      }
    });

    editor.on("zoom", ({ source }) => {
      return source !== "dblclick";
    });

    this.editor = editor;

    if (this.$route.params.id == "example-plots") {
      const settings = JSON.parse(JSON.stringify(settingsStore.settings)) as EditorSettings;
      settings.plot = true;
      settingsStore.changeSettings(settings);
    }

    const data = await this.loadData();

    if (data) {
      editor.trigger('addhistory' as any, data);
      await editor.fromJSON(data)
      zoomAt(editor)
      await engineStore.process(editor.toJSON());

    }

    osmdStore.setNeedsUpdate(true);
  }

  async updateFileData(addHistory: boolean = true) {
    if (fileStore.file != null && !Object.keys(example_files).includes(fileStore.file.id) && !this.editor?.silent) {
      const editorJson = this.editor?.toJSON();
      if (addHistory) {
        this.editor?.trigger('addhistory' as any, editorJson);
      }
      fileStore.updateData({ id: fileStore.file.expand.data.id, json: JSON.stringify(editorJson) })
    }
  }

  async loadData(): Promise<Data | null> {
    if (fileStore.file == null) {
      return null
    }

    return JSON.parse(JSON.stringify(fileStore.file!.expand.data.json));
  }

  setCursor(cursor: CSSStyleDeclaration["cursor"]) {
    let page = document.getElementById("panel-grid");
    page!.style.cursor = cursor;
  }

  startLeftDrag() {
    this.isLeftDragging = true;

    this.setCursor("ew-resize");
  }

  startRightDrag() {
    this.isRightDragging = true;

    this.setCursor("ew-resize");
  }

  startUpperDrag() {
    this.isUpperDragging = true;

    this.setCursor("ns-resize");
  }

  endDrag() {
    if (this.isLeftDragging || this.isRightDragging) {
      osmdStore.setNeedsUpdate(true);
      this.setCursor("auto");
      this.editor!.view.resize();
      this.persistPanelSizes()

    }
    this.isLeftDragging = false;
    this.isRightDragging = false;
    this.isUpperDragging = false;
    this.setCursor("auto")

  }

  persistPanelSizes() {
    let page = document.getElementById("panel-grid");
    const settings: EditorSettings = JSON.parse(
      JSON.stringify(settingsStore.settings)
    );

    settings.grid_columns = page!.style.gridTemplateColumns;
    settings.grid_rows = page!.style.gridTemplateRows;

    settingsStore.updateEditorSettings(settings);
  }

  onDrag(event: MouseEvent) {
    window.getSelection()?.removeAllRanges();
    if (this.isLeftDragging || this.isRightDragging) {
      let page = document.getElementById("panel-grid");
      let leftcol = document.getElementById("editor");
      let rightcol = document.getElementById("details");

      const dragbarWidth = 2;
      const pageWidth = page!.clientWidth;

      let leftColWidth = this.isLeftDragging ? event.clientX : leftcol!.clientWidth;
      let rightColWidth = rightcol!.clientWidth;

      if (this.isRightDragging) {
        rightColWidth = page!.clientWidth - event.clientX;
      } else if (!this.showFirstColumn) {
        rightColWidth = pageWidth - dragbarWidth - leftColWidth;
      }

      let centerColWidth = this.showFirstColumn ? pageWidth - (2 * dragbarWidth) - leftColWidth - rightColWidth : 0;

      let cols = [
        (leftColWidth / pageWidth) * 100 + "%",
        dragbarWidth + "px",
        (centerColWidth / pageWidth) * 100 + "%",
        dragbarWidth + "px",
        (rightColWidth / pageWidth) * 100 + "%",
      ];

      let newColDefn = cols.join(" ");

      if (leftColWidth > 200 && (!this.showFirstColumn || centerColWidth > 200) && rightColWidth > 128) {
        page!.style.gridTemplateColumns = newColDefn;
      }

    } else if (this.isUpperDragging) {
      let page = document.getElementById("panel-grid");
      const pageHeight = page!.clientHeight;
      const dragbarHeight = 2;

      let topColHeight = event.clientY
      let bottomColHeight = pageHeight - dragbarHeight - event.clientY


      let rows = [
        (topColHeight / pageHeight) * 100 + "%",
        dragbarHeight + "px",
        (bottomColHeight / pageHeight) * 100 + "%",
      ];

      let newRowDefn = rows.join(" ");

      if (topColHeight > 100 && bottomColHeight > 100) {
        page!.style.gridTemplateRows = newRowDefn;
      }
    }
  }
}
</script>
<style scoped>
#panel-grid {
  width: 100%;
  height: 100%;
  margin: 0;
  display: grid;
  grid-template-columns: 50% 2px calc(50% - 304px) 2px 300px;
  grid-template-rows: 60% 2px calc(40% - 2px);
  max-height: 100vh;
}

.vertical-dragbar {
  grid-row: span 3;
  cursor: ew-resize;
  background-color: #e0e0e0;
  z-index: 1
}

.horizontal-dragbar {
  background-color: #e0e0e0;
  cursor: ns-resize;
  z-index: 1
}

#plotDragbar {
  grid-row: 2 / 3;
  grid-column: 3 / 4;
}

#editor {
  grid-row: 1/4;
  max-height: 100vh;
}

#details {
  grid-row: 1/4;
  grid-column: 5/6;
  background-color: white;
  z-index: 1;
}

#score {
  max-height: 100vh;
}

#plot {
  grid-column: 3/4;
  z-index: 1;
}
</style>