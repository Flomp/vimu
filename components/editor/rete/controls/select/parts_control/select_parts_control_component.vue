<template>
  <vimu-combobox v-model="parts" :chips="true" :multiple="true"
    style="max-width: 200px; margin-right: 24px;" placeholder="Instrument or Part #" @change="change"></vimu-combobox>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import VimuCombobox from "~/components/vimu/vimu_combobox.vue"

@Component({
  components: {
    VimuCombobox
  }
})
export default class SelectPartsControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  parts: string[] = [];

  mounted() {
    this.parts = this.getData(this.ikey)
  }

  change() {    
    if (this.ikey) {
      this.putData(this.ikey, this.parts);
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