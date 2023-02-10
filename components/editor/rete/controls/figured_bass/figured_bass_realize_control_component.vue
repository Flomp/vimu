<template>
  <div>
    <vimu-btn color="primary" @click="update"><v-icon>mdi-sync</v-icon> New Solution</vimu-btn>
    <v-checkbox hide-details label="Keyboard Output" v-model="keyboardOutput" @change="update"></v-checkbox>
    <v-checkbox hide-details label="Incomplete chords" v-model="incompleteChords" @change="update"></v-checkbox>
    <v-text-field class="mt-8" label="max. semitones between parts" v-model="semiTones" @blur="update" type="number"
      :rules="[numberRule]" style="max-width: 190px"></v-text-field>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import VimuBtn from "~/components/vimu/vimu_button.vue";

@Component({
  components: {
    VimuBtn
  }
})
export default class FiguredBassRealizeControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  keyboardOutput: boolean = true;
  incompleteChords: boolean = false;
  semiTones: number = 12

  mounted() {
    if (this.getData("keyboard_output") !== undefined) {
      this.keyboardOutput = this.getData("keyboard_output")
    }
    if (this.getData("incomplete_chords") !== undefined) {
      this.incompleteChords = this.getData("incomplete_chords")
    }
    if (this.getData("semi_tones") !== undefined) {
      this.semiTones = this.getData("semi_tones")
    }


    this.putData("keyboard_output", this.keyboardOutput);
    this.putData("incomplete_chords", this.incompleteChords);
    this.putData("semi_tones", this.semiTones)

  }

  update() {
    this.putData("keyboard_output", this.keyboardOutput);
    this.putData("incomplete_chords", this.incompleteChords);
    this.putData("semi_tones", this.semiTones)

    this.emitter.trigger("process");
  }

  numberRule(v: string) {
    if(!v.length) {
      return true;
    }
    if (!isNaN(parseFloat(v)) && parseFloat(v) > 0) return true;
    return "Not a number";
  }
}
</script>

<style>

</style>