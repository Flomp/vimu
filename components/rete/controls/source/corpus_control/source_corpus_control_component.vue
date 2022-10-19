<template>
  <div>
    <v-select
      class="pr-5"
      v-model="value"
      :items="items"
      @input="change($event)"
      outlined
      style="max-width: 200px"
    ></v-select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";

@Component({})
export default class SourceCorpusControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  value: string = "bach/bwv350.mxl";

  items: string[] = ["bach/bwv66.6.mxl", "bach/bwv350.mxl", "bach/bwv272.mxl", "haydn/opus1no1/movement1.mxl"];

  mounted() {
    this.value = this.getData(this.ikey);
  }

  async change(value: string) {
    this.value = value;
    this.update();
  }

  update() {
    if (this.ikey) {
      this.putData(this.ikey, this.value);
    }
    this.emitter.trigger("process");
  }
}
</script>



<style scoped>
</style>