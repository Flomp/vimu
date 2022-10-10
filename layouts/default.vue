<template>
  <v-app>
    <v-navigation-drawer app permanent right :width="drawerWidth">
      <v-row>
        <v-col class="pr-0 pb-0" cols="8">
          <client-only>
            <OSMD-panel></OSMD-panel>
          </client-only>
          <h5 class="text-button grey darken-4 px-3">Log</h5>
          <div
            style="
              height: calc(30vh - 36px);
              overflow-y: scroll;
              background-color: #101010;
              display: flex;
              flex-direction: column-reverse;
            "
          >
            <log-panel></log-panel>
          </div>
        </v-col>
        <v-col class="pl-0" cols="4" style="z-index: 1; background-color: #363636">
          <details-panel />
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <div class="d-flex flex-row" style="height: 100%">
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
export default class DefaultLayout extends Vue {
  get drawerWidth(): string {
    if (process.client) {
      return window?.screen.width < 850 ? "60%" : "850px";
    }
    return "";
  }
}
</script>

<style>
</style>