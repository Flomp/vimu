<template>
    <v-dialog v-model="dialog" scrollable persistent :overlay="false" max-width="650px"
        :fullscreen="$vuetify.breakpoint.mobile" transition="dialog-transition">
        <v-card>
            <v-card-title>
                {{ editMode ? 'Edit' : 'Upload' }} Score
            </v-card-title>
            <v-card-text>
                <v-form ref="form" class="mt-1">
                    <div class="d-flex">
                        <vimu-text-field v-model="scoreLocal.name" placeholder="Name" :rules="nameRules">
                        </vimu-text-field>
                        <v-switch class="ml-4" label="Public" v-model="scoreLocal.public" inset v-if="editMode">
                        </v-switch>

                    </div>
                    <div class="d-flex flex-wrap" v-if="!editMode">
                        <v-file-input v-model="file" class="mr-4" outlined chips placeholder="MusicXML File"
                            :loading="validationLoading" prepend-icon="mdi-music-clef-bass" :rules="fileRules"
                            @change="onFileChanged">
                        </v-file-input>
                        <v-switch label="Public" v-model="scoreLocal.public" inset>
                        </v-switch>
                        <v-menu class="white" open-on-hover bottom offset-y content-class="vimu-menu elevation-0">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn style="margin-top: 14px" v-bind="attrs" v-on="on" icon>
                                    <v-icon>mdi-help-circle-outline</v-icon>
                                </v-btn>
                            </template>

                            <p class="ma-3" style="width:200px">A public score will be visible for other
                                users in the library.</p>
                        </v-menu>
                    </div>

                    <v-expansion-panels flat v-if="scoreLocal.expand.meta">
                        <v-expansion-panel>
                            <v-expansion-panel-header class="font-weight-bold px-0">
                                Additional information
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <vimu-text-field v-model="scoreLocal.expand.meta.composer" placeholder="Composer"
                                    prepend-icon="mdi-account"></vimu-text-field>
                                <vimu-text-field v-model="scoreLocal.expand.meta.opus" placeholder="Opus"
                                    prepend-icon="mdi-folder">
                                </vimu-text-field>
                                <vimu-text-field v-model="scoreLocal.expand.meta.date" placeholder="Date"
                                    prepend-icon="mdi-calendar-today"></vimu-text-field>
                                <vimu-text-field v-model="scoreLocal.expand.meta.instruments" placeholder="Instruments"
                                    prepend-icon="mdi-piano"></vimu-text-field>
                                <vimu-text-field v-model="scoreLocal.expand.meta.keys" placeholder="Key Signatures"
                                    prepend-icon="mdi-language-csharp">
                                </vimu-text-field>
                                <vimu-text-field v-model="scoreLocal.expand.meta.times" placeholder="Time Signatures"
                                    prepend-icon="mdi-fraction-one-half">
                                </vimu-text-field>
                                <vimu-text-field v-model="scoreLocal.expand.meta.language" placeholder="Language"
                                    prepend-icon="mdi-translate"></vimu-text-field>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-form>

            </v-card-text>
            <v-card-actions class="py-4">
                <v-spacer></v-spacer>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <vimu-btn @click="validateAndSave" :disabled="validationLoading">
                    {{ editMode ? 'Save' : 'Upload' }}
                </vimu-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Ref, VModel, Vue, Watch } from "nuxt-property-decorator";
import { empty_score, empty_score_meta, Score } from "~/models/score";
import { scoreStore } from "~/store";
import { required } from "~/utils/verification_rules";
import VimuBtn from "../../vimu/vimu_button.vue";

@Component({
    components: {
        VimuBtn
    }
})
export default class ScoreDialog extends Vue {
    [x: string]: any;
    @VModel() dialog!: boolean;
    @Prop({
        default: () => {
            return Object.assign({}, empty_score)
        }
    }) score!: Score;

    @Prop() readonly editMode!: boolean;

    @Ref() readonly form!: HTMLFormElement;

    scoreLocal: Score = JSON.parse(JSON.stringify(this.score ?? empty_score));

    isValidFile: boolean = true;
    fileRules = [
        required, this.validFileRule
    ]

    nameRules = [
        required
    ]

    validationLoading = false;

    file: File | null = null;

    async onFileChanged(file: File) {
        if (!file) {
            return;
        }
        this.validationLoading = true;
        const meta = await scoreStore.getMeta(file);

        if (meta === null) {
            this.isValidFile = false;
        } else {
            this.scoreLocal.expand.meta = meta;

            this.isValidFile = true;
        }

        this.form?.validate();
        this.validationLoading = false;
    }

    @Watch("dialog")
    onDialogChanged(value: boolean) {
        if (value) {
            this.scoreLocal = JSON.parse(JSON.stringify(this.score ?? empty_score))
            if(!this.scoreLocal.expand.meta) {
                this.scoreLocal.expand.meta = JSON.parse(JSON.stringify(empty_score_meta))
            }
            this.file = null;
            this.validationLoading = false;
        }
        this.form?.resetValidation();
    }

    validFileRule() {
        return this.isValidFile || "Invalid File"
    }

    validateAndSave() {
        if (this.form?.validate()) {
            this.save();
        }
    }

    @Emit()
    save() {
        this.dialog = false
        return { score: this.scoreLocal, file: this.file, update: this.editMode };
    }

}
</script>

<style>

</style>