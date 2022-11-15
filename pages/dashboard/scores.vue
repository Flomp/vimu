<template>
    <v-sheet class="main">
        <v-container>
            <div class="d-flex align-center">
                <vimu-text-field v-model="query" placeholder="Search" prepend-inner-icon="mdi-magnify" :clearable=true
                    style="max-width: 400px;" :hide-details="true"></vimu-text-field>
                <v-btn class="mx-5" icon>
                    <v-icon color="primary">mdi-tune</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <vimu-btn class="score-upload-btn" primary-score :primary="true" @click="dialog = !dialog">Upload
                </vimu-btn>
            </div>
            <vimu-tabs class="my-6" v-model="activeTab" :tabs="tabs"></vimu-tabs>
        </v-container>
        <score-dialog v-model="dialog"></score-dialog>
    </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import ScoreDialog from "~/components/dashboard/score_dialog.vue";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuTabs from "~/components/vimu/vimu_tabs.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";

@Component({
    layout: 'dashboard',
    components: {
        VimuTextField,
        VimuTabs,
        VimuBtn,
        ScoreDialog
    }
})
export default class ScoresPage extends Vue {
    query: string = ""
    tabs: string[] = ["My scores", "Explore"]
    activeTab = 0;
    dialog: boolean = false;
}
</script>

<style>
@media screen and (min-width:960px) {

    .score-upload-btn {
        margin-right: 128px;
    }

}
</style>