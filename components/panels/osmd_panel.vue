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
import { logStore, osmdStore, pyodideStore, streamStore } from "~/store";
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

  get needsUpdate(): boolean {
    return osmdStore.needsUpdate;
  }

  mounted() {
    this.osmd = new OpenSheetMusicDisplay("osmdContainer");
    this.osmd.setOptions({
      backend: "svg",
      drawTitle: true,
    });
  }

  @Watch("needsUpdate")
  onNeedsUpdateChange(needsUpdate: boolean) {
    osmdStore.setNeedsUpdate(false);

    if (
      !needsUpdate ||
      !this.displayedNode.data ||
      !this.displayedNode.data.hasData
    ) {
      return;
    }
    this.loadScore(this.displayedNode);
  }

  @Watch("selectedNode")
  onSelectedNodeChange(node: Node) {
    if (!node || this.displayedNode.id == node.id) {
      return;
    }

    this.displayedNode = node;

    if (node.data.hasData) {
      this.loadScore(this.displayedNode);
    }
  }

  async loadScore(node: Node) {
    if (!this.osmd) {
      return;
    }
    this.loading = true;
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
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style>
</style>