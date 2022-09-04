<template>
  <div>
    <v-select
      class="pr-5"
      v-model="value"
      :items="items"
      @input="change($event)"
      dark
      solo
      style="max-width: 200px"
    ></v-select>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import { sourceStore } from "~/store";
import { PyProxy } from "~/types/pyodide";

@Component({})
export default class SourceCorpusControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  value: string = "bach/bwv350.mxl";

  items: string[] = ["bach/bwv350.mxl", "bach/bwv272.mxl"];

  stream! : PyProxy;

  mounted() {
    this.value = this.getData(this.ikey);
  }

  async change(value: string) {
    this.value = value;
    this.stream = await sourceStore.load(value);
    this.update();
  }

  update() {
    if (this.ikey) {
      this.putData(this.ikey, this.stream);
    }
    this.emitter.trigger("process");
  }
}
</script>



<style scoped>
</style>