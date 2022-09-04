<template>
  <v-sheet class="main">
    <div id="rete" @contextmenu="showContextMenu"></div>
    <sub-menu
      v-model="showMenu"
      :positionX="x"
      :positionY="y"
      :items="menuItems"
      @menu-click="createNode"
    />
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Rete, { Component as rComponent } from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import Vuetify from "vuetify";
import { MenuItem, menuItems } from "~/components/palette/menu_item";
import SubMenu from "~/components/palette/sub_menu.vue";
import ChoralSelectComponent from "~/components/rete/components/source/choral_select_component";
import StreamAnalyzeComponent from "~/components/rete/components/stream/stream_analyze_component";
import StreamAudioPlayerComponent from "~/components/rete/components/stream/stream_audio_player_component";
import StreamMeasuresComponent from "~/components/rete/components/stream/stream_measures_component";
import StreamTransposeComponent from "~/components/rete/components/stream/stream_transpose_component";
import { LogLevel } from "~/models/log";
import { logStore } from "~/store";
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
  menuItems = menuItems;

  async mounted() {
    const container = document.querySelector<HTMLElement>("#rete");
    const editor = new Rete.NodeEditor("vimu@0.1.0", container!);
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
        "nodecreated",
        "noderemoved",
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

    reteStore.editor = editor;
    reteStore.engine = engine;

    const components = [
      new ChoralSelectComponent(editor),
      new StreamAudioPlayerComponent(editor),
      new StreamMeasuresComponent(editor),
      new StreamAnalyzeComponent(editor),
      new StreamTransposeComponent(editor),
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
    if (!item.key) {
      return;
    }
    const node = await (
      reteStore.editor?.components.get(item.key) as rComponent
    ).createNode();
    reteStore.editor?.addNode(node);

    logStore.log({ level: LogLevel.info, text: `Added new node ${item.key}` });
  }
}
</script>

<style>
#rete {
  height: calc(100vh);
}
</style>