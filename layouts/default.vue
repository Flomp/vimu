<template>
  <v-app>
    <v-row class="fill-height ma-0">
      <v-col class="pa-0" style="flex: 1 1">
        <v-main>
          <nuxt />
        </v-main>
      </v-col>
      <v-col
        class="d-flex flex-column pa-0"
        style="flex: 0 1 512px"
        v-if="showFirstColumn"
      >
        <client-only>
          <OSMD-panel v-show="showScore"></OSMD-panel>
        </client-only>
        <div v-show="showLog" style="flex: 1 1 0; min-height: 276px">
          <h5 class="text-button grey darken-4 px-3">Log</h5>
          <log-panel></log-panel>
        </div>
      </v-col>
      <v-col
        class="pa-0"
        style="
          z-index: 1;
          background-color: #363636;
          flex: 0 1 280px;
          max-width: 280px;
        "
      >
        <details-panel />
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import DetailsPanel from "~/components/panels/details_panel.vue";
import OSMDPanel from "~/components/panels/osmd_panel.vue";
import LogPanel from "~/components/panels/log_panel.vue";
import { settingsStore } from "~/store";

@Component({
  components: {
    DetailsPanel,
    OSMDPanel,
    LogPanel,
  },
})
export default class DefaultLayout extends Vue {
  get drawerWidth(): string {
    if (process.client) {
      return window?.screen.width < 850 ? "60%" : "850px";
    }
    return "";
  }

  get showFirstColumn() {
    return settingsStore.settings.view.score || settingsStore.settings.view.log;
  }

  get showScore() {
    return settingsStore.settings.view.score;
  }

  get showLog() {
    return settingsStore.settings.view.log;
  }
}
</script>

<style>
</style>