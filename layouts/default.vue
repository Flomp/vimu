<template>
  <v-app>
    <!-- <v-app-bar app clipped-left clipped-right flat color="#353535" dark>
      <v-toolbar-title>VIMU</v-toolbar-title>
    </v-app-bar> -->
    <v-navigation-drawer app permanent right width="60%">
      <v-row>
        <v-col cols="8">
          <div
            style="height: 70vh; overflow-y: scroll; background-color: white"
          >
            <OSMD-panel></OSMD-panel>
          </div>
          <div style="height: 30vh; background-color: #101010">
            <log-panel></log-panel>
          </div>
        </v-col>
        <v-col cols="4">
          <details-panel />
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <div class="d-flex flex-row">
      <v-main>
        <nuxt />
      </v-main>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import DetailsPanel from "~/components/panels/details_panel.vue";
import OSMDPanel from "~/components/panels/osmd_panel.vue";
import LogPanel from "~/components/panels/log_panel.vue";

@Component({
  components: {
    DetailsPanel,
    OSMDPanel,
    LogPanel,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style>
</style>