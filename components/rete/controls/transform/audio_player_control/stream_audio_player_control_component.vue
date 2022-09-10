<template>

</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";

import { NodeEditor } from "rete";

@Component({})
export default class StreamAudioPlayerControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  dialog: boolean = false;

  value: string = "";


  mounted() {
    this.value = this.getData(this.ikey);

  }

  @Watch("value")
  async onValueChanged(value: string) {
  }
}
</script>

<style>
</style>