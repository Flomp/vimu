<template>
  <v-app>
    <vimu-appbar />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import VimuAppBar from "~/components/vimu/vimu_appbar.vue";
import VimuFooter from "~/components/vimu/vimu_footer.vue";
@Component({
  components: {
    VimuAppBar,
    VimuFooter
  },
})
export default class DefaultLayout extends Vue { }
</script>
