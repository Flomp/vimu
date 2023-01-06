<template>
  <div class="fill-height">
    <div class="d-flex align-center vimu-editor-header">
      <h5 class="px-3">Plots <span v-if="plots.length">({{ activePlot+ 1}}/{{ plots.length }})</span></h5>
      <div v-if="plots.length > 1">
        <h5></h5>
        <v-btn icon :disabled="activePlot == 0" @click="activePlot--"><v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn icon :disabled="activePlot == plots.length - 1" @click="activePlot++"><v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click="minimize()"><v-icon>mdi-minus</v-icon></v-btn>
    </div>
    <div style="height: calc(100% - 36px);max-width: 100%;overflow-y: scroll;background-color: white;"> <img
        :src="'data:image/svg+xml;base64,' + plots[activePlot]" width="100%" v-if="plots.length" />
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
    settings.view.plot = false;
    settingsStore.changeSettings(settings);
  }
}
</script>

<style>

</style>