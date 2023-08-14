<template>
    <div v-infinite-scroll="next" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false"
        infinite-scroll-distance="10">
        <div v-if="plugins.length && !initialLoading">
            <v-row v-if="viewType == 'tiles'">
                <template>
                    <v-col :cols="cols" :sm="sm" :md="md" :lg="lg" v-for="plugin in plugins" :key="plugin.id">
                        <plugin-card :plugin="plugin" :readonly="readonly" @click="open" @edit="edit"
                            @remove="remove" @publish="publish"></plugin-card>
                    </v-col>
                </template>
            </v-row>
            <v-simple-table v-else>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th v-if="!$vuetify.breakpoint.mobile">
                            Description
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
                    <plugin-table-row v-for="plugin in plugins" :key="plugin.id" :plugin="plugin" :readonly="readonly"
                        @click="open" @edit="edit" @publish="publish" @remove="remove">

                    </plugin-table-row>
                </tbody>
            </v-simple-table>
            <div class="d-flex justify-center mt-8" v-if="nextPageLoading">
                <v-progress-circular indeterminate></v-progress-circular>
            </div>
        </div>
        <div class="fill-width d-flex flex-column justify-center align-center mt-12"
            v-else-if="!plugins.length && !initialLoading && !searching">
            <bunny-wanted :width="150" />
            <span class="vimu-card-title mt-5">There are no plugins here</span>
            <span class="vimu-text text-center">Not sure how to start? <br />Have a look at the <nuxt-link
                    to="/">documentation</nuxt-link>!</span>
        </div>
        <search-empty-state class="mt-12" v-else-if="!plugins.length && !initialLoading && searching">
        </search-empty-state>
        <v-row v-else>
            <v-col :cols="cols" :sm="sm" :md="md" :lg="lg" v-for="i in 4" :key="i">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "nuxt-property-decorator";
import BunnyWanted from "~/components/vimu/illustrations/bunny_wanted.vue";
import { Plugin } from "~/models/plugin";
import { ViewType } from "~/models/view";
import SearchEmptyState from "../search_empty_state.vue";
import PluginTableRow from "./plugin_table_row.vue";
import PluginCard from "./plugin_card.vue";

@Component({
    components: {
        BunnyWanted,
        SearchEmptyState,
        PluginTableRow,
        PluginCard
    }
})
export default class PluginList extends Vue {
    @Prop() readonly plugins!: Plugin[];

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


    @Emit()
    open(score: Plugin): any {
        return score;
    }

    @Emit()
    create(score: Plugin) {
        return score;
    }

    @Emit()
    edit(score: Plugin) {
        return score;
    }

    @Emit()
    publish(): void {
        return;
    }

    @Emit()
    remove(score: Plugin) {
        return score;
    }

    @Emit()
    next(): void {
        return;
    }
}
</script>

<style></style>