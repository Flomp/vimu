<template>
  <v-navigation-drawer class="score-drawer" v-model="drawer" width="500" right absolute temporary overlay-opacity="0">
    <v-btn class="pa-8" color="primary" icon @click="drawer = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <div class="score-data px-12 pt-2 pb-6" v-if="score">
      <span class="score-title">{{ score.name }}</span>
      <div class="d-flex flex-wrap align-center pt-6">
        <div cols="6" class="d-flex align-center mb-2">
          <span>Composer:</span> <span class="ml-4 mr-5 font-weight-bold">{{ getMeta("composer") }}</span>
        </div>
        <div cols="6" class="d-flex align-center mb-2">
          <span>Date:</span> <span class="ml-4 mr-5 font-weight-bold">{{ getMeta("date") }}</span>
        </div>
        <div cols="6" class="d-flex align-center mb-2">
          <span>Instruments:</span> <span class="ml-4 mr-5 font-weight-bold">{{ getMeta("instruments") }}</span>
        </div>
        <div cols="6" class="d-flex align-center mb-2">
          <span>Key sig.:</span> <span class="ml-4 mr-5 font-weight-bold">{{ getMeta("keys") }}</span>
        </div>
        <div cols="6" class="d-flex align-center mb-2">
          <span>Time sig.:</span> <span class="ml-4 mr-5 font-weight-bold">{{ getMeta("times") }}</span>
        </div>
        <div cols="6" class="d-flex align-center mb-2">
          <span>Language:</span> <span class="ml-4 mr-5 font-weight-bold">{{ getMeta("language") }}</span>
        </div>
      </div>
    </div>
    <div>
      <div>
          <div :class="{ 'd-none': scoreLoading }" id="osmdContainer"></div>
      </div>
    </div>
    <div class="d-flex justify-center align-center pt-6" v-if="scoreLoading">
      <v-progress-circular :indeterminate="true"></v-progress-circular>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue, Watch } from "nuxt-property-decorator";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { VNavigationDrawer } from "vuetify/lib";
import { Score, ScoreMeta } from "~/models/score";

@Component({})
export default class ScoreDrawer extends Vue {
  @VModel() drawer!: boolean;
  @Prop() readonly score!: Score;

  osmd!: OpenSheetMusicDisplay;

  scoreLoading: boolean = false;

  mounted() {
    this.osmd = new OpenSheetMusicDisplay("osmdContainer");
    this.osmd.setOptions({
      backend: "svg",
      drawTitle: true,
    });
  }

  getMeta(key: keyof ScoreMeta) {
    return this.score.expand.meta[key] ? this.score.expand.meta[key] : "-"
  }

  get dataPath() {
    return this.$pb.getFileUrl(this.score as any, this.score.data)
  }

  @Watch("score")
  async onScoreChanged() {
    this.scoreLoading = true;
    setTimeout(async () => {
      this.scoreLoading = false;
      await this.osmd?.load(this.dataPath)
      this.osmd.zoom = 0.5;
      this.osmd.render();
    }, 500)

  }

}
</script>

<style scoped>
.score-drawer {
  border: 2px solid currentColor;
  border-radius: 16px 0 0 16px;
}

.score-title {
  font-size: 3rem !important;
  font-weight: 600;
  line-height: 3rem;
  letter-spacing: -0.0083333333em !important;

}

.score-data {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: white;
}
</style>