<template>
  <v-combobox class="vimu-searchbar" placeholder="Search" :hide-details="hideDetails"
    prepend-inner-icon="mdi-magnify" append-icon="" outlined hide-no-data hide-selected @update:search-input="update"
    :items="items">

  </v-combobox>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, VModel } from "nuxt-property-decorator";

@Component({})
export default class VimuSearchbar<T> extends Vue {
  @Prop({ default: false }) readonly hideDetails!: boolean;
  @Prop() readonly items!: T[];

  @VModel() query!: string;

  @Emit()
  update(value: string) {
    if(value !== null) {
      this.query = value;
    }
    return value;
  }

}
</script>

<style>
.vimu-searchbar fieldset {
  border: 2px solid currentColor !important;
}
</style>