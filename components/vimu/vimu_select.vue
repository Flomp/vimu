<template>
  <v-select class="vimu-select" :items="items" v-model="model" :hide-details="hideDetails" outlined></v-select>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "nuxt-property-decorator";

@Component({})
export default class VimuSelect extends Vue {
  @VModel() model!: any;
  @Prop() items: any;
  @Prop({default: false}) readonly hideDetails!: boolean;

}
</script>

<style>
.vimu-select fieldset {
  border: 2px solid currentColor !important;
}
</style>