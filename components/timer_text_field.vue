<template>
  <v-text-field
    class="pr-5"
    v-model="text"
    @input="onType"
    hide-details
    outlined
    style="max-width: 200px"
  ></v-text-field>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, VModel } from "nuxt-property-decorator";

@Component({})
export default class TimerTextField extends Vue {

  @VModel()
  text!: string;

  typingTimer!: NodeJS.Timeout;

  onType(q: string) {
    clearTimeout(this.typingTimer);
    if (q) {
      this.typingTimer = setTimeout(() => {
        this.update(q);
      }, 1000);
    }
  }

  @Emit()
  update(q: string) {   
    return q;
  }
}
</script>

<style>
</style>