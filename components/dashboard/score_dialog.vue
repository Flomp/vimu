<template>
    <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="600px"
        :fullscreen="$vuetify.breakpoint.mobile" transition="dialog-transition">
        <v-card>
            <v-card-title>
                Upload Score
            </v-card-title>
            <v-card-text>
                <v-form class="mt-1">
                    <vimu-text-field v-model="scoreLocal.name" placeholder="Name"></vimu-text-field>
                    <div class="d-flex">
                        <v-file-input class="mr-4" outlined chips placeholder="MusicXML File" accept="application/xml"
                        prepend-icon="mdi-music-clef-bass"></v-file-input>
                    <v-switch label="Public" v-model="scoreLocal.public" inset></v-switch>
                    </div>
    

                    <v-expansion-panels flat>
                        <v-expansion-panel>
                            <v-expansion-panel-header class="font-weight-bold px-0">
                                Additional information
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <vimu-text-field placeholder="Ambitus" prepend-icon="mdi-swap-vertical">
                                </vimu-text-field>
                                <vimu-text-field placeholder="Composer" prepend-icon="mdi-draw"></vimu-text-field>
                                <vimu-text-field placeholder="Date" prepend-icon="mdi-calendar-today"></vimu-text-field>
                                <vimu-text-field placeholder="Instruments" prepend-icon="mdi-piano"></vimu-text-field>
                                <vimu-text-field placeholder="Key Signatures" prepend-icon="mdi-language-csharp">
                                </vimu-text-field>
                                <vimu-text-field placeholder="Language" prepend-icon="mdi-translate"></vimu-text-field>
                                <vimu-text-field placeholder="Time Signatures" prepend-icon="mdi-fraction-one-half">
                                </vimu-text-field>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-form>

            </v-card-text>
            <v-card-actions class="py-4">
                <v-spacer></v-spacer>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <vimu-btn @click="dialog = false">
                    Upload
                </vimu-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop, Watch } from "nuxt-property-decorator";
import { empty_score, Score } from "~/models/score";
import VimuBtn from "../vimu/vimu_button.vue";

@Component({
    components: {
        VimuBtn
    }
})
export default class ScoreDialog extends Vue {
    @VModel() dialog!: boolean;
    @Prop({
        default: () => {
            return Object.assign({}, empty_score)
        }
    }) score!: Score;

    scoreLocal: Score = JSON.parse(JSON.stringify(this.score));

    @Watch("dialog")
    onDialogChanged(value: boolean) {
        if (value) {
            this.scoreLocal = JSON.parse(JSON.stringify(this.score))
        }
    }

}
</script>

<style>

</style>