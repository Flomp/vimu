<template>
    <v-sheet class="page">
        <v-container class="pt-0">
            <div class="header-section pt-4">
                <div class="d-flex align-center mb-8">
                    <vimu-searchbar id="plugin-searchbar" v-model="filters.query" :hide-details="true" @update="search"
                        style="max-width: 400px;">
                    </vimu-searchbar>
                </div>
                <span class="vimu-title">Plugins</span>
                <v-row class="align-center my-5">
                    <v-col cols="12" sm="auto">
                        <vimu-btn class="score-upload-btn" :loading="createLoading" :disabled="createLoading"
                            :primary="true" :large="true" @click="createPlugin">New Plugin
                        </vimu-btn>
                    </v-col>
                    <v-col class="ml-sm-12">
                        <vimu-tabs v-model="activeTab" :tabs="tabs" @change="onTabChanged"></vimu-tabs>
                    </v-col>
                    <v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>
                    <v-col cols="auto">
                        <div class="d-flex align-center">

                            <vimu-select class="mr-3" v-model="sort" :items="sortOptions" :hide-details="true" :dense="true"
                                style="max-width: 200px" @change="updateSort"></vimu-select>
                            <v-btn-toggle v-model="viewNumber" mandatory>
                                <v-btn small>
                                    <v-icon>mdi-view-dashboard</v-icon>

                                </v-btn>
                                <v-btn small>
                                    <v-icon>mdi-format-list-bulleted-square</v-icon>
                                </v-btn>
                            </v-btn-toggle>
                        </div>
                    </v-col>

                </v-row>
            </div>
            <client-only>
                <plugin-list :plugins="plugins" :loading="listLoading || nextPageLoading" :initialLoading="listLoading"
                    :nextPageLoading="nextPageLoading" :searching="searching" :view-type="viewType" @open="openPlugin"
                    @rename="renamePlugin" @publish="publishPlugin" @remove="showDeleteConfirm"
                    @next="nextPage"></plugin-list>
            </client-only>
        </v-container>
        <confirm-dialog v-model="deleteConfirmDialog" title="Are you sure?"
            text="You are about to permanently delete this plugin" action="Delete" @confirm="removePlugin">
        </confirm-dialog>
        <file-rename-dialog v-model="renameDialog" renameable="plugin" :filename="pluginName" @save="saveRename"></file-rename-dialog>
    </v-sheet>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import ConfirmDialog from "~/components/dashboard/confirm_dialog.vue";
import FileRenameDialog from "~/components/dashboard/file/file_rename_dialog.vue";
import PluginList from "~/components/dashboard/plugins/plugin_list.vue";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import { Plugin } from "~/models/plugin";
import { ViewType } from "~/models/view";
import { $pb, pluginStore } from "~/store";


@Component({
    head: {
        title: "Plugins"
    },
    layout: 'dashboard',
    components: {
        VimuBtn,
        PluginList,
        ConfirmDialog,
        FileRenameDialog
    }
})
export default class PluginsPage extends Vue {
    listLoading: boolean = false;
    nextPageLoading: boolean = false;
    createLoading: boolean = false;

    viewNumber = 0;
    currentPage = 1;
    activeTab = 0;

    tabs = [
        "My Plugins",
        "Browse"
    ]

    sortOptions = [
        { text: "Alphabetical", value: "name" },
        { text: "Date created", value: "-created" },
        { text: "Last modified", value: "-updated" }
    ]
    sort: string = "name";

    filters = {
        query: "",
        tab: `owner="${$pb.authStore.model?.id}"`,
    }

    deletingPlugin: Plugin | null = null;
    deleteConfirmDialog: boolean = false;

    pluginName: string = ""
    renamingPlugin: Plugin | null = null;
    renameDialog: boolean = false;

    get plugins() {
        return pluginStore.plugins;
    }

    get searching(): boolean {
        return this.filters.query.length > 0;

    }

    get viewType(): ViewType {
        return this.viewNumber == 0 ? ViewType.tiles : ViewType.list;
    }

    get assembledFilter(): string {
        let filter = this.filters.tab;
        if (this.filters.query) {
            filter = this.filters.query;
        }
        return filter
    }

    @Watch("viewNumber")
    onViewNumberChange(value: number) {
        localStorage.setItem('score-view-type', value.toString());
    }

    created() {
        if (process.client) {
            this.viewNumber = parseInt(localStorage.getItem('score-view-type') ?? '0');
        }
    }

    onTabChanged(tab: number) {
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
            this.filters.query = `(name~"${value}")`
        }
        this.currentPage = 1;
        this.list(true);
    }

    async updateSort(value: string) {
        await this.list(true);
    }

    async nextPage() {
        this.currentPage += 1;

        if (this.currentPage <= pluginStore.maxPage || pluginStore.maxPage == -1) {
            this.nextPageLoading = true;
            await this.list(false)
            this.nextPageLoading = false;
        }

    }

    async list(showLoading: boolean = true) {
        this.listLoading = showLoading;
        await pluginStore.list({ page: this.currentPage, perPage: 24, filter: this.assembledFilter, sort: this.sort });
        this.listLoading = false;
    }


    async createPlugin() {
        this.createLoading = true;

        const newPlugin = await pluginStore.create();
        if (newPlugin === null) {
            this.createLoading = false;
            return;
        }
        pluginStore.setPlugin(newPlugin);
        this.$router.push('/dashboard/plugins/create/' + newPlugin.id)
        this.createLoading = false;

    }

    showDeleteConfirm(plugin: Plugin) {
        this.deletingPlugin = plugin;
        this.deleteConfirmDialog = true
    }

    openPlugin(plugin: Plugin) {
        pluginStore.setPlugin(plugin);
        this.$router.push('/dashboard/plugins/create/' + plugin.id);
    }

    renamePlugin(plugin: Plugin) {
        this.renameDialog = true;
        this.renamingPlugin = plugin;
        this.pluginName = plugin.name;        
    }

    async saveRename(newName: string) {
        if (!this.renamingPlugin) {
            return;
        }
        const updatedPlugin: Plugin = JSON.parse(JSON.stringify(this.renamingPlugin))
        updatedPlugin.name = newName;
        pluginStore.update({ plugin: updatedPlugin, updateClient: true });
        this.renamingPlugin = null;
        this.renameDialog = false;
    }

    async publishPlugin(plugin: Plugin) {
        const updatedPlugin: Plugin = JSON.parse(JSON.stringify(plugin))
        updatedPlugin.public = !updatedPlugin.public
        pluginStore.update({ plugin: updatedPlugin, updateClient: true });
    }

    async removePlugin() {
        if (!this.deletingPlugin) {
            return;
        }
        await pluginStore.delete(this.deletingPlugin)
    }
}
</script>

<style></style>