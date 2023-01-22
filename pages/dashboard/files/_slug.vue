<template>
    <v-sheet class="page">
        <v-container class="pt-0">
            <div class="header-section pt-4">
                <vimu-searchbar class="mb-8" v-model="query" :hide-details="true" @update="search"
                    style="max-width: 400px;">
                </vimu-searchbar>
                <span class="vimu-title">{{ title }}</span>

                <v-row class="align-center justify-space-between my-5">
                    <v-col cols="12" md="auto">
                        <vimu-btn class="mt-3 mt-sm-0" :primary="true" :large="true" @click="createFile()"
                            :disabled="createLoading" :loading="createLoading">New file
                        </vimu-btn>
                        <v-menu content-class="vimu-menu elevation-0" nudge-bottom="6" offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark v-bind="attrs" v-on="on" icon>
                                    <v-icon>mdi-chevron-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list dense>
                                <v-list-item @click="importFile">
                                    Import File
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                    <v-col cols="auto">
                        <div class="d-flex align-center">
                            <vimu-select class="mr-3" v-model="sort" :items="sortOptions" :hide-details="true"
                                :dense="true" style="max-width: 200px" @change="updateSort"></vimu-select>
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
                <file-list :files="files" :loading="listLoading || nextPageLoading" :initialLoading="listLoading"
                    :nextPageLoading="nextPageLoading" @create="createFile" :searching="query.length > 0"
                    @share="showShareDialog" @remove="showDeleteConfirm" @rename="renameFile" @favorite="favoriteFile"
                    @duplicate="duplicateFile" @open="openFile" @open-in-new-tab="openFileInNewTab" @next="nextPage"
                    :view-type="viewType" :shared="$route.params.slug == 'shared'">
                </file-list>
            </client-only>

        </v-container>
        <file-rename-dialog v-model="renameDialog" :filename="filename" @save="saveRename"></file-rename-dialog>
        <confirm-dialog v-model="deleteConfirmDialog" title="Are you sure?"
            text="You are about to permanently delete this file" action="Delete" @confirm="removeFile">
        </confirm-dialog>
        <file-share-dialog v-model="shareDialog" :file="file"></file-share-dialog>
        <upgrade-dialog v-model="upgradeDialog" item="file" :limitReached="limitReached"></upgrade-dialog>
    </v-sheet>
</template>
  
<script lang="ts">
import { Context } from "@nuxt/types";
import { Component, Vue, Watch } from "nuxt-property-decorator";
import ConfirmDialog from "~/components/dashboard/confirm_dialog.vue";
import FileCard from "~/components/dashboard/file/file_card.vue";
import FileList from "~/components/dashboard/file/file_list.vue";
import FileRenameDialog from "~/components/dashboard/file/file_rename_dialog.vue";
import FileShareDialog from "~/components/dashboard/file/file_share_dialog.vue";
import UpgradeDialog from "~/components/dashboard/upgrade_dialog.vue";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuSelect from "~/components/vimu/vimu_select.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";

import { File } from "~/models/file";
import { ViewType } from "~/models/view";
import { $pb, fileStore, notificationStore, stripeStore, subscriptionStore } from "~/store";



@Component({
    head: {
        title: "Files"
    },
    layout: 'dashboard',
    fetchOnServer: false,
    components: {
        VimuTextField,
        VimuBtn,
        FileCard,
        FileRenameDialog,
        ConfirmDialog,
        FileList,
        FileShareDialog,
        VimuSelect,
        UpgradeDialog
    },
})
export default class FilesPage extends Vue {
    renameDialog: boolean = false;
    deleteConfirmDialog: boolean = false;
    shareDialog: boolean = false;
    upgradeDialog: boolean = false;

    filename: string = ""
    renamingFile: File | null = null;
    deletingFile: File | null = null;

    filters = {
        slug: "",
        query: ""
    };
    sortOptions = [
        { text: "Alphabetical", value: "name" },
        { text: "Date created", value: "-created" },
        { text: "Last modified", value: "-updated" }
    ]
    sort = "-updated";
    query: string = "";

    listLoading: boolean = false;
    nextPageLoading: boolean = false;
    createLoading: boolean = false;

    currentPage = 1;

    viewNumber = 0;

    limitReached = true;

    get viewType(): ViewType {
        return this.viewNumber == 0 ? ViewType.tiles : ViewType.list;
    }

    get files() {
        return fileStore.files;
    }

    get file() {
        return fileStore.file;
    }

    get title() {
        const slug = this.$route.params.slug;

        switch (slug) {
            case 'shared':
                return 'Shared Files'
        }
        return 'My Files'

    }

    get assembledFilter(): string {
        let filter = this.filters.slug;
        if (this.filters.query) {
            filter += '&&' + this.filters.query;
        }
        return filter
    }

    @Watch("viewNumber")
    onViewNumberChange(value: number) {
        localStorage.setItem('file-view-type', value.toString());
    }

    validate({ params }: Context) {
        return ['my', 'shared'].includes(params.slug)
    }

    created() {
        const slug = this.$route.params.slug;

        switch (slug) {
            case 'shared':
                this.filters.slug = `collaborators.user.id~"${$pb.authStore.model?.id}"`
                break;
            default:
                this.filters.slug = `owner="${$pb.authStore.model?.id}"`
        }

        if (process.client) {
            this.viewNumber = parseInt(localStorage.getItem('file-view-type') ?? '0');
        }
    }

    async nextPage() {
        this.currentPage += 1;

        if (this.currentPage <= fileStore.maxPage || fileStore.maxPage == -1) {
            this.nextPageLoading = true;
            await this.list(false)
            this.nextPageLoading = false;
        }

    }
    async search(value?: string) {
        if (!value) {
            this.filters.query = ""
        } else {
            this.filters.query = `name~"${value}"`
        }
        this.list(true);
    }

    async list(showLoading: boolean = true) {
        this.listLoading = showLoading;
        await fileStore.list({ page: this.currentPage, perPage: 24, filter: this.assembledFilter, sort: this.sort });
        this.listLoading = false;
    }

    async checkSubscription() {
        if (!subscriptionStore.subscribed) {
            const result = await fileStore.getTotalFiles()
            if (result === null) {
                return true;
            } else if (result >= 2) {
                this.limitReached = true;
                this.upgradeDialog = true;
                return true;
            }
        }
        return false
    }

    async createFile(file?: File, name?: string, navigate: boolean = true) {
        this.createLoading = true;
        const fileLimitReached = await this.checkSubscription();
        if (fileLimitReached) {
            this.createLoading = false;
            return;
        }
        const newFile = await fileStore.create({ template: file, name: name });
        if (newFile === null) {
            return;
        }
        if (navigate) {
            this.$router.push('/editor/' + newFile.id)
        } else {
            this.list(false);
        }
        this.createLoading = false;
    }

    async importFile() {
        var input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => {
            const file = (e.target as HTMLInputElement)?.files![0];

            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = readerEvent => {
                var content = readerEvent.target?.result;
                if (!content || content instanceof ArrayBuffer) {
                    notificationStore.sendNotification({ title: 'Unable to import file', color: 'error' })
                    return;
                }
                try {
                    const data = JSON.parse(content);
                    if (data.id !== "vimu@0.1.0" ||
                        !(data.nodes instanceof Object) || data.nodes instanceof Array) {
                        throw new Error()
                    }
                    const importedFile = {
                        expand: {
                            data: {
                                json: content
                            }
                        }
                    }

                    this.createFile(importedFile as any, file.name.replace(/\.[^/.]+$/, ""), false);
                } catch (e) {
                    notificationStore.sendNotification({ title: 'Not a valid vimu file', color: 'error' })
                    return;
                }

            }

        }

        input.click();
    }

    async duplicateFile(file: File) {
        await this.createFile(file, undefined, false);
    }


    async removeFile() {
        if (!this.deletingFile) {
            return;
        }
        await fileStore.delete(this.deletingFile);
        await fileStore.listFavorites()
    }

    renameFile(file: File) {
        this.filename = file.name;
        this.renamingFile = file;
        this.renameDialog = true;
    }

    async saveRename(newFilename: string) {
        if (!this.renamingFile) {
            return;
        }
        await fileStore.update({ id: this.renamingFile.id, name: newFilename })
        this.renamingFile = null;
        this.renameDialog = false;
    }

    showDeleteConfirm(file: File) {
        this.deletingFile = file;
        this.deleteConfirmDialog = true
    }

    showShareDialog(file: File) {
        if(!subscriptionStore.subscribed) {
            this.limitReached = false;
            this.upgradeDialog = true;
            return;
        }
        fileStore.setFile(file)
        this.shareDialog = true;
    }

    async favoriteFile(file: File) {
        await fileStore.update({ id: file.id, favorite: !file.favorite })
        await fileStore.listFavorites()
    }

    openFile(file: File) {
        fileStore.setFile(file);
        this.$router.push('/editor/' + file.id);
    }

    openFileInNewTab(file: File) {
        let routeData = this.$router.resolve('/editor/' + file.id);

        window.open(routeData.href, '_blank');
    }

    async updateSort(value: string) {
        await this.list(true);
    }

}
</script>
  
<style>

</style>