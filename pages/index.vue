<template>
  <v-sheet class="main">
    <div id="wrapper" class="d-flex fill-height ma-0" style="flex-wrap: nowrap">
      <div id="editor" class="pa-0" style="flex: 1 1 50%">
        <editor-panel></editor-panel>
      </div>
      <div id="editor-handler" class="vertical-handler" v-if="showFirstColumn" style="background-color: lightgrey;">
      </div>
      <div class="pa-0" style="flex: 1 1 auto; min-width: 0; max-height: calc(100vh - 4px);" v-if="showFirstColumn">
        <div id="score" style="height: 72%" v-show="showScore">
          <client-only>
            <OSMD-panel></OSMD-panel>
          </client-only>
        </div>
        <div id="score-handler" class="horizontal-handler"></div>

        <div id="log" style="height: 28%" v-show="showLog">
          <log-panel></log-panel>
        </div>
      </div>
      <div class="pa-0" style="
          z-index: 1;
          background-color: #ffffff;
          border-left: 2px solid lightgrey
          flex: 0 0 15%;
          width: 15%;
          max-width: 300px;
        ">
        <details-panel />
      </div>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Provide, ProvideReactive, Vue } from "nuxt-property-decorator";
import Rete, { NodeEditor } from "rete";
// @ts-ignore
import AreaPlugin from "rete-area-plugin";
import ConnectionPlugin from "rete-connection-plugin";
// @ts-ignore
import MinimapPlugin from "rete-minimap-plugin";
// @ts-ignore
import HistoryPlugin from "rete-history-plugin";
// @ts-ignore
import AutoArrangePlugin from 'rete-auto-arrange-plugin';

import Vuetify from "vuetify";
import AnalysisAmbitusComponent from "~/components/rete/components/analysis/analysis_ambitus_component";
import AnalysisKeyComponent from "~/components/rete/components/analysis/analysis_key_component";
import AnalysisRomanNumeralComponent from "~/components/rete/components/analysis/analysis_roman_numeral_component";
import SearchLyricsComponent from "~/components/rete/components/search/search_lyrics_component";
import SearchPartComponent from "~/components/rete/components/search/search_part_component";
import SelectMeasuresComponent from "~/components/rete/components/select/select_measures_component";
import SelectNotesComponent from "~/components/rete/components/select/select_notes_component";
import SelectPartComponent from "~/components/rete/components/select/select_part_component";
import SourceCorpusComponent from "~/components/rete/components/source/source_corpus_component";
import SourceTinynotationComponent from "~/components/rete/components/source/source_tinynotation_component";
import TransformChordifyComponent from "~/components/rete/components/transform/transform_chordify_component";
import TransformFlattenComponent from "~/components/rete/components/transform/transform_flatten_component";
import TransformTransposeComponent from "~/components/rete/components/transform/transform_transpose_component";

import DetailsPanel from "~/components/panels/details_panel.vue";
import EditorPanel from "~/components/panels/editor_panel.vue";
import LogPanel from "~/components/panels/log_panel.vue";
import OSMDPanel from "~/components/panels/osmd_panel.vue";
import { osmdStore, settingsStore } from "~/store";



@Component({
  components: {
    EditorPanel,
    DetailsPanel,
    OSMDPanel,
    LogPanel
  },
})
export default class IndexPage extends Vue {
  x = 0;
  y = 0;
  editorX = 0;
  editorY = 0;

  @ProvideReactive()
  editor: NodeEditor | null = null;

  get showFirstColumn() {
    return settingsStore.settings.view.score || settingsStore.settings.view.log;
  }

  get showScore() {
    return settingsStore.settings.view.score;
  }

  get showLog() {
    return settingsStore.settings.view.log;
  }

  async mounted() {
    const container = document.querySelector<HTMLElement>("#rete");
    const editor = new Rete.NodeEditor("vimu@0.1.0", container!);

    const background = document.createElement("div");
    background.classList.add("pixel-grid");

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
    editor.use(AutoArrangePlugin, {offset: {x: w/2, y: h/2} });

    const engine = new Rete.Engine("vimu@0.1.0");

    editor.on(
      [
        "process",
        // "nodecreated",
        // "noderemoved",
        "connectioncreated",
        //"connectionremoved",
      ],
      async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
        if (editor.selected.list.length) {
          editor.selectNode(editor.selected.list[0]);
        }

        osmdStore.setNeedsUpdate(true);
      }
    );

    editor.on("zoom", ({ source }) => {
      return source !== "dblclick";
    });

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
    ];

    for (const component of components) {
      editor.register(component);
      engine.register(component);
    }

    this.editor = editor;

    this.handleDrag()
  }

  handleDrag() {
    const editorHandler = document.getElementById("editor-handler");
    const editor = document.getElementById("editor");
    var isEditorHandlerDragging = false;

    const scoreHandler = document.getElementById("score-handler");
    const score = document.getElementById("score");
    var isScoreHandlerDragging = false;

    const log = document.getElementById("log");

    document.addEventListener("mousedown", function (e) {
      if (e.target === editorHandler) {
        isEditorHandlerDragging = true;
      } else if (e.target === scoreHandler) {
        isScoreHandlerDragging = true;
      }
    });

    document.addEventListener("mousemove", function (e) {
      if (isEditorHandlerDragging) {
        const editorMinWidth = 276;

        editor!.style.width = Math.max(editorMinWidth, e.clientX - 4) + "px";
        editor!.style.flexGrow = "0";
        editor!.style.flexBasis = "auto";
      } else if (isScoreHandlerDragging) {
        const scoreMinHeight = 20;
        const scoreMaxHeight = 80;

        const scoreHeight = Math.floor(((e.clientY - 2) / window.innerHeight) * 100);
        if (scoreHeight > scoreMinHeight && scoreHeight < scoreMaxHeight) {
          score!.style.height = scoreHeight + "%";
          log!.style.height = 100 - scoreHeight + "%";
        }
      }
    });

    document.addEventListener("mouseup", function (e) {
      if (isEditorHandlerDragging) {
        // Editor width changed -> rerender the score
        osmdStore.setNeedsUpdate(true)
      }
      isEditorHandlerDragging = false;
      isScoreHandlerDragging = false;
    });
  }
}
</script>
<style>
.vertical-handler {
  width: 2px;
  padding: 0;
  cursor: ew-resize;
  flex: 0 0 auto;
}

.vertical-handler::before {
  content: "";
  display: block;
  width: 2px;
  height: 100%;
  margin: 0 auto;
}

.horizontal-handler {
  height: 2px;
  padding: 0;
  cursor: ns-resize;
  flex: 0 0 auto;
}

.horizontal-handler::before {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  margin: 0 auto;
}
</style>