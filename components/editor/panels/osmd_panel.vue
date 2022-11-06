<template>
  <div class="fill-height" style="position: relative;">
    <div class="d-flex align-center flex-row vimu-editor-header px-3">
      <h5>Output</h5>
      <v-spacer></v-spacer>
      <div>
        <v-btn @click="playOrPause" :disabled="playDisabled || showNothingSelected" light icon>
          <v-icon>{{ playIcon }}</v-icon>
        </v-btn>
        <v-menu offset-y content-class="vimu-menu elevation-0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" :disabled="downloadDisabled || showNothingSelected" light icon>
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="downloadSVG">
              <v-list-item-title>SVG</v-list-item-title>
            </v-list-item>
            <v-list-item @click="downloadXML">
              <v-list-item-title>MusicXML</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn icon light @click="minimize()">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </div>
    </div>
    <v-progress-linear absolute indeterminate color="black" height="2" v-if="loading"></v-progress-linear>
    <v-slider class="ma-0 osmd-slider" v-model="currentIterationStep" :max="maxIterationStep" light hide-details
      v-else-if="!playDisabled && !showNothingSelected" color="black" background-color="transparent" track-color="grey"
      height="1" style="width: 100%;" @input="skip"></v-slider>

    <div style="height: calc(100% - 36px);
        overflow-y: scroll;
        background-color: white;
      ">
      <div :class="{ 'd-none': showNothingSelected }" id="osmdContainer"></div>
      <div v-if="showNothingSelected" class="
          grey--text
          fill-height
          d-flex
          flex-column
          justify-center
          align-center
          text-overline
        ">
        <span>No Data</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue, Watch } from "nuxt-property-decorator";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";

import PlaybackEngine, {
  PlaybackEvent
} from "osmd-audio-player/dist/PlaybackEngine";
import { Node, NodeEditor } from "rete";
import { LogLevel } from "~/models/log";
import { engineStore, logStore, osmdStore, settingsStore } from "~/store";

@Component({})
export default class OSMDPanel extends Vue {
  @InjectReactive()
  editor!: NodeEditor;

  osmd!: OpenSheetMusicDisplay;
  audioPlayer!: PlaybackEngine;

  loading: boolean = false;

  displayedNode?: Node = <Node>{};

  playDisabled: boolean = true;

  downloadDisabled: boolean = true;

  playing: boolean = false;

  currentIterationStep = 0;
  maxIterationStep = 0;

  get needsUpdate(): boolean {
    return osmdStore.needsUpdate;
  }

  get playIcon() {
    return this.playing ? "mdi-pause" : "mdi-play";
  }

  get showNothingSelected() {
    return !this.engineData;
  }

  get engineData() {
    return engineStore.data
  }

  mounted() {
    this.osmd = new OpenSheetMusicDisplay("osmdContainer");
    this.osmd.setOptions({
      backend: "svg",
      drawTitle: true,
    });

    // const PlaybackEngine = require("osmd-audio-player/dist/PlaybackEngine");

    this.audioPlayer = new PlaybackEngine();

    this.audioPlayer.on(PlaybackEvent.STATE_CHANGE, (state: string) => {
      if (state == "PLAYING") {
        this.playing = true;
      } else if (state == "PAUSED") {
        this.playing = false;
      } else if (state == "STOPPED") {
        this.currentIterationStep = 0;
        this.playing = false;
      }
    });

    this.audioPlayer.on(PlaybackEvent.ITERATION, (state) => {
      const currentIterationStep =
        (this.audioPlayer as any)?.currentIterationStep ?? 0;
      const iterationSteps = (this.audioPlayer as any)?.iterationSteps ?? 0;

      if (currentIterationStep == iterationSteps) {
        this.audioPlayer?.stop();
      }

      this.currentIterationStep = currentIterationStep;
    });
  }

  @Watch("needsUpdate")
  onNeedsUpdateChange(needsUpdate: boolean) {
    osmdStore.setNeedsUpdate(false);

    if (!needsUpdate) {
      return;
    }
    this.onEngineDataChanged(this.engineData!);
  }

  @Watch("engineData")
  onEngineDataChanged(data: string) {
    if (data && data.length) {
      this.loadScore(data);
    } else {
      this.downloadDisabled = true;
      this.playDisabled = true;
      try {
        this.osmd.clear();
      } catch (e: any) { }
    }
  }

  async loadScore(data: string) {
    try {
      this.audioPlayer?.stop();
      this.downloadDisabled = true;
      this.playDisabled = true;
      await this.osmd.load(data);
      this.osmd.zoom = 0.5;
      this.osmd.render();
      this.downloadDisabled = false;
      await this.audioPlayer.loadScore(this.osmd as any);
      this.maxIterationStep = (this.audioPlayer as any).iterationSteps;
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
      this.audioPlayer.play();
    }
  }

  skip(value: number) {
    const isCurrentlyPlaying = this.playing;
    this.audioPlayer?.jumpToStep(value);
    if (isCurrentlyPlaying) {
      this.audioPlayer?.play();
    }
  }

  downloadSVG() {
    const svgEl = document.getElementById("osmdSvgPage1");
    if (!svgEl) {
      logStore.log({
        level: LogLevel.error,
        text: "Download failed. Invalid SVG",
      });
      return;
    }
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    const timestamp = new Date().getTime();
    downloadLink.download = `vimu_export_${timestamp}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  downloadXML() {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(engineStore.data));
    const timestamp = new Date().getTime();
    element.setAttribute('download', `vimu_export_${timestamp}.mxml`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

  }

  minimize() {
    const settings = JSON.parse(JSON.stringify(settingsStore.settings));
    settings.view.score = false;
    settingsStore.changeSettings(settings);
  }
}
</script>

<style scoped>
::v-deep .v-slider--horizontal {
  min-height: 2px;
  margin-left: 0px;
  margin-right: 0px;
}

::v-deep .v-slider__thumb {
  z-index: 2;
}
</style>