<template>
    <v-menu offset-x :close-on-content-click="false" @input="onClose">
        <template v-slot:activator="{ on, attrs }">
            <v-btn :color="color" v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-circle</v-icon>
            </v-btn>
        </template>
        <v-color-picker v-model="currentColor" hide-inputs></v-color-picker>
    </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Emit, VModel } from "nuxt-property-decorator";
import { isSameColor, rgbToHex } from "~/utils/color_util";

@Component({})
export default class MenuColorPicker extends Vue {
    currentColor: { r: number; g: number; b: number } = { r: 255, g: 0, b: 0 };
    previousColor: { r: number; g: number; b: number } = { r: 255, g: 0, b: 0 };

    @VModel() color! : string;

    onClose(open: boolean) {       
        if (open) {
            this.previousColor = this.currentColor;
        } else {
            if (!isSameColor(this.currentColor, this.previousColor)) {
                this.color = rgbToHex(this.currentColor);
                this.update()
            }
        }
    }

    @Emit()
    update() {
        return this.color
    }
}
</script>

<style>

</style>