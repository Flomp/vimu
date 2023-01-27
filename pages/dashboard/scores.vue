<template>
    <v-sheet class="page">
        <v-container class="pt-0">
            <div class="header-section pt-4">
                <div class="d-flex align-center mb-8">
                    <vimu-searchbar id="score-searchbar" v-model="filters.query" :hide-details="true" @update="search"
                        style="max-width: 400px;">
                    </vimu-searchbar>
                    <score-filter-menu v-model="filters.scoreFilter" @change="list"></score-filter-menu>
                    <v-spacer></v-spacer>
                </div>
                <span class="vimu-title">Scores</span>
                <v-row class="align-center my-5">
                    <v-col cols="12" sm="auto">
                        <vimu-btn class="score-upload-btn" :loading="createLoading" :disabled="createLoading"
                            :primary="true" :large="true" @click="openCreateDialog">Upload
                        </vimu-btn>
                    </v-col>
                    <v-col class="ml-sm-12">
                        <vimu-tabs v-model="activeTab" :tabs="tabs" @change="onTabChanged"></vimu-tabs>
                    </v-col>
                    <v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>
                    <v-col cols="auto">
                        <v-btn-toggle v-model="viewNumber" mandatory>
                            <v-btn small>
                                <v-icon>mdi-view-dashboard</v-icon>

                            </v-btn>
                            <v-btn small>
                                <v-icon>mdi-format-list-bulleted-square</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                    </v-col>

                </v-row>
            </div>
            <client-only>
                <score-list :scores="scores" :loading="listLoading || nextPageLoading" :initialLoading="listLoading"
                    :nextPageLoading="nextPageLoading" @create="createFile" @edit="openEditDialog"
                    :searching="searching" :view-type="viewType" @remove="showDeleteConfirm" @click="setDrawerScore"
                    @next="nextPage">
                </score-list>
            </client-only>

        </v-container>
        <score-dialog v-model="dialog" :score="editScore" :edit-mode="dialogEditMode" @save="createScore">
        </score-dialog>
        <score-drawer v-model="drawer" :score="score" @create="createFile"></score-drawer>
        <confirm-dialog v-model="deleteConfirmDialog" title="Are you sure?"
            text="You are about to permanently delete this score" action="Delete" @confirm="removeScore">
        </confirm-dialog>
        <upgrade-dialog v-model="upgradeDialog" :item="limitedItem"></upgrade-dialog>
    </v-sheet>
</template>

<script lang="ts">
import { query } from "express";
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { VBtn, VContainer, VIcon, VSheet, VSpacer } from "vuetify/lib";
import ConfirmDialog from "~/components/dashboard/confirm_dialog.vue";
import ScoreCard from "~/components/dashboard/score/score_card.vue";
import ScoreDialog from "~/components/dashboard/score/score_dialog.vue";
import ScoreDrawer from "~/components/dashboard/score/score_drawer.vue";
import ScoreFilterMenu from "~/components/dashboard/score/score_filter_menu.vue";
import ScoreList from "~/components/dashboard/score/score_list.vue";
import UpgradeDialog from "~/components/dashboard/upgrade_dialog.vue";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuSearchbar from "~/components/vimu/vimu_searchbar.vue";
import VimuTabs from "~/components/vimu/vimu_tabs.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import { Score, ScoreFilter } from "~/models/score";
import { ViewType } from "~/models/view";
import { $pb, fileStore, scoreStore, subscriptionStore } from "~/store";

@Component({
    head: {
        title: "Scores"
    },
    layout: 'dashboard',
    fetchOnServer: false,
    components: {
        VimuTextField,
        VimuTabs,
        VimuBtn,
        ScoreDialog,
        ScoreCard,
        ScoreDrawer,
        VimuSearchbar,
        ConfirmDialog,
        ScoreList,
        ScoreFilterMenu,
        UpgradeDialog
    }
})
export default class ScoresPage extends Vue {
    tabs: string[] = ["My scores", "Library"]
    activeTab = 0;
    dialog: boolean = false;
    upgradeDialog: boolean = false;
    drawer: boolean = true;

    listLoading: boolean = false;
    nextPageLoading: boolean = false;
    createLoading: boolean = false;

    editScore: Score | null = null
    dialogEditMode: boolean = false;

    deletingScore: Score | null = null;
    deleteConfirmDialog: boolean = false;

    filters = {
        tab: `owner="${$pb.authStore.model?.id}"`,
        query: "",
        scoreFilter: <ScoreFilter>{
            composer: [],
            opus: [],
            date: [],
            instruments: [],
            keys: [],
            times: [],
            language: [],
        }
    }

    sort: string = "name";

    currentPage = 1;

    viewNumber = 0;

