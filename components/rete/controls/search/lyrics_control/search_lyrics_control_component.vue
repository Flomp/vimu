<template>
  <div>
    <timer-text-field v-model="value" @update="update"></timer-text-field>
    <div class="d-flex align-center mt-2">
      <span>Color:</span>
      <v-menu offset-x :close-on-content-click="false" @input="onClose">
        <template v-slot:activator="{ on, attrs }">
          <v-btn :color="circleColor" dark v-bind="attrs" v-on="on" icon
            ><v-icon>mdi-circle</v-icon></v-btn
          >
        </template>
        <v-color-picker v-model="color" hide-inputs></v-color-picker>
      </v-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import TimerTextField from "~/components/TimerTextField.vue";
import { rgbToHex, isSameColor } from "~/utils/color_util";

@Component({
  components: {
    TimerTextField,
  },
})
export default class SearchLyricsControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  value: string = "";
  color: { r: number; g: number; b: number } = { r: 255, g: 0, b: 0 };
  previousColor: { r: number; g: number; b: number } = { r: 255, g: 0, b: 0 };

  get circleColor() {
    return rgbToHex(this.color);
  }

  mounted() {
    this.value = this.getData(this.ikey);
    this.putData("color", this.circleColor)
  }

  update() {
    if (this.ikey) {
      this.putData(this.ikey, this.value);
      this.putData("color", this.circleColor);
    }
    this.emitter.trigger("process");
  }

  onClose(open: boolean) {
    if(open) {
      this.previousColor = this.color
    }else {
      if(!isSameColor(this.color, this.previousColor)) {
        this.update()
      }
    }
  }
}
</script>



<style scoped>
</style>