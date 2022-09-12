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
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { Node } from "rete";
import { LogLevel } from "~/models/log";
import { logStore, streamStore } from "~/store";
import { reteStore } from "~/store/rete";

@Component({})
export default class OSMDPanel extends Vue {
  osmd!: OpenSheetMusicDisplay;

  reteStore = reteStore;

  loading: boolean = false;

  displayedNode: Node = <Node>{};

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

    if(this.displayedNode.id == node.id) {
      return;
    }

    this.loading = true;
    this.displayedNode = node;
    const musicXML: string = await streamStore.streamToString({
      nodeId: node.id,
    });

    try {
      await this.osmd.load(musicXML);
      this.osmd.zoom = 0.5;
      this.osmd.render();
    } catch (e: any) {
      logStore.log({
        level: LogLevel.error,
        text: "Failed to load Score: " + e.toString(),
      });
    }

    this.loading = false;
  }
}
</script>

<style>
</style>