<template>
  <div>
    <div
      class="d-flex flex-row justify-space-between grey lighten-2 px-3 absolute"
    >
      <h5 class="text-button black--text">Score</h5>
      <v-btn icon @click="playOrPause" light :disabled="playDisabled"
        ><v-icon>{{ playIcon }}</v-icon></v-btn
      >
    </div>
    <v-progress-linear
      absolute
      indeterminate
      color="black"
      height="1"
      v-if="loading"
    ></v-progress-linear>
    <div
      style="
        height: calc(70vh - 36px);
        overflow-y: scroll;
        background-color: white;
      "
    >
      <div id="osmdContainer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";

import { Node } from "rete";
import { LogLevel } from "~/models/log";
import { logStore, osmdStore } from "~/store";
import { reteStore } from "~/store/rete";

@Component({})
export default class OSMDPanel extends Vue {
  osmd!: OpenSheetMusicDisplay;
  audioPlayer!: any;

  reteStore = reteStore;

  loading: boolean = false;

  displayedNode: Node = <Node>{};

  playDisabled: boolean = true;

  playing: boolean = false;

  get selectedNode(): Node | undefined {
    return reteStore.editor?.selected.list[0];
  }

  get needsUpdate(): boolean {
    return osmdStore.needsUpdate;
  }

  get playIcon() {
    return this.playing ? "mdi-pause" : "mdi-play";
  }

  mounted() {
    this.osmd = new OpenSheetMusicDisplay("osmdContainer");
    this.osmd.setOptions({
      backend: "svg",
      drawTitle: true,
    });

    const AudioPlayer = require("osmd-audio-player").default;
    const PlaybackEngine = require("osmd-audio-player/dist/PlaybackEngine");
   
    this.audioPlayer = new AudioPlayer();
    this.audioPlayer.on(PlaybackEngine.PlaybackEvent.STATE_CHANGE, (state: string) => {
      if (state == "PLAYING") {
        this.playing = true;
      } else if (state == "STOPPED" || state == "PAUSED") {
        this.playing = false;
      }
    });
  }

  @Watch("needsUpdate")
  onNeedsUpdateChange(needsUpdate: boolean) {
    osmdStore.setNeedsUpdate(false);

    if (!needsUpdate) {
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

    this.loadScore(this.displayedNode);
  }

  async loadScore(node: Node) {
    if (!this.osmd || !node.data.xml) {
      return;
    }

    this.loading = true;
    const musicXML: string = node.data.xml as string;

    try {
      this.playDisabled = true;
      await this.osmd.load(musicXML);
      this.osmd.zoom = 0.5;
      this.osmd.render();
      await this.audioPlayer.loadScore(this.osmd as any);
      this.playDisabled = false;
    } catch (e: any) {
      logStore.log({
        level: LogLevel.error,
        text: "Failed to load Score: " + e.toString(),
      });
    } finally {
      this.loading = false;
    }
  }

  playOrPause() {
    if (this.playing) {
      this.audioPlayer.pause();
    } else {
      this.audioPlayer.jumpToStep(0);
      this.audioPlayer.stop();
      this.audioPlayer.play();
    }
  }
}
</script>

<style>
</style>