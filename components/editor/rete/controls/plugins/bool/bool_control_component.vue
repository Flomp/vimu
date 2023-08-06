<template>
  <v-checkbox v-model="value" @change="update" :label="attributes['label'].value" :prependIcon="icon"></v-checkbox>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import { PluginControlAttribute } from "~/models/plugin";

@Component({})
export default class BoolControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  @Prop()
  attributes!: Record<string, PluginControlAttribute>;

  value: string = "";

  get icon() {
    return this.attributes['prependIcon'].value ? "mdi-" + this.attributes['prependIcon'].value : ""
  }

  mounted() {
    this.value = this.getData(this.ikey);
  }

  update() {
    if (this.ikey) {
      this.putData(this.ikey, this.value);      
    }
  }
}
</script>

<style></style>