<template>
  <v-select class="vimu-select" :items="items" v-model="model" :hide-details="hideDetails" :dense="dense" :disabled="disabled" outlined
    @change="change" @blur="blur">
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
  @Prop({ default: false }) readonly disabled!: boolean;

  @Emit()
  change(value: any) {
    return value;
  }

  @Emit()
  blur(event: Event) {
    return event;
  }
}
</script>

<style>
.vimu-select fieldset {
  border: 2px solid currentColor !important;
}
</style>