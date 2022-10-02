<template>
  <v-row style="width:100px">
    <v-col cols="auto">
      <v-text-field
        label="Start"
        v-model="notes[0]"
        @input="change"
        dark
        type="number"
        :rules="[numberRule]"
      ></v-text-field>
    </v-col>
    <v-col cols="auto">
      <v-text-field
        label="End"
        v-model="notes[1]"
        @input="change"
        dark
        type="number"
        :rules="[numberRule]"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";

import { NodeEditor } from "rete";

@Component({})
export default class SelectNotesControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  notes: number[] = [0, 3];

  mounted() {
    this.change();
  }

  change() {
    if (this.ikey) this.putData(this.ikey, this.notes);
    
    this.emitter.trigger("process");
  }

  numberRule(v: string) {
    if (!isNaN(parseFloat(v))) return true;
    return "Not a number";
  }
}
</script>

<style>
</style>