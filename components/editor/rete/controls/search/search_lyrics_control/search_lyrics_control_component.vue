<template>
  <div>
    <vimu-text-field class="mr-6" v-model="value" :timer="true" @update="update" placeholder="Text" style="max-width: 240px;"></vimu-text-field>
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
import VimuTextField from "~/components/vimu/vimu_text_field.vue";

@Component({
  components: {
    MenuColorPicker,
    VimuTextField
  },
})
export default class SearchLyricsControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  value: string = "";
  color: string = "#ff0000"

  mounted() {
    this.value = this.getData(this.ikey)
    if (this.getData("color") !== undefined) {
      this.color = this.getData("color")
    }
   
    this.putData("color", this.color);
  }

  update() {
    if (this.ikey) {
      this.putData(this.ikey, this.value);
      this.putData("color", this.color);
    }
    this.emitter.trigger("process");
  }

}
</script>
