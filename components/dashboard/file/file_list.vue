<template>
    <div v-infinite-scroll="next" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false"
        infinite-scroll-distance="10">
        <div v-if="files.length && !initialLoading">
            <v-row v-if="viewType == 'tiles'">
                <template>
                    <v-col :cols="cols" :sm="sm" :md="md" :lg="lg" v-for="file in files" :key="file.id">
                        <file-card :file="file" :shared="shared" @share="share" @remove="remove" @rename="rename"
                            @favorite="favorite" @duplicate="duplicate" @open="open" @open-in-new-tab="openInNewTab">
                        </file-card>
                    </v-col>
                </template>
            </v-row>
            <v-simple-table v-else>
                <thead>
                    <tr>
                        <th>
                            File name
                        </th>
                        <th v-if="!$vuetify.breakpoint.mobile">
                            Last modified
                        </th>
                        <th v-if="!$vuetify.breakpoint.mobile">
                            Created
                        </th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <file-table-row v-for="file in files" :key="file.id" :file="file" :shared="shared" @share="share"
                        @remove="remove" @rename="rename" @favorite="favorite" @duplicate="duplicate" @open="open"
                        @open-in-new-tab="openInNewTab">

                    </file-table-row>
                </tbody>
            </v-simple-table>
            <div class="d-flex justify-center mt-8" v-if="nextPageLoading">
                <v-progress-circular indeterminate></v-progress-circular>
            </div>
        </div>
        <div class="fill-width d-flex flex-column justify-center align-center mt-12"
            v-else-if="!files.length && !initialLoading && !searching">
            <bunny-wanted :width="150" />
            <span class="vimu-card-title mt-5">There are no files here</span>
            <span class="vimu-text">But you could upload some...</span>
        </div>
        <search-empty-state class="mt-12" v-else-if="!files.length && !initialLoading && searching">
        </search-empty-state>
        <v-row v-else>
            <v-col :cols="cols" :sm="sm" :md="md" :lg="lg" v-for="i in 4" :key="i">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
        </v-row>
    </div>
</template>
<v-row>

</v-row>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "nuxt-property-decorator";
import BunnyWanted from "~/components/vimu/bunny_wanted.vue";
import { File } from "~/models/file";
import { ViewType } from "~/models/view";
import SearchEmptyState from "../search_empty_state.vue";
import FileCard from "./file_card.vue";
import FileTableRow from "./file_table_row.vue";

@Component({
    components: {
        FileCard,
        BunnyWanted,
        SearchEmptyState,
        FileTableRow
    }
})
export default class FileList extends Vue {

    @Prop() readonly files!: File[];
    @Prop() readonly initialLoading!: boolean;
    @Prop() readonly nextPageLoading!: boolean;
    @Prop() readonly loading!: boolean;
    @Prop() readonly shared!: boolean;
    @Prop() readonly searching!: boolean;
    @Prop({ default: ViewType.tiles }) readonly viewType!: ViewType;

    @Prop({ default: 12 }) readonly cols!: number;
    @Prop({ default: 6 }) readonly sm!: number;
    @Prop({ default: 4 }) readonly md!: number;
    @Prop({ default: 3 }) readonly lg!: number;

    @Emit()
    share(file: File) {
        return file;
    }

    @Emit()
    rename(file: File) {
        return file;
    }

    @Emit()
    remove(file: File) {
        return file;
    }

    @Emit()
    favorite(file: File) {
        return file;
    }

    @Emit()
    duplicate(file: File) {
        return file;
    }

    @Emit()
    open(file: File) {
        return file;
    }

    @Emit()
    openInNewTab(file: File) {
        return file;
    }

    @Emit()
    next() {
        return;
    }

}
</script>

<style>

</style>