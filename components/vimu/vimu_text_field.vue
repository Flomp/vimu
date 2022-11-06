<template>
  <v-text-field
    class="vimu-text-field"
    v-model="model"
    :label="label"
    :type="type"
    :rules="rules"
    :hide-details="hideDetails"
    validate-on-blur
    outlined
  ></v-text-field>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "nuxt-property-decorator";

@Component({})
export default class VimuTextField extends Vue {
    @VModel() model!: string;
    @Prop() readonly label!: string;
    @Prop() readonly type!: string;
    @Prop() readonly rules!: Function[];
    @Prop({default: false}) readonly hideDetails!: boolean;

}
</script>

<style>
.vimu-text-field fieldset{
    border: 2px solid currentColor !important;
}
</style>