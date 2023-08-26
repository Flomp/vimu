<template>
    <div class="vimu-card hover-card plugin-card pa-4" @click="click">
        <div class="d-flex align-center">
            <span class="vimu-card-title score-card-title mr-1">
                {{ plugin.name }}
            </span>

            <v-spacer></v-spacer>
            <plugin-context-menu :public="plugin.public" @rename="rename" @publish="publish" @remove="remove"
                v-if="owned && !readonly"></plugin-context-menu>
        </div>
        <div>
            <p class="text-body-2 grey--text text--darken-2"
                style="white-space: pre-line; max-height: 200px; overflow:hidden">
                {{ plugin.description }}
            </p>
        </div>
        <div class="d-flex justify-space-between align-center pt-3">
            <span class="file-card-timestamp" v-if="!owned"><span class="grey--text">by
                </span>{{ plugin.expand.owner.username }}</span>
            <v-tooltip bottom v-if="plugin.public && owned && !readonly">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">
                        mdi-earth
                    </v-icon>
                </template>
                <span>Public</span>
            </v-tooltip>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "nuxt-property-decorator";
import PluginContextMenu from "./plugin_context_menu.vue";
import getRelativeTime from "~/utils/date";
import { Plugin } from "~/models/plugin";
import { $pb } from "~/store";

@Component({
    components: {
        PluginContextMenu
    }
})
export default class PluginCard extends Vue {
    @Prop() readonly plugin!: Plugin;
    @Prop() readonly readonly!: boolean;

    editedTimestamp = getRelativeTime(this.plugin.updated)
    createdTimestamp = getRelativeTime(this.plugin.created)

    get owned() {
        return this.plugin.owner == $pb.authStore.model?.id
    }

    get description() {
        return this.plugin.description;
    }

    @Emit()
    click() {
        return this.plugin;
    }

    @Emit()
    rename() {
        return this.plugin;
    }

    @Emit()
    publish() {
        return this.plugin;
    }

    @Emit()
    remove() {
        return this.plugin;
    }
}
</script>

<style>
.hover-card {
    cursor: pointer;
}

.hover-card:hover {
    background-color: #f1f1f1;
}
</style>