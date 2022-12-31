<template>
  <div style="max-width: 200px">
    <p class="score-title">{{ data.name }}</p>
    <vimu-btn :primary="true" @click="dialog = true" v-if="!readonly">Browse</vimu-btn>
    <source-score-dialog v-model="dialog" @select="selectScore" v-if="!readonly"></source-score-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import { Score } from "~/models/score";
import SourceScoreDialog from "./source_score_dialog.vue";

@Component({
  components: {
    VimuBtn,
    SourceScoreDialog
  }
})
export default class SourceScoreControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  data: { id: string, name: string, data: string } = {
    id: "",
    name: "",
    data: ""
  };

  dialog: boolean = false;

  mounted() {
    if (this.getData(this.ikey)) {
      this.data = this.getData(this.ikey);
    }
  }

  selectScore(score: Score) {
    this.change({ id: score.id!, name: score.name, data: score.data });
  }

  async change(value: { id: string, name: string, data: string }) {
    this.data = value;
    this.update();
  }

  update() {
    if (this.ikey) {
      this.putData(this.ikey, this.data);
    }
    this.emitter.trigger("process");
  }
}
</script>



<style scoped>
.score-title {
    font-size: 1.4rem;
    font-weight: 700;
}
</style>