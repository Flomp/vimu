<template>
    <v-dialog content-class="source-score-dialog" v-model="dialog" scrollable max-width="800px"
        :fullscreen="$vuetify.breakpoint.mobile" transition="dialog-transition">
        <v-card>
            <v-card-title>
                Choose score
            </v-card-title>
            <v-card-text class="black--text">
                <div class="d-flex align-center mt-5 mb-4 pb-2 header-section">
                    <vimu-tabs v-model="activeTab" :tabs="tabs" @change="onTabChanged"></vimu-tabs>
                    <vimu-searchbar :hide-details="true" @update="search"></vimu-searchbar>
                </div>

                <score-list lg="4" :loading="loading || nextPageLoading" :initialLoading="loading" :nextPageLoading="nextPageLoading" :scores="scores"
                    :read-only="true" @click="select" @next="nextPage" viewType="list">
                </score-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, VModel, Vue, Watch } from "nuxt-property-decorator";
import ScoreCard from "~/components/dashboard/score/score_card.vue";
import ScoreList from "~/components/dashboard/score/score_list.vue";
import VimuSearchbar from "~/components/vimu/vimu_searchbar.vue";
import VimuTabs from "~/components/vimu/vimu_tabs.vue";
import { Score } from "~/models/score";
import { $pb, scoreStore } from "~/store";

@Component({
    components: {
        VimuTabs,
        ScoreCard,
        VimuSearchbar,
        ScoreList
    }
})
export default class SourceScoreDialog extends Vue {
    @VModel() dialog!: boolean;

    tabs: string[] = ["My Scores", "Library"]
    activeTab = 0;
    currentPage = 1;
    loading: boolean = false;
    nextPageLoading: boolean = false;

    filters = {
        tab: `owner="${$pb.authStore.model?.id}"`,
        query: ""
    }

    sort: string = "name";


    get assembledFilter(): string {
        let filter = this.filters.tab;
        if (this.filters.query) {
            filter += '&&' + this.filters.query;
        }
        return filter
    }

    get scores() {
        return scoreStore.scores;
    }

    async search(value?: string) {
        if (!value) {
            this.filters.query = ""
        } else {
            this.filters.query = `(name~"${value}"||meta.composer~"${value}")`
        }
        this.currentPage = 1;
        this.list(true);
    }

    async nextPage() {
        this.currentPage += 1;

        if (this.currentPage <= scoreStore.maxPage || scoreStore.maxPage == -1) {
            this.nextPageLoading = true;
            await this.list(false)
            this.nextPageLoading = false;
        }

    }

    async list(showLoading: boolean = true) {
        this.loading = showLoading;
        await scoreStore.list({ page: this.currentPage, perPage: 12, filter: this.assembledFilter, sort: this.sort });
        this.loading = false;
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

    @Watch("dialog")
    async onDialogChanged(value: boolean) {
        if (!value) {
            return;
        }
        this.currentPage = 1;
        this.list(true);
    }

    @Emit()
    select(score: Score) {
        this.dialog = false;
        return score;
    }

}
</script>

<style>
.source-score-dialog {
    height: 90%
}
</style>