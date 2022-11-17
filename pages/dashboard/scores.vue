<template>
    <v-sheet class="main">
        <v-container>
            <div class="d-flex align-center mb-12">
                <vimu-text-field v-model="query" placeholder="Search" prepend-inner-icon="mdi-magnify" :clearable=true
                    style="max-width: 400px;" :hide-details="true"></vimu-text-field>
                <v-btn class="mx-5" icon>
                    <v-icon color="primary">mdi-tune</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
            </div>
            <span class="vimu-title">Scores</span>
            <div class="d-flex align-center">

                <vimu-btn class="score-upload-btn" :loading="createLoading" :disabled="createLoading" :primary="true"
                    :large="true" @click="openCreateDialog">Upload
                </vimu-btn>

                <vimu-tabs class="my-6" v-model="activeTab" :tabs="tabs" @change="onTabChanged"></vimu-tabs>

            </div>
            <v-row>
                <template v-if="!listLoading">
                    <v-col cols="12" sm="6" md="4" lg="3" v-for="score in scores" :key="score.id">
                        <score-card :score="score" @edit="openEditDialog" @remove="removeScore" @click="setDrawerScore">
                        </score-card>
                    </v-col>
                </template>
                <template v-else>
                    <v-col cols="12" sm="6" md="4" lg="3" v-for="i in 4" :key="i">
                        <v-skeleton-loader type="card"></v-skeleton-loader>
                    </v-col>
                </template>

            </v-row>
        </v-container>
        <score-dialog v-model="dialog" :score="editScore" :edit-mode="dialogEditMode" @save="createScore">
        </score-dialog>
        <score-drawer v-model="drawer" :score="drawerScore"></score-drawer>
    </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import ScoreCard from "~/components/dashboard/score_card.vue";
import ScoreDialog from "~/components/dashboard/score_dialog.vue";
import ScoreDrawer from "~/components/dashboard/score_drawer.vue";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuTabs from "~/components/vimu/vimu_tabs.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import { Score } from "~/models/score";
import { scoreStore } from "~/store";


@Component({
    layout: 'dashboard',
    fetchOnServer: false,
    components: {
        VimuTextField,
        VimuTabs,
        VimuBtn,
        ScoreDialog,
        ScoreCard,
        ScoreDrawer
    }
})
export default class ScoresPage extends Vue {
    tabs: string[] = ["My scores", "Explore"]
    activeTab = 0;
    dialog: boolean = false;
    drawer: boolean = true;

    listLoading: boolean = false;
    createLoading: boolean = false;

    drawerScore: Score | null = null

    editScore: Score | null = null
    dialogEditMode: boolean = false;

    filter: string = `user_id = "${this.$pb.authStore.model?.id}"`
    sort: string = "name";
    query: string = "";

    get scores() {
        return scoreStore.scores;
    }

    async fetch() {
        await this.list();
    }

    created() {
        this.drawer = false;
    }

    setDrawerScore(score: Score) {
        this.drawer = true;
        this.drawerScore = score;
    }

    openCreateDialog() {
        this.dialogEditMode = false;
        this.editScore = null;
        this.dialog = true;
    }

    openEditDialog(score: Score) {
        this.dialogEditMode = true;
        this.editScore = score;
        this.dialog = true;
    }

    async onTabChanged(tab: number) {
        if (tab == 0) {
            this.filter = `user_id = "${this.$pb.authStore.model?.id}"`
        } else if (tab == 1) {
            this.filter = "public = true";
        }
        this.list(true);
    }

    async list(showLoading: boolean = true) {
        this.listLoading = showLoading;
        await scoreStore.list({ filter: this.filter, sort: this.sort });
        this.listLoading = false;
    }

    async createScore(data: { score: Score, file: File, update: boolean }) {
        this.createLoading = !data.update;
        if (data.update) {
            await scoreStore.update(data.score);
        } else {
            const thumbnail = await scoreStore.getThumbnail(data.file);
            await scoreStore.create({ ...data, thumbnail: thumbnail ?? undefined })
        }

        await this.list(!data.update);
        this.createLoading = false;
    }

    async removeScore(score: Score) {
        await scoreStore.delete(score)
        await this.list(false);
    }
}
</script>

<style>

</style>