    limitedItem = "score"

    get viewType(): ViewType {
        return this.viewNumber == 0 ? ViewType.tiles : ViewType.list;
    }

    get scores() {
        return scoreStore.scores;
    }

    get score() {
        return scoreStore.score;
    }

    get assembledFilter(): string {
        let filter = this.filters.tab;
        if (this.filters.query) {
            filter += '&&' + this.filters.query;
        }
        for (const key of Object.keys(this.filters.scoreFilter)) {
            const filterWords = this.filters.scoreFilter[key as keyof ScoreFilter];
            if (!filterWords?.length) {
                continue;
            }
            filter += "&&("
            for (const filterWord of filterWords!) {
                filter += `meta.${key}~"${filterWord}"||`
            }
            filter = filter.slice(0, -2)
            filter += ")"
        }
        return filter
    }

    get searching(): boolean {
        return this.filters.query.length > 0 ||
            Object.keys(this.filters.scoreFilter).some(k => this.filters.scoreFilter[k as keyof ScoreFilter]!.length > 0)

    }

    @Watch("viewNumber")
    onViewNumberChange(value: number) {
        localStorage.setItem('score-view-type', value.toString());
    }

    created() {
        this.drawer = false;

        if (process.client) {
            this.viewNumber = parseInt(localStorage.getItem('score-view-type') ?? '0');
        }
    }

    setDrawerScore(score: Score) {
        this.drawer = true;
        scoreStore.setScore(score);
    }

    async openCreateDialog() {
        this.createLoading = true;
        const scoreLimitReached = await this.checkScoreSubscription();
        this.createLoading = false
        if (scoreLimitReached) {
            return;
        }
        this.dialogEditMode = false;
        this.editScore = null;
        this.dialog = true;
    }

    openEditDialog(score: Score) {
        this.dialogEditMode = true;
        this.editScore = score;
        this.dialog = true;
    }

    showDeleteConfirm(score: Score) {
        this.deletingScore = score;
        this.deleteConfirmDialog = true
    }

    async nextPage() {
        this.currentPage += 1;

        if (this.currentPage <= scoreStore.maxPage || scoreStore.maxPage == -1) {
            this.nextPageLoading = true;
            await this.list(false)
            this.nextPageLoading = false;
        }

    }

    async onTabChanged(tab: number) {
        if (tab == 0) {
            this.filters.tab = `owner="${$pb.authStore.model?.id}"`
        } else if (tab == 1) {
            this.filters.tab = "public=true";
        }
        this.currentPage = 1;
        this.list(true);
    }

    async search(value?: string) {
        if (!value) {
            this.filters.query = ""
        } else {
            this.filters.query = `(name~"${value}"||meta.lyrics~"${value}")`
        }
        this.currentPage = 1;
        this.list(true);
    }

    async list(showLoading: boolean = true) {
        this.listLoading = showLoading;
        await scoreStore.list({ page: this.currentPage, perPage: 24, filter: this.assembledFilter, sort: this.sort });
        this.listLoading = false;
    }

    async checkFileSubscription() {
        if (!subscriptionStore.subscribed) {
            const result = await fileStore.getTotalFiles()
            if (result === null) {
                return true;
            } else if (result >= 2) {
                this.limitedItem = "file";
                this.upgradeDialog = true;
                return true;
            }
        }
        return false
    }

    async checkScoreSubscription() {
        if (!subscriptionStore.subscribed) {
            const result = await scoreStore.getTotalScores()

            if (result === null) {
                return true;
            } else if (result >= 2) {
                this.limitedItem = "score";
                this.upgradeDialog = true;
                return true;
            }
        }
        return false
    }

    async createFile(score: Score) {
        const fileLimitReached = await this.checkFileSubscription();
        if (fileLimitReached) {
            this.createLoading = false;
            return;
        }
        const file = await fileStore.createFileFromScore(score)
        if (file != null) {
            this.$router.push('/editor/' + file.id)
        }
    }

    async createScore(data: { score: Score, file: File | Blob, update: boolean }) {
        this.createLoading = !data.update;
        if (data.update) {
            await scoreStore.update(data.score);
        } else {                       
            if (data.score.expand.meta?.format != "musicxml") {               
                const convertedFile = await scoreStore.convertScoreFile(data.file);
                if (convertedFile) {
                    data.file = convertedFile;
                }
            }

            const thumbnail = await scoreStore.getThumbnail(data.file);
            await scoreStore.create({ ...data, thumbnail: thumbnail ?? undefined })
            await this.list(true);
        }

        this.createLoading = false;
    }

    async removeScore() {
        if (!this.deletingScore) {
            return;
        }
        await scoreStore.delete(this.deletingScore)
    }
}
</script>

<style>

</style>