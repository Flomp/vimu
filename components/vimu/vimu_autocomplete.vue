<template>
  <v-combobox
    class="vimu-text-field"
    v-model="model"
    :label="label"
    :type="type"
    :rules="rules"
    :hide-details="hideDetails"
    :prepend-inner-icon="prependInnerIcon"
    :persisten-hint="true"
    :placeholder="placeholder"
    appendIcon=""
    validate-on-blur
    outlined
  ></v-combobox>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "nuxt-property-decorator";

@Component({})
export default class VimuAutocomplete extends Vue {
    @VModel() model!: string;
    @Prop() readonly label!: string;
    @Prop() readonly type!: string;
    @Prop() readonly rules!: Function[];
    @Prop() readonly hideDetails!: boolean;
    @Prop() readonly prependInnerIcon!: string;
    @Prop() readonly placeholder!: string;


}
</script>

<style>
</style>