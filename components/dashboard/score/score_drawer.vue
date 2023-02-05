<template>
  <v-navigation-drawer class="score-drawer" v-model="drawer" width="500" right fixed overlay-opacity="0">
    <div class="score-data px-8 pb-3" v-if="score" style="padding-top: 64px">
      <v-btn class="pa-8" color="primary" icon @click="drawer = false" absolute style="top:0; left:0">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="d-flex justify-space-between align-center mr-3">
        <span class="score-title" style="flex: 0 1 50%; overflow: hidden; text-overflow: ellipsis;">{{ score.name }}</span>
        <vimu-btn :primary="true" @click="create">Create File</vimu-btn>
      </div>
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
      <h3 class="ml-8">Preview</h3>
      <img :src="thumbnailPath" width="100%" style="object-fit: contain;" v-if="score" />
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Emit, Prop, VModel, Vue, Watch } from "nuxt-property-decorator";
import { VNavigationDrawer } from "vuetify/lib";
import { Score, ScoreMeta } from "~/models/score";
import { $pb } from "~/store";
import VimuBtn from "../../vimu/vimu_button.vue";

@Component({
  components: {
    VimuBtn
  }
})
export default class ScoreDrawer extends Vue {
  @VModel() drawer!: boolean;
  @Prop() readonly score!: Score;

  getMeta(key: keyof ScoreMeta) {
    if (!this.score.expand.meta) {
      return "?";
    }
    return this.score.expand.meta[key] ? this.score.expand.meta[key] : "-"
  }

  get dataPath() {
    return $pb.getFileUrl(this.score as any, this.score.data)
  }

  get thumbnailPath() {
    return $pb.getFileUrl(this.score as any, this.score.thumbnail)
  }

  @Emit()
  create() {
    return this.score;
  }

}
</script>

<style scoped>
.score-drawer {
  border: 2px solid currentColor;
  border-radius: 16px 0 0 16px;
}

.score-title {
  font-size: 2.5rem !important;
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