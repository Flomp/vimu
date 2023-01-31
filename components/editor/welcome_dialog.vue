<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                Welcome to the editor
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col class="text-center">
                        <bunny-engineer :width="150"></bunny-engineer>
                    </v-col>
                    <v-col class="d-flex flex-column justify-center black--text">
                        <p>It looks like this is the first time you are using the <b>vimu</b> editor. </p>
                        <p>We have written a comprehensive quickstart guide available in our documentation section. It
                            will teach you the basics of how to use the editor. Would you like to read it?</p>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mr-4" color="grey" @click="done" text>No, Thanks</v-btn>
                <vimu-btn :primary="true" href="/docs/tutorials/get-started#the-editor" target="_blank" @click="done">Yes, please</vimu-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, VModel, Vue } from "nuxt-property-decorator";
import BunnyEngineer from "~/components/vimu/illustrations/bunny_engineer.vue";
import VimuBtn from "../vimu/vimu_button.vue";

@Component({
    components: {
        VimuBtn,
        BunnyEngineer
    }
})
export default class WelcomeDialog extends Vue {
    @VModel() dialog!: boolean;

    @Emit()
    done() {
        this.dialog = false;
        return;
    }
}
</script>

<style>

</style>