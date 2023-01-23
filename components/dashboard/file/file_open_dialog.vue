<template>
    <v-dialog content-class="file-open-dialog" v-model="dialog" scrollable max-width="800px"
        :fullscreen="$vuetify.breakpoint.mobile" transition="dialog-transition">
        <v-card>
            <v-card-title>
                Open file
            </v-card-title>
            <v-card-text class="black--text">
                <div class="d-flex align-center mt-5 mb-4 pb-2 header-section">
                    <vimu-tabs v-model="activeTab" :tabs="tabs" @change="onTabChanged"></vimu-tabs>
                    <vimu-searchbar :hide-details="true" @update="search"></vimu-searchbar>
                </div>

                <file-list :files="files" :loading="loading || nextPageLoading" :initialLoading="loading"
                    :nextPageLoading="nextPageLoading" :searching="filters.query.length > 0" @next="nextPage"
                    view-type="list" :shared="activeTab == 1" :readonly="true" @open="open">
                </file-list>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, VModel, Emit } from "nuxt-property-decorator";
import { $pb, fileStore } from "~/store";
import FileList from "./file_list.vue";

@Component({
    components: {
        FileList
    }
})
export default class FileOpenDialog extends Vue {
    @VModel()
    dialog!: boolean;

    tabs: string[] = ["My Files", "Shared Files"]
    activeTab = 0;

    currentPage = 1;
    loading: boolean = false;
    nextPageLoading: boolean = false;

    filters = {
        tab: `owner="${$pb.authStore.model?.id}"`,
        query: ""
    }

    get assembledFilter(): string {
        let filter = this.filters.tab;
        if (this.filters.query) {
            filter += '&&' + this.filters.query;
        }
        return filter
    }

    get files() {
        return fileStore.files;
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

        if (this.currentPage <= fileStore.maxPage || fileStore.maxPage == -1) {
            this.nextPageLoading = true;
            await this.list(false)
            this.nextPageLoading = false;
        }

    }

    async list(showLoading: boolean = true) {
        this.loading = showLoading;
        await fileStore.list({ page: this.currentPage, perPage: 12, filter: this.assembledFilter, sort: "name" });
        this.loading = false;
    }

    async onTabChanged(tab: number) {
        if (tab == 0) {
            this.filters.tab = `owner="${$pb.authStore.model?.id}"`
        } else if (tab == 1) {
            this.filters.tab = `collaborators.user.id?="${$pb.authStore.model?.id}"`;
        }
        this.currentPage = 1;
        this.list(true);
    }

    @Emit()
    open(file: File) {
        this.dialog = false;
        return file;
    }
}
</script>

<style>
.file-open-dialog {
    height: 90%
}
</style>