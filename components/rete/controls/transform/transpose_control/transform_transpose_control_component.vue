<template>
  <v-text-field
    label="Half steps"
    v-model="steps"
    @blur="change"
    dark
    type="number"
    :rules="[numberRule]"
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";


@Component({})
export default class TransformTransposeControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  steps: number = 3;

  mounted() {
    this.change();
  }

  change() {
    if (this.ikey) this.putData(this.ikey, this.steps);
    this.emitter.trigger("process");
  }

  numberRule(v: string) {
    if (!isNaN(parseFloat(v))) return true;
    return "Not a number";
  }
}
</script>

<style>
</style>