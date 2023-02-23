<template>
  <div class="fill-height">
    <div class="d-flex align-center flex-row vimu-editor-header px-3">
      <h5>Plots <span v-if="plots.length">({{ activePlot + 1 }}/{{ plots.length }})</span></h5>
      <div v-if="plots.length > 1">
        <v-btn icon :disabled="activePlot == 0" @click="activePlot--"><v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn icon :disabled="activePlot == plots.length - 1" @click="activePlot++"><v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-tooltip class="d-flex" bottom v-if="plots.length">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" light icon @click="download">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </template>
        <span>Download</span>
      </v-tooltip>
      <div style="width:4.5px"></div>
      <v-btn icon @click="minimize()"><v-icon>mdi-minus</v-icon></v-btn>
    </div>
    <div style="height: calc(100% - 36px);max-width: 100%;overflow-y: scroll;background-color: white;"> <img
        class="vimu-plot" :src="'data:image/svg+xml;base64,' + plots[activePlot]" width="100%" v-if="plots.length"
        @click="zoom" />
      <div v-else class="
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
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { VBtn, VIcon, VSpacer } from "vuetify/lib";
import { engineStore, settingsStore } from "~/store";

@Component({})
export default class PlotPanel extends Vue {
  activePlot = 0;

  get plots() {
    return engineStore.plots;
  }

  @Watch("plots")
  onPlotsChange() {
    this.activePlot = 0;
  }

  minimize() {
    const settings = JSON.parse(JSON.stringify(settingsStore.settings))
    settings.plot = false;
    settingsStore.updateEditorSettings(settings);
  }

  zoom(e: MouseEvent) {
    const tgt = e.target as HTMLElement;
    tgt?.classList.toggle('zoomed')
  }

  download() {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:image/svg+xml;base64,' + this.plots[this.activePlot]);
    const timestamp = new Date().getTime();
    element.setAttribute('download', `vimu_plot_${timestamp}.svg`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

  }
}
</script>

<style>
.vimu-plot {
  cursor: zoom-in;
  transform-origin: top left;
}

.vimu-plot.zoomed {
  scale: 2;
  cursor: zoom-out;
}
</style>