<template>
  <h4 class="text-h4">{{ value }}</h4>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";

@Component({})
export default class DetectModulationControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  value: string = "";

  mounted() {
    this.value = this.getData(this.ikey);
  }
}
</script>

<style>
</style>