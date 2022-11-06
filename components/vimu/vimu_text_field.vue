<template>
  <v-text-field
    class="vimu-text-field"
    v-model="model"
    :label="label"
    :type="type"
    :rules="rules"
    :hide-details="hideDetails"
    :prepend-inner-icon="prependInnerIcon"
    :placeholder="placeholder"
    validate-on-blur
    outlined
    :clearable="clearable"
  ></v-text-field>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Emit } from "nuxt-property-decorator";

@Component({})
export default class VimuTextField extends Vue {
    @VModel() model!: string;
    @Prop() readonly label!: string;
    @Prop() readonly type!: string;
    @Prop() readonly rules!: Function[];
    @Prop({default: false}) readonly hideDetails!: boolean;
    @Prop() readonly prependInnerIcon!: string;
    @Prop() readonly placeholder!: string;
    @Prop({default: false}) readonly clearable!: boolean;

}
</script>

<style>
.vimu-text-field fieldset{
    border: 2px solid currentColor !important;
}
</style>