<template>
    <div :class="{ 'offering-upload': offerUpload }" v-infinite-scroll="next" infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check="false" infinite-scroll-distance="10" ref="dropzone" style="min-height: 500px">
        <div v-if="scores.length && !initialLoading">
            <v-row v-if="viewType == 'tiles'">
                <template>
                    <v-col :cols="cols" :sm="sm" :md="md" :lg="lg" v-for="score in scores" :key="score.id">
                        <score-card :score="score" :readonly="readonly" @click="click" @create="create" @edit="edit"
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
                    <score-table-row v-for="score in scores" :key="score.id" :score="score" :readonly="readonly"
                        @click="click" @edit="edit" @remove="remove">

                    </score-table-row>
                </tbody>
            </v-simple-table>
            <div class="d-flex justify-center mt-8" v-if="nextPageLoading">
                <v-progress-circular indeterminate></v-progress-circular>
            </div>
        </div>
        <div class="fill-width d-flex flex-column justify-center align-center py-12"
            v-else-if="!scores.length && !initialLoading && !searching">
            <bunny-wanted :width="150" />
            <span class="vimu-card-title mt-5">There are no scores here</span>
            <span class="vimu-text text-center" v-if="!readonly">Simply drag and drop a MusicXML or MIDI file
                to upload it</span>
            <span class="vimu-text text-center" v-else>You can upload one
                <a target="_blank" href="/dashboard/scores">here</a></span>
        </div>
        <search-empty-state class="py-12" v-else-if="!scores.length && !initialLoading && searching">
        </search-empty-state>
        <v-row v-else>
            <v-col :cols="cols" :sm="sm" :md="md" :lg="lg" v-for="i in 4" :key="i">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Ref } from "nuxt-property-decorator";
import BunnyWanted from "~/components/vimu/illustrations/bunny_wanted.vue";
import { empty_score, Score } from "~/models/score";
import { ViewType } from "~/models/view";
import { notificationStore, scoreStore } from "~/store";
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
    @Prop() readonly readonly!: boolean;
    @Prop() readonly searching!: boolean;
    @Prop({ default: ViewType.tiles }) readonly viewType!: ViewType;

    @Prop({ default: 12 }) readonly cols!: number;
    @Prop({ default: 6 }) readonly sm!: number;
    @Prop({ default: 4 }) readonly md!: number;
    @Prop({ default: 3 }) readonly lg!: number;

    @Ref() dropzone!: HTMLDivElement;

    offerUpload: boolean = false;

    mounted() {
        this.dropzone.ondragover = (e) => {
            this.offerUpload = true;
            e.preventDefault();
        }

        this.dropzone.ondragleave = (e) => {
            this.offerUpload = false;
        }

        this.dropzone.ondrop = async (e) => {
            e.preventDefault();
            this.offerUpload = false;

            let file: File | null = null
            if (e.dataTransfer?.items && e.dataTransfer?.items.length) {
                const item = e.dataTransfer?.items[0];
                if (item.kind === 'file') {
                    file = item.getAsFile();
                }
            } else if (e.dataTransfer?.files && e.dataTransfer?.files.length) {
                file = e.dataTransfer.files[0]
            }
            if (!file) {
                return;
            }

            const meta = await scoreStore.getMeta(file);

            if (meta === null) {
                notificationStore.sendNotification({ title: "Invalid file format", color: "error" })
                return;
            }

            const score: Score = Object.assign({}, empty_score)
            score.name = file.name.replace(/\.[^/.]+$/, "");
            score.expand.meta = meta;


            this.upload({ score: score, file: file })

        }
    }


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


    @Emit()
    upload(data: { score: Score, file: File | Blob }) {
        return { ...data, update: false };
    }

}
</script>

<style>
.offering-upload {
    outline: 2px dashed currentColor;
    border-radius: 10px;
}
</style>