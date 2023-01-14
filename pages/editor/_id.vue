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
import HistoryPlugin from "~/plugins/rete/history"

import Vuetify from "vuetify";
import AnalysisAmbitusComponent from "~/components/editor/rete/components/analysis/analysis_ambitus_component";
import AnalysisKeyComponent from "~/components/editor/rete/components/analysis/analysis_key_component";
import AnalysisRomanNumeralComponent from "~/components/editor/rete/components/analysis/analysis_roman_numeral_component";
import DetectModulationComponent from "~/components/editor/rete/components/detect/detect_modulation_component";
import DetectParallelsComponent from "~/components/editor/rete/components/detect/detect_parallels_component";
import DetectVoiceCrossingsComponent from "~/components/editor/rete/components/detect/detect_voice_crossings_component";

import OutputComponent from "~/components/editor/rete/components/output/output_component";
import SearchLyricsComponent from "~/components/editor/rete/components/search/search_lyrics_component";
import SearchPartComponent from "~/components/editor/rete/components/search/search_part_component";
import SelectMeasuresComponent from "~/components/editor/rete/components/select/select_measures_component";
import SelectNotesComponent from "~/components/editor/rete/components/select/select_notes_component";
import SelectPartsComponent from "~/components/editor/rete/components/select/select_parts_component";
import SourceCorpusComponent from "~/components/editor/rete/components/source/source_corpus_component";
import SourceTinynotationComponent from "~/components/editor/rete/components/source/source_tinynotation_component";
import TransformChordifyComponent from "~/components/editor/rete/components/transform/transform_chordify_component";
import TransformFlattenComponent from "~/components/editor/rete/components/transform/transform_flatten_component";
import TransformTransposeComponent from "~/components/editor/rete/components/transform/transform_transpose_component";
import PlotBarComponent from "~/components/editor/rete/components/plot/plot_bar_component";

import DetailsPanel from "~/components/editor/panels/details_panel.vue";
import EditorPanel from "~/components/editor/panels/editor_panel.vue";
import OSMDPanel from "~/components/editor/panels/osmd_panel.vue";

import { $pb, authStore, engineStore, fileStore, osmdStore, settingsStore } from "~/store";
// @ts-ignore
import { zoomAt } from "rete-area-plugin/src/zoom-at";
import SourceScoreComponent from "~/components/editor/rete/components/source/source_score_component";
import { Context } from "@nuxt/types";
import { example_files, File, FileData } from "~/models/file";
import { Data } from "rete/types/core/data";
import { RecordSubscription } from "pocketbase";
import PlotHistogramComponent from "~/components/editor/rete/components/plot/plot_histogram_component";
import PlotPanel from "~/components/editor/panels/plot_panel.vue";
import PlotScatterComponent from "~/components/editor/rete/components/plot/plot_scatter_component";
import PlotScatterWeightedComponent from "~/components/editor/rete/components/plot/plot_scatter_weighted_component";
import PlotBarWeightedComponent from "~/components/editor/rete/components/plot/plot_bar_weighted";

@Component({
  head: {
    title: "Editor"
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

  get loggedIn() {
    return authStore.loggedIn;
  }

  get showFirstColumn() {
    return settingsStore.settings.view.score || settingsStore.settings.view.plot;
  }

  get showScore() {
    return settingsStore.settings.view.score;
  }

  get showPlot() {
    return settingsStore.settings.view.plot;
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
    if (process.client) {
      await this.initEditor()
    }

    if (fileStore.file) {
      console.log("Subscribing...");

      $pb.collection('file_data').subscribe<FileData>(fileStore.file.expand.data.id, async (e: RecordSubscription<FileData>) => {
        if (e.action == "update" && this.editor) {
          const fileData = e.record;
          if (JSON.stringify(fileStore.file?.expand.data.json) !== JSON.stringify(fileData.json)) {
            this.editor.trigger('setdata' as any, { data: fileData.json, updateBackend: false });
          }
        }
      });
    }

    let page = document.getElementById("panel-grid");

    if (page) {
      const initialTopHeight = 0.7
      let rows = [
        page.clientHeight * initialTopHeight - 2,
        2,
        page.clientHeight * (1 - initialTopHeight),
      ];
      let newRowDefn = rows.map(c => c.toString() + "px").join(" ");
      page.style.gridTemplateRows = newRowDefn;
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
  }


  beforeDestroy() {
    console.log("Unsubscribing...");

    $pb.collection('file_data').unsubscribe();
    this.editor?.trigger('clearhistory' as any);
  }

  async initEditor() {
    const container = document.querySelector<HTMLElement>("#rete");
    const editor = new Rete.NodeEditor("vimu@0.1.0", container!);

    const background = document.createElement("div");
    background.classList.add("pixel-grid");

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
      new TransformFlattenComponent(editor),
      new SearchPartComponent(editor),
      new SearchLyricsComponent(editor),
      new DetectModulationComponent(editor),
      new DetectParallelsComponent(editor),
      new DetectVoiceCrossingsComponent(editor),
      new PlotBarComponent(editor),
      new PlotHistogramComponent(editor),
      new PlotScatterComponent(editor),
      new PlotScatterWeightedComponent(editor),
      new PlotBarWeightedComponent(editor),
      out

    ];

    for (const component of components) {
      editor.register(component);
      engine.register(component);
    }

    const data = await this.loadData();

    if (data) {
      editor.trigger('addhistory' as any, data);
      await editor.fromJSON(data)
      zoomAt(editor)
      await engineStore.process(editor.toJSON());
    }


    editor.on(
      [
        "process",
        // "nodecreated",
        // "noderemoved",
        "connectioncreated",
        "connectionremoved",
      ],
      async () => {
        if (editor.silent) {
          return
        }
        engineStore.setLoading(true);
        try {
          console.log(JSON.stringify(editor.toJSON()));

          await engineStore.process(editor.toJSON());
        } finally {
          engineStore.setLoading(false);
        }
      }
    );

    editor.on(
      [
        "process",
        "nodecreated",
        "noderemoved",
        "nodedragged",
        "connectioncreated",
        "connectionremoved",
      ],
      async (source) => {
        if (fileStore.file != null && !fileStore.readonly && !Object.keys(example_files).includes(fileStore.file.id) && !this.editor?.silent) {
          editor.trigger('addhistory' as any, editor.toJSON());
          fileStore.updateData({ id: fileStore.file.data, json: JSON.stringify(editor.toJSON()) })
        }
      }
    );

    editor.on("zoom", ({ source }) => {
      return source !== "dblclick";
    });

    editor.bind('setdata');
    editor.on('setdata' as any, async ({ data, updateBackend }: { data: Data, updateBackend: boolean }) => {
      if (!data) {
        return;
      }
      fileStore.setData(data);
      await editor.fromJSON(JSON.parse(JSON.stringify(data)));
      await engineStore.process(editor.toJSON());
      if (updateBackend && fileStore.file != null) {
        fileStore.updateData({ id: fileStore.file.data, json: JSON.stringify(editor.toJSON()) })
      }
    });

    this.editor = editor;
    osmdStore.setNeedsUpdate(true);
  }

  async loadData(): Promise<Data | null> {
    const fid = this.$route.params.id;
    if (fileStore.file == null || fileStore.file.id != fid) {
      await fileStore.get(fid);
    }

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
    }
    this.isLeftDragging = false;
    this.isRightDragging = false;
    this.isUpperDragging = false;
    this.setCursor("auto")
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

      let topColHeight = event.clientY

      const dragbarHeight = 2;

      let rows = [
        topColHeight,
        dragbarHeight,
        page!.clientHeight - dragbarHeight - topColHeight,
      ];

      let newRowDefn = rows.map(c => c.toString() + "px").join(" ");

      if (rows[0] > 100 && rows[2] > 100) {
        page!.style.gridTemplateRows = newRowDefn;
      }
    }
  }
}
</script>
<style>
#panel-grid {
  width: 100%;
  height: 100%;
  margin: 0;
  display: grid;
  grid-template-columns: 50% 2px calc(50% - 304px) 2px 300px;
  grid-template-rows: 1fr 2px 300px;
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