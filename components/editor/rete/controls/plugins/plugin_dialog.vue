<template>
    <v-dialog content-class="source-score-dialog" v-model="dialog" scrollable max-width="800px"
        :fullscreen="$vuetify.breakpoint.mobile" transition="dialog-transition">
        <v-card>
            <v-card-title>
                Choose plugin
            </v-card-title>
            <v-card-text class="black--text">
                <div class="d-flex align-center mt-5 mb-4 pb-2 header-section">
                    <vimu-tabs v-model="activeTab" :tabs="tabs" @change="onTabChanged"></vimu-tabs>
                    <vimu-searchbar :hide-details="true" @update="search"></vimu-searchbar>
                </div>

                <plugin-list lg="4" :loading="loading || nextPageLoading" :initialLoading="loading"
                    :nextPageLoading="nextPageLoading" :plugins="plugins" :readonly="true" @open="select" @next="nextPage"
                    viewType="list">
                </plugin-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch, Emit, VModel } from "nuxt-property-decorator";
import PluginList from "~/components/dashboard/plugins/plugin_list.vue";
import VimuSearchbar from "~/components/vimu/vimu_searchbar.vue";
import VimuTabs from "~/components/vimu/vimu_tabs.vue";
import { Plugin } from "~/models/plugin";
import { $pb, pluginStore } from "~/store";

@Component({
    components: {
        VimuTabs,
        VimuSearchbar,
        PluginList
    }
})
export default class PluginDialog extends Vue {
    @VModel() dialog!: boolean;

    tabs: string[] = ["My Plugins", "Browse"]
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

    get plugins() {
        return pluginStore.plugins;
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

    async nextPage() {
        this.currentPage += 1;

        if (this.currentPage <= pluginStore.maxPage || pluginStore.maxPage == -1) {
            this.nextPageLoading = true;
            await this.list(false)
            this.nextPageLoading = false;
        }

    }

    async list(showLoading: boolean = true) {
        this.loading = showLoading;
        await pluginStore.list({ page: this.currentPage, perPage: 12, filter: this.assembledFilter, sort: this.sort });
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
    select(plugin: Plugin) {
        this.dialog = false;
        return plugin;
    }

}
</script>

<style></style>