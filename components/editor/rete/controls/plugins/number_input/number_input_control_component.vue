<template>
  <vimu-text-field :label="label" :prependIcon="icon" class="mr-6" v-model="value" @update="update"
    style="max-width: 200px" type="number" :rules="numberRules"></vimu-text-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import { PluginControlAttribute } from "~/models/plugin";
import { number } from "~/utils/verification_rules";

@Component({})
export default class NumberInputControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  @Prop()
  attributes!: Record<string, PluginControlAttribute>;

  value: string = "";

  numberRules = [
    number,
    (v: string) => (!this.min || parseFloat(v) >= this.min) || `>= ${this.min}`,
    (v: string) => (!this.max || parseFloat(v) <= this.max) || `<= ${this.max}`

  ];

  get icon() {
    return this.attributes['prependIcon'].value ? "mdi-" + this.attributes['prependIcon'].value : ""
  }

  get label() {
    return this.attributes['label'].value
  }

  get min() {
    return this.attributes['min'].value;
  }

  get max() {
    return this.attributes['max'].value;
  }

  mounted() {
    if (this.getData(this.ikey)) {
      this.value = this.getData(this.ikey)
    } else if (this.attributes.default.value) {
      this.value = this.attributes.default.value;
      this.putData(this.ikey, parseFloat(this.value));
    }
  }

  update() {
    if (this.ikey) {
      this.putData(this.ikey, parseFloat(this.value));
    }
    this.emitter.trigger("process");
  }
}
</script>

<style></style>