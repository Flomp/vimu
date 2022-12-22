<template>
  <div>
    <div class="d-flex align-center mt-2">
      <span>Color:</span>
      <menu-color-picker v-model="color" @update="update"></menu-color-picker>
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
export default class DetectVoiceCrossingsControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  color: string = "#ff0000"

  mounted() {
    this.putData("color", this.color);
  }

  update() {   
    if (this.ikey) {
      this.putData("color", this.color);
    }
    this.emitter.trigger("process");
  }

}
</script>
