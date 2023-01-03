<template>
  <v-combobox
    class="vimu-text-field"
    v-model="model"
    :label="label"
    :type="type"
    :rules="rules"
    :hide-details="hideDetails"
    :prepend-inner-icon="prependInnerIcon"
    :persistent-placeholder="true"
    :placeholder="placeholder"
    :small-chips="chips"
    :multiple="multiple"
    :prepend-icon="prependIcon"
    appendIcon=""
    validate-on-blur
    outlined
    @change="change"
  ></v-combobox>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Emit } from "nuxt-property-decorator";

@Component({})
export default class VimuCombobox extends Vue {
    @VModel() model!: string[];
    @Prop() readonly label!: string;
    @Prop() readonly type!: string;
    @Prop() readonly rules!: Function[];
    @Prop() readonly hideDetails!: boolean;
    @Prop() readonly prependInnerIcon!: string;
    @Prop() readonly placeholder!: string;
    @Prop() readonly chips!: boolean;
    @Prop() readonly multiple!: boolean;
    @Prop() readonly prependIcon!: string;

    @Emit()
    change(value: any) {
      return value
    }

}
</script>

<style>
</style>