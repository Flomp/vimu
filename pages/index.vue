<template>
  <v-sheet class="main">
    <h5 class="text-button grey darken-4 px-3">Editor</h5>
    <v-progress-linear
      :value="initialised * 100"
      v-if="showInitialising"
    ></v-progress-linear>
    <v-progress-linear
      indeterminate
      height="1"
      v-if="showLoading"
      style="position: absolute; top: 36px; z-index: 2"
    ></v-progress-linear>
    <div
      class="fill-height d-flex justify-center align-center"
      style="position: absolute; top: 0; width: 100%"
      v-if="showInitialising"
    >
      <code>{{ loadingText }}</code>
    </div>
    <div
      id="rete"
      @contextmenu="showContextMenu"
      :class="{ 'd-none': showInitialising }"
    ></div>
    <sub-menu
      v-model="showMenu"
      :positionX="x"
      :positionY="y"
      :items="menuItems"
      @menu-click="createNode"
      v-if="!showInitialising"
    />
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import Rete, { Component as rComponent } from "rete";
// @ts-ignore
import AreaPlugin from "rete-area-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import Vuetify from "vuetify";
import { MenuItem, menuItems } from "~/components/palette/menu_item";
import SubMenu from "~/components/palette/sub_menu.vue";
import AnalysisKeyComponent from "~/components/rete/components/analysis/analysis_key_component";
import AnalysisRomanNumeralComponent from "~/components/rete/components/analysis/analysis_roman_numeral_component";

import SourceCorpusComponent from "~/components/rete/components/source/source_corpus_component";
import TransformChordifyComponent from "~/components/rete/components/transform/transform_chordify_component";
import TransformFlattenComponent from "~/components/rete/components/transform/transform_flatten_component";
import TransformMeasuresComponent from "~/components/rete/components/transform/transform_measures_component";
import TransformTransposeComponent from "~/components/rete/components/transform/transform_transpose_component";

import { LogLevel } from "~/models/log";
import { logStore, pyodideStore } from "~/store";
import { reteStore } from "~/store/rete";

@Component({
  components: {
    SubMenu,
  },
})
export default class IndexPage extends Vue {
  showMenu = false;
  x = 0;
  y = 0;
  editorX = 0;
  editorY = 0;
  menuItems = menuItems;

  showInitialising: boolean = this.initialised < 1;

  get showLoading(): boolean {
    return pyodideStore.loading;
  }

  get initialised(): number {
    return pyodideStore.initialised;
  }

  get loadingText(): string {
    switch (this.initialised) {
      case 0.1:
        return "Loading core...";
      case 0.4:
        return "Initialising...";
      case 0.6:
        return "Loading libraries...";
      case 1.0:
        return "Loading complete 🎉";
      default:
        return "Loading...";
    }
  }

  @Watch("initialised")
  onInitialisedChanged(value: number) {
    if (value == 1) {
      setTimeout(() => (this.showInitialising = false), 200);
    }
  }

  async mounted() {
    const container = document.querySelector<HTMLElement>("#rete");
    const editor = new Rete.NodeEditor("vimu@0.1.0", container!);

    const background = document.createElement("div");
    background.classList.add("rete-background");

    editor.use(AreaPlugin, { background });

    editor.use(ConnectionPlugin);
    const VueRenderPlugin = require("rete-vue-render-plugin").default;
    editor.use(VueRenderPlugin, {
      options: {
        vuetify: new Vuetify(),
      },
    });

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
        await engine.abort();
        await engine.process(editor.toJSON());
        if (editor.selected.list.length) {
          editor.selectNode(editor.selected.list[0]);
        }
      }
    );

    editor.on("zoom", ({ source }) => {
      return source !== "dblclick";
    });

    editor.on("mousemove", ({ x, y }) => {
      this.editorX = x;
      this.editorY = y;
    });

    reteStore.editor = editor;
    reteStore.engine = engine;

    const components = [
      new SourceCorpusComponent(editor),
      new TransformMeasuresComponent(editor),
      new AnalysisKeyComponent(editor),
      new AnalysisRomanNumeralComponent(editor),

      new TransformTransposeComponent(editor),
      new TransformChordifyComponent(editor),
      new TransformFlattenComponent(editor),
    ];

    for (const component of components) {
      editor.register(component);
      engine.register(component);
    }
  }

  showContextMenu(e: MouseEvent) {
    e.preventDefault();
    this.showMenu = false;
    this.x = e.clientX;
    this.y = e.clientY;
    this.$nextTick(() => {
      this.showMenu = true;
    });
  }

  async createNode(item: MenuItem) {
    if (!item.key || !reteStore.editor) {
      return;
    }
    const node = await (
      reteStore.editor?.components.get(item.key) as rComponent
    ).createNode();

    node.position = [this.editorX, this.editorY];

    reteStore.editor.addNode(node);

    logStore.log({
      level: LogLevel.info,
      text: `Added new node ${item.key}`,
    });
  }
}
</script>

<style>
#rete {
  height: calc(100vh - 36px) !important;
}
</style>