<template>
  <v-app class="layout">
    <notification-center />
    <vimu-appbar />
    <v-main class="main">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import VimuAppBar from "~/components/vimu/vimu_appbar.vue";
import VimuFooter from "~/components/vimu/vimu_footer.vue";
import NotificationCenter from "~/components/vimu/notification-center.vue";

@Component({
  components: {
    VimuAppBar,
    VimuFooter,
    NotificationCenter
  },
})
export default class DefaultLayout extends Vue { }
</script>

<style>
</style>
