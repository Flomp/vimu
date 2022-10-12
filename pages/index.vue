<template>
  <v-sheet class="main">
    <main-menu></main-menu>
    <v-progress-linear
      indeterminate
      v-if="apiLoading"
      absolute
      height="2"
    ></v-progress-linear>
    <div id="rete" @contextmenu="showContextMenu"></div>
    <sub-menu
      v-model="showMenu"
      :absolute="true"
      :positionX="x"
      :positionY="y"
      :items="menuItems"
      @menu-click="createNode"
    />
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import Rete, { Component as rComponent } from "rete";
// @ts-ignore
import AreaPlugin from "rete-area-plugin";
import ConnectionPlugin from "rete-connection-plugin";
// @ts-ignore
import MinimapPlugin from "rete-minimap-plugin";

import Vuetify from "vuetify";
import { MenuItem, editorMenuItems } from "~/components/palette/menu_item";
import SubMenu from "~/components/palette/sub_menu.vue";
import AnalysisKeyComponent from "~/components/rete/components/analysis/analysis_key_component";
import AnalysisAmbitusComponent from "~/components/rete/components/analysis/analysis_ambitus_component";
import AnalysisRomanNumeralComponent from "~/components/rete/components/analysis/analysis_roman_numeral_component";
import SelectMeasuresComponent from "~/components/rete/components/select/select_measures_component";
import SelectPartComponent from "~/components/rete/components/select/select_part_component";
import SelectNotesComponent from "~/components/rete/components/select/select_notes_component";
import SourceCorpusComponent from "~/components/rete/components/source/source_corpus_component";
import SourceTinynotationComponent from "~/components/rete/components/source/source_tinynotation_component";
import TransformChordifyComponent from "~/components/rete/components/transform/transform_chordify_component";
import TransformFlattenComponent from "~/components/rete/components/transform/transform_flatten_component";
import TransformTransposeComponent from "~/components/rete/components/transform/transform_transpose_component";
import SearchPartComponent from "~/components/rete/components/search/search_part_component";
import SearchLyricsComponent from "~/components/rete/components/search/search_lyrics_component";

import { LogLevel } from "~/models/log";
import { apiStore, logStore, osmdStore } from "~/store";
import { reteStore } from "~/store/rete";
import MainMenu from "~/components/main_menu.vue";

@Component({
  components: {
    SubMenu,
    MainMenu,
  },
})
export default class IndexPage extends Vue {
  showMenu = false;
  x = 0;
  y = 0;
  editorX = 0;
  editorY = 0;
  menuItems = editorMenuItems;

  get apiLoading() {
    return apiStore.loading;
  }

  async mounted() {
    const container = document.querySelector<HTMLElement>("#rete");
    const editor = new Rete.NodeEditor("vimu@0.1.0", container!);

    const background = document.createElement("div");
    background.classList.add("rete-background");

    editor.use(AreaPlugin, { background });
    editor.use(MinimapPlugin);
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

        osmdStore.setNeedsUpdate(true);
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

  downloadJSON() {
    const jsonData = JSON.stringify(reteStore.editor?.toJSON());
    var jsonBlob = new Blob([jsonData], {
      type: "text/xml;charset=utf-8",
    });
    var url = URL.createObjectURL(jsonBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    const timestamp = new Date().getTime();
    downloadLink.download = `vimu_export_${timestamp}.json`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
</script>

<style>
#rete {
  height: calc(100vh - 36px) !important;
}
</style>