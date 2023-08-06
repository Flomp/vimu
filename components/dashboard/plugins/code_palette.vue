<template>
    <div class="d-flex justify-end">
        <v-btn class="palette-button" text dark @click="save">
            <div class="pa-1 d-flex">
                <div>
                    <v-icon color="white">mdi-download</v-icon>
                    <br>
                    <span class="palette-button-text">
                        Save
                    </span>
                </div>
            </div>
        </v-btn>
        <v-btn class="palette-button" :disabled="loading" :loading="loading" text dark @click="run">
            <div class="pa-1 d-flex">
                <div>
                    <v-icon color="success">mdi-play</v-icon>
                    <br>
                    <span class="palette-button-text">
                        Run
                    </span>
                </div>
            </div>
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "nuxt-property-decorator";

@Component({})
export default class CodePalette extends Vue {

    @Prop()
    loading!: boolean;
    
    @Emit()
    run() {
        return;
    }

    @Emit()
    save() {
        return
    }
}
</script>

<style></style>