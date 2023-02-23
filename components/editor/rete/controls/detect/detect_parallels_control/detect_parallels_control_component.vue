<template>
  <div>
    <v-checkbox hide-details label="Open Parallels" v-model="open" @change="update"></v-checkbox>
    <div class="d-flex align-center mt-2">
      <span>Color:</span>
      <menu-color-picker v-model="openColor" @update="update"></menu-color-picker>
    </div>
    <v-checkbox hide-details label="Hidden Parallels" v-model="hidden" @change="update"></v-checkbox>
    <div class="d-flex align-center mt-2">
      <span>Color:</span>
      <menu-color-picker v-model="hiddenColor" @update="update"></menu-color-picker>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import MenuColorPicker from "~/components/editor/rete/menu_color_picker.vue";

@Component({
  components: {
    MenuColorPicker
  },
})
export default class DetectParallelsControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  openColor: string = "#ff0000"
  hiddenColor: string = "#00ff00"

  open: boolean = true;
  hidden: boolean = true;

  mounted() {
    if (this.getData("open_color") !== undefined) {
      this.openColor = this.getData("open_color")
    }
    if (this.getData("open") !== undefined) {
      this.open = this.getData("open")
    }
    if (this.getData("hidden_color") !== undefined) {
      this.hiddenColor = this.getData("hidden_color")
    }
    if (this.getData("hidden") !== undefined) {
      this.hidden = this.getData("hidden")
    }
    this.putData("open_color", this.openColor);
    this.putData("open", this.hidden);
    this.putData("hidden_color", this.hiddenColor);
    this.putData("hidden", this.hidden);
  }

  update() {
    this.putData("open_color", this.openColor);
    this.putData("open", this.open);
    this.putData("hidden_color", this.hiddenColor);
    this.putData("hidden", this.hidden);
    this.emitter.trigger("process");
  }

}
</script>
