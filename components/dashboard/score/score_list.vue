<template>
    <div v-infinite-scroll="next" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false"
        infinite-scroll-distance="10">
        <div v-if="scores.length && !initialLoading">
            <v-row v-if="viewType == 'tiles'">
                <template>
                    <v-col :cols="cols" :sm="sm" :md="md" :lg="lg" v-for="score in scores" :key="score.id">
                        <score-card :score="score" :read-only="readOnly" @click="click" @create="create" @edit="edit"
                            @remove="remove">
                        </score-card>
                    </v-col>
                </template>
            </v-row>
            <v-simple-table v-else>
                <thead>
                    <tr>
                        <th style="width: 100px"></th>
                        <th>
                            Title
                        </th>
                        <th v-if="!$vuetify.breakpoint.mobile">
                            Composer
                        </th>
                        <th v-if="!$vuetify.breakpoint.mobile">
                            Opus
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <score-table-row v-for="score in scores" :key="score.id" :score="score" :read-only="readOnly"
                        @click="click" @edit="edit" @remove="remove">

                    </score-table-row>
                </tbody>
            </v-simple-table>
            <div class="d-flex justify-center mt-8" v-if="nextPageLoading">
                <v-progress-circular indeterminate></v-progress-circular>
            </div>
        </div>
        <div class="fill-width d-flex flex-column justify-center align-center mt-12"
            v-else-if="!scores.length && !initialLoading && !searching">
            <bunny-wanted :width="150" />
            <span class="vimu-card-title mt-5">There are no scores here</span>
            <span class="vimu-text text-center">Not sure how to start? <br />Have a look at the <nuxt-link
                    to="/docs/dashboard/scores">documentation</nuxt-link>!</span>
        </div>
        <search-empty-state class="mt-12" v-else-if="!scores.length && !initialLoading && searching">
        </search-empty-state>
        <v-row v-else>
            <v-col :cols="cols" :sm="sm" :md="md" :lg="lg" v-for="i in 4" :key="i">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "nuxt-property-decorator";
import BunnyWanted from "~/components/vimu/illustrations/bunny_wanted.vue";
import { Score } from "~/models/score";
import { ViewType } from "~/models/view";
import SearchEmptyState from "../search_empty_state.vue";
import ScoreCard from "./score_card.vue";
import ScoreTableRow from "./score_table_row.vue";

@Component({
    components: {
        ScoreCard,
        BunnyWanted,
        SearchEmptyState,
        ScoreTableRow
    }
})
export default class ScoreList extends Vue {

    @Prop() readonly scores!: Score[];
    @Prop() readonly initialLoading!: boolean;
    @Prop() readonly nextPageLoading!: boolean;
    @Prop() readonly loading!: boolean;
    @Prop() readonly readOnly!: boolean;
    @Prop() readonly searching!: boolean;
    @Prop({ default: ViewType.tiles }) readonly viewType!: ViewType;

    @Prop({ default: 12 }) readonly cols!: number;
    @Prop({ default: 6 }) readonly sm!: number;
    @Prop({ default: 4 }) readonly md!: number;
    @Prop({ default: 3 }) readonly lg!: number;


    @Emit()
    click(score: Score): any {
        return score;
    }

    @Emit()
    create(score: Score) {
        return score;
    }

    @Emit()
    edit(score: Score) {
        return score;
    }

    @Emit()
    remove(score: Score) {
        return score;
    }

    @Emit()
    next() {
        return;
    }

}
</script>

<style>

</style>