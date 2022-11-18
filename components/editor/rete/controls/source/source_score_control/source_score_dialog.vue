<template>
    <v-dialog content-class="source-score-dialog" v-model="dialog" scrollable max-width="800px" :fullscreen="$vuetify.breakpoint.mobile"
        transition="dialog-transition">
        <v-card>
            <v-card-title>
                Choose score
            </v-card-title>
            <v-card-text class="black--text">
                <div class="d-flex align-center mt-5 mb-4 pb-2 source-score-dialog-toolbar" >
                    <vimu-tabs v-model="activeTab" :tabs="tabs" @change="onTabChanged"></vimu-tabs>
                    <vimu-searchbar :hide-details="true" @update="search"></vimu-searchbar>
                </div>

                <v-row>
                    <template v-if="!loading">
                        <v-col cols="12" sm="6" md="4" v-for="score in scores" :key="score.id">
                            <score-card :score="score" :read-only="true"
                                @click="select">
                            </score-card>
                        </v-col>
                    </template>
                    <template v-else>
                        <v-col cols="12" sm="6" md="4" v-for="i in 9" :key="i">
                            <v-skeleton-loader type="card" height="173"></v-skeleton-loader>
                        </v-col>
                    </template>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, VModel, Watch, Emit } from "nuxt-property-decorator";
import ScoreCard from "~/components/dashboard/score_card.vue";
import VimuSearchbar from "~/components/vimu/vimu_searchbar.vue";
import VimuTabs from "~/components/vimu/vimu_tabs.vue";
import { Score } from "~/models/score";
import { authStore, scoreStore } from "~/store";

@Component({
    components: {
        VimuTabs,
        ScoreCard,
        VimuSearchbar
    }
})
export default class SourceScoreDialog extends Vue {
    @VModel() dialog!: boolean;

    tabs: string[] = ["My Scores", "Libary"]
    activeTab = 0;

    loading: boolean = false;

    filters = {
        tab: `user_id="${authStore.userId}"`,
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
        }else {
            this.filters.query = `(name~"${value}"||meta.composer~"${value}")`
        }
        this.list(true);
    }

    async list(showLoading: boolean = true) {
        this.loading = showLoading;
        await scoreStore.list({ filter: this.assembledFilter, sort: this.sort });
        this.loading = false;
    }

    async onTabChanged(tab: number) {
        if (tab == 0) {
            this.filters.tab = `user_id="${authStore.userId}"`
        } else if (tab == 1) {
            this.filters.tab = "public=true";
        }
        this.list(true);
    }

    @Watch("dialog")
    async onDialogChanged(value: boolean) {
        if (!value) {
            return;
        }
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

.source-score-dialog-toolbar {
    position: sticky;
    top: 0;
    z-index: 2;
    background: white
}
</style>