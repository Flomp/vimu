<template>
    <tr @click="click" class="hover-table-row">
        <td>

            <span>{{ plugin.name }}</span>

        </td>

        <v-tooltip bottom max-width="250">
            <template v-slot:activator="{ on, attrs }">
                <td v-bind="attrs" v-on="on" class="text-body-2 grey--text text--darken-2"
                    v-if="!$vuetify.breakpoint.mobile"
                    style="max-width: 250px; white-space: nowrap; overflow:hidden; text-overflow: ellipsis;">
                    <span> {{ plugin.description }}
                    </span>
                </td>
            </template>
            <span> {{ plugin.description }}
            </span>
        </v-tooltip>
        <td v-if="!$vuetify.breakpoint.mobile">
            {{ editedTimestamp }}
        </td>
        <td v-if="!$vuetify.breakpoint.mobile">
            {{ createdTimestamp }}
        </td>
        <td>
            <v-tooltip bottom v-if="plugin.public && owned && !readonly">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">
                        mdi-earth
                    </v-icon>
                </template>
                <span>Public</span>
            </v-tooltip>
        </td>
        <td>
            <plugin-context-menu :public="plugin.public" @rename="rename" @publish="publish" @remove="remove"
                v-if="owned && !readonly"></plugin-context-menu>
        </td>
    </tr>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "nuxt-property-decorator";
import { Plugin } from "~/models/plugin";
import { $pb } from "~/store";
import getRelativeTime from "~/utils/date";
import PluginContextMenu from "./plugin_context_menu.vue";


@Component({
    components: {
        PluginContextMenu
    }
})
export default class PluginTableRow extends Vue {
    @Prop() readonly plugin!: Plugin;
    @Prop() readonly readonly!: boolean;

    editedTimestamp = getRelativeTime(this.plugin.updated)
    createdTimestamp = getRelativeTime(this.plugin.created)

    get owned() {
        return this.plugin.owner == $pb.authStore.model?.id
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
.hover-table-row {
    cursor: pointer;
}
</style>