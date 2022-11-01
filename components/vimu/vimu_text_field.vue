<template>
  <v-text-field
    class="vimu-text-field"
    v-model="model"
    :label="label"
    :type="type"
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

}
</script>

<style>
.vimu-text-field fieldset{
    border: 2px solid currentColor !important;
}
</style>