<template>
  <v-checkbox v-model="value" @change="update" :label="label" :prependIcon="icon"></v-checkbox>
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

  get label() {
    return this.attributes['label'].value;
  }

  mounted() {
    if (this.getData(this.ikey)) {
      this.value = this.getData(this.ikey)
    } else if (this.attributes.default.value) {
      this.value = this.attributes.default.value;
      this.putData(this.ikey, this.value);
    }
  }

  update() {
    if (this.ikey) {
      this.putData(this.ikey, this.value);
    }
    this.emitter.trigger("process");
  }
}
</script>

<style></style>