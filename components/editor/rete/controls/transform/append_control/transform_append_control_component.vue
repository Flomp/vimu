<template>
  <div>
    <v-checkbox hide-details label="Match instruments" v-model="matchInstruments" @change="update"></v-checkbox>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";


@Component({})
export default class TransformAppendControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  matchInstruments: boolean = false;

  mounted() {
    if (this.getData("match_instruments") !== undefined) {
      this.matchInstruments = this.getData("match_instruments")
    }
    this.putData("match_instruments", this.matchInstruments);
  }

  update() {
    this.putData("match_instruments", this.matchInstruments);

    this.emitter.trigger("process");
  }

}
</script>

<style>

</style>