<template>
  <div>
    <v-text-field
      class="pr-5"
      v-model="value"
      @blur="update"
      dark
      solo
      style="max-width: 200px"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";

@Component({})
export default class SourceTinynotationControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  value: string = "";

  mounted() {
    this.value = this.getData(this.ikey);
  }

  update() {
    if (this.ikey) {
      this.putData(this.ikey, this.value);
    }
    this.emitter.trigger("process");
  }
}
</script>



<style scoped>
</style>