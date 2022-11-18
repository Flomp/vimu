<template>
  <v-select
    :items="items"
    v-model="model"
    outlined
  ></v-select>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "nuxt-property-decorator";

@Component({})
export default class VimuSelect extends Vue {
    @VModel() model!: any;
    @Prop() items: any;
}
</script>

<style>

</style>