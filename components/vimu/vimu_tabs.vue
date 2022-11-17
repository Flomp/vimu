<template>
  <v-tabs v-model="model" align-with-title @change="change">
    <v-tabs-slider class="vimu-tab-slider"></v-tabs-slider>

    <v-tab v-for="item in tabs" :key="item" class="vimu-tab font-weight-bold" :ripple="false">
      {{ item }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Emit } from "nuxt-property-decorator";

@Component({})
export default class VimuTabs extends Vue {

  @VModel() model!: number;
  @Prop() readonly tabs!: string[];

  @Emit()
  change(value: number) {
    return value;
  }
}
</script>
<style scoped>
::v-deep .v-tabs-slider-wrapper {
  height: 100% !important
}
</style>

<style>
.vimu-tab::before {
  border-radius: 8px;
}

.vimu-tab-slider {
  background-color: inherit !important;
  border: 2px solid currentColor;
  border-radius: 8px;
}
</style>