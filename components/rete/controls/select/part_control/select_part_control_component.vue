<template>
  <v-text-field
    label="Part"
    v-model="part"
    @input="change"
    dark
    type="number"
    :rules="[numberRule]"
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";


@Component({})
export default class SelectPartControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  part: number = 0;

  mounted() {
    this.change();
  }

  change() {
    if (this.ikey) {
      this.putData(this.ikey, this.part);      
      this.emitter.trigger("process");
    }
  }

  numberRule(v: string) {
    if (!isNaN(parseFloat(v))) return true;
    return "Not a number";
  }
}
</script>

<style>
</style>