<template>
  <div>
    <div class="d-flex align-center mt-2">
      <span>Color:</span>
      <menu-color-picker v-model="color" @update="update"></menu-color-picker>
    </div>
    <v-checkbox hide-details label="Pitch" v-model="pitch" @change="update"></v-checkbox>
    <v-checkbox hide-details label="Rhythm" v-model="rhythm" @change="update"></v-checkbox>

  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import MenuColorPicker from "~/components/editor/rete/menu_color_picker.vue";


@Component({
  components: {
    MenuColorPicker
  }
})
export default class SearchControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  color: string = "#ff0000";
  pitch: boolean = true;
  rhythm: boolean = true;

  mounted() {
    this.putData("color", this.color);
    this.putData("pitch", this.pitch);
    this.putData("rhythm", this.rhythm);
  }

  update() {
    if (this.ikey) {
      this.putData("color", this.color);
      this.putData("pitch", this.pitch);
      this.putData("rhythm", this.rhythm);
    }
    this.emitter.trigger("process");
  }
}
</script>



<style scoped>

</style>