<template>
  <v-select class="vimu-select" :items="items" v-model="model" :hide-details="hideDetails" :dense="dense" outlined @change="change">
  </v-select>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Emit } from "nuxt-property-decorator";

@Component({})
export default class VimuSelect extends Vue {
  @VModel() model!: any;
  @Prop() items: any;
  @Prop({ default: false }) readonly hideDetails!: boolean;
  @Prop({ default: false }) readonly dense!: boolean;

  @Emit()
  change(value: any) {
    return value;
  }
}
</script>

<style>
.vimu-select fieldset {
  border: 2px solid currentColor !important;
}
</style>