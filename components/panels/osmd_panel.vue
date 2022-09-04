<template>
  <div>
    <v-progress-linear
      absolute
      indeterminate
      color="black"
      height="1"
      v-if="loading"
    ></v-progress-linear>
    <div id="osmdContainer"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "nuxt-property-decorator";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { Node } from "rete";
import { streamStore } from "~/store";
import { reteStore } from "~/store/rete";
import { PyProxy } from "~/types/pyodide";

@Component({})
export default class OSMDPanel extends Vue {
  osmd!: OpenSheetMusicDisplay;

  reteStore = reteStore;

  loading: boolean = false;

  selectedNodeData: string = "";

  get selectedNode(): Node | undefined {
    return reteStore.editor?.selected.list[0];
  }

  mounted() {
    this.osmd = new OpenSheetMusicDisplay("osmdContainer");
    this.osmd.setOptions({
      backend: "svg",
      drawTitle: true,
    });
  }

  @Watch("selectedNode")
  async onValueChanged(node: Node) {
    if (!node || !node.data.data || !this.osmd) {
      return;
    }
    // if (!(node.data.data as PyProxy).toString().startsWith("<music21.stream")) {
    //   try {
    //     this.osmd.clear();
    //   } catch (e) {}
    // }

    const nodeDataString: string = (node.data.data as PyProxy).toString();

    if (this.selectedNodeData == nodeDataString) {
      return;
    }

    this.loading = true;
    this.selectedNodeData = (node.data.data as PyProxy).toString();
    const musicXML: string = await streamStore.streamToString({
      stream: node.data.data as PyProxy,
    });

    await this.osmd.load(musicXML).catch((e) => console.log(e));

    this.osmd.zoom = 0.5;
    this.osmd.render();

    this.loading = false;
  }
}
</script>

<style>
</style>