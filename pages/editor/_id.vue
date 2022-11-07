<template>
  <v-sheet class="main fill-height">
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
      <div id="logDragbar" class="horizontal-dragbar" v-show="showScore && showLog" @mousedown="startUpperDrag"></div>

      <div class="vertical-dragbar" v-if="showFirstColumn" @mousedown="startRightDrag"></div>

      <div id="log" v-show="showLog">
        <log-panel></log-panel>
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
import HistoryPlugin from "rete-history-plugin";
// @ts-ignore
import AutoArrangePlugin from 'rete-auto-arrange-plugin';

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
import SelectPartComponent from "~/components/editor/rete/components/select/select_part_component";
import SourceCorpusComponent from "~/components/editor/rete/components/source/source_corpus_component";
import SourceTinynotationComponent from "~/components/editor/rete/components/source/source_tinynotation_component";
import TransformChordifyComponent from "~/components/editor/rete/components/transform/transform_chordify_component";
import TransformFlattenComponent from "~/components/editor/rete/components/transform/transform_flatten_component";
import TransformTransposeComponent from "~/components/editor/rete/components/transform/transform_transpose_component";

import DetailsPanel from "~/components/editor/panels/details_panel.vue";
import EditorPanel from "~/components/editor/panels/editor_panel.vue";
import LogPanel from "~/components/editor/panels/log_panel.vue";
import OSMDPanel from "~/components/editor/panels/osmd_panel.vue";

import { engineStore, fileStore, osmdStore, settingsStore } from "~/store";
// @ts-ignore
import { zoomAt } from "rete-area-plugin/src/zoom-at";

@Component({
  layout: "editor",
  components: {
    EditorPanel,
    DetailsPanel,
    OSMDPanel,
    LogPanel
  },
})
export default class Editor extends Vue {
  @ProvideReactive()
  editor: NodeEditor | null = null;

  isLeftDragging: boolean = false;
  isRightDragging: boolean = false;
  isUpperDragging: boolean = false;

  get showFirstColumn() {
    return settingsStore.settings.view.score || settingsStore.settings.view.log;
  }

  get showScore() {
    return settingsStore.settings.view.score;
  }

  get showLog() {
    return settingsStore.settings.view.log;
  }

  @Watch("showScore")
  onShowScoreChange(value: boolean) {
    let bottomcol = document.getElementById("log");
    bottomcol!.style.gridRow = value ? "3/4" : "1/4";
  }

  @Watch("showLog")
  onShowLogChange(value: boolean) {
    let bottomcol = document.getElementById("score");
    bottomcol!.style.gridRow = value ? "1/2" : "1/4";
    bottomcol!.style.gridColumn = "3/4";
  }

  @Watch("showFirstColumn")
  onShowFirstColumnChange(value: boolean) {
    let editorcol = document.getElementById("editor");
    editorcol!.style.gridColumn = value ? "1/2" : "1/4";
    this.editor?.view.resize();
  }


  async fetch() {
    const fid = this.$route.params.id;
    await fileStore.get(fid);
    if (fileStore.file === null) {
      this.$nuxt.error({
        statusCode: 404,
        message: "File not found",
      });
    }
    await this.initEditor()
  }


  async mounted() {
    let page = document.getElementById("panel-grid");

    const initialTopHeight = 0.7
    let rows = [
      page!.clientHeight * initialTopHeight - 2,
      2,
      page!.clientHeight * (1 - initialTopHeight),
    ];
    let newRowDefn = rows.map(c => c.toString() + "px").join(" ");
    page!.style.gridTemplateRows = newRowDefn;


    if (!this.showFirstColumn) {
      this.onShowFirstColumnChange(false)
    }
    if (!this.showScore) {
      this.onShowScoreChange(false)
    }
    if (!this.showLog) {
      this.onShowLogChange(false)
    }



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
        vuetify: new Vuetify(),
      },
    });
    editor.use(MinimapPlugin);
    editor.use(HistoryPlugin, { keyboard: false });
    const [w, h] = [
      editor.view.container.clientWidth,
      editor.view.container.clientHeight,
    ];
    editor.use(AutoArrangePlugin, { offset: { x: w / 2, y: h / 2 } });

    const engine = new Rete.Engine("vimu@0.1.0");

    editor.on(
      [
        "process",
        // "nodecreated",
        // "noderemoved",
        "connectioncreated",
        "connectionremoved",
      ],
      async () => {
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
      async () => {
        fileStore.update({ id: fileStore.file!.id, json: JSON.stringify(this.editor?.toJSON()) })
      }
    );

    editor.on("zoom", ({ source }) => {
      return source !== "dblclick";
    });

    const out = new OutputComponent(editor);

    const components = [
      new SourceCorpusComponent(editor),
      new SourceTinynotationComponent(editor),
      new SelectMeasuresComponent(editor),
      new SelectPartComponent(editor),
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
      out

    ];

    for (const component of components) {
      editor.register(component);
      engine.register(component);
    }

    // const outputNode = await out.createNode();
    // outputNode.position = [w - 2 * 108, h / 2];
    // editor.addNode(outputNode);

    const deepCopy = JSON.parse(JSON.stringify(fileStore.file!.json))
    await editor!.fromJSON(deepCopy)
    zoomAt(editor)

    this.editor = editor;
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
    } else
      if (this.isUpperDragging) {

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

      let leftColWidth = this.isLeftDragging ? event.clientX : leftcol!.clientWidth;
      let rightColWidth = this.isRightDragging ? page!.clientWidth - event.clientX : rightcol!.clientWidth;

      const dragbarWidth = 2;

      let cols = [
        leftColWidth,
        dragbarWidth,
        page!.clientWidth - (2 * dragbarWidth) - leftColWidth - rightColWidth,
        dragbarWidth,
        rightColWidth
      ];

      let newColDefn = cols.map(c => c.toString() + "px").join(" ");

      if (cols[0] > 200 && cols[2] > 200 && cols[4] > 128) {
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
  grid-template-columns: 50% 2px 1fr 2px 300px;
  grid-template-rows: 1fr 2px 300px;
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

#logDragbar {
  grid-row: 2 / 3;
  grid-column: 3 / 4;
}

#editor {
  grid-row: 1/4
}

#details {
  grid-row: 1/4;
  grid-column: 5/6;
}

#log {
  grid-column: 3/4;
  z-index: 1;
}
</style>