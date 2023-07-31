<template>
    <div>
        <v-row class="align-center justify-space-between my-5">
            <v-col cols="12" md="auto" v-if="!shared">
                <vimu-btn class="mt-3 mt-sm-0" :primary="true" :large="true" @click="createFile()" :disabled="createLoading"
                    :loading="createLoading">New file
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
            <v-spacer style="height: 68px" v-else></v-spacer>
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
        <client-only>
            <file-list :files="files" :loading="listLoading || nextPageLoading" :initialLoading="listLoading"
                :nextPageLoading="nextPageLoading" @create="createFile" :searching="searching" @share="showShareDialog"
                @remove="showDeleteConfirm" @rename="renameFile" @favorite="favoriteFile" @duplicate="duplicateFile"
                @open="openFile" @open-in-new-tab="openFileInNewTab" @next="nextPage" :view-type="viewType"
                :shared="shared">
            </file-list>
        </client-only>
        <file-rename-dialog v-model="renameDialog" :filename="filename" @save="saveRename"></file-rename-dialog>
        <confirm-dialog v-model="deleteConfirmDialog" title="Are you sure?"
            text="You are about to permanently delete this file" action="Delete" @confirm="removeFile">
        </confirm-dialog>
        <file-share-dialog v-model="shareDialog" :file="file"></file-share-dialog>
        <upgrade-dialog v-model="upgradeDialog" item="file" :reason="upgradeReason"></upgrade-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
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
import { fileStore, notificationStore, subscriptionStore } from "~/store";

@Component({
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
    }
})
export default class FileExplorer extends Vue {
    @Prop({ default: () => [] }) filters!: string[];
    @Prop({ default: false }) searching!: boolean;
    @Prop({ default: false }) shared!: boolean;
    @Prop() query!: string;
    @Prop() team!: string;

    renameDialog: boolean = false;
    deleteConfirmDialog: boolean = false;
    shareDialog: boolean = false;
    upgradeDialog: boolean = false;

    filename: string = ""
    renamingFile: File | null = null;
    deletingFile: File | null = null;


    sortOptions = [
        { text: "Alphabetical", value: "name" },
        { text: "Date created", value: "-created" },
        { text: "Last modified", value: "-updated" }
    ]
    sort = "-updated";

    listLoading: boolean = false;
    nextPageLoading: boolean = false;
    createLoading: boolean = false;

    currentPage = 1;

    viewNumber = 0;

    upgradeReason: "limit" | "share" = "limit";

    get viewType(): ViewType {
        return this.viewNumber == 0 ? ViewType.tiles : ViewType.list;
    }

    get files() {
        return fileStore.files;
    }

    get file() {
        return fileStore.file;
    }

    get assembledFilter(): string {
        
        let filter = this.filters.filter(f => f.length).join('&&')
        if(this.query) {
            filter = filter + '&&' + this.query
        }
        return filter;
    }

    @Watch("query")
    onQueryChange(value: string) {
        this.list(false)
    }

    @Watch("viewNumber")
    onViewNumberChange(value: number) {
        localStorage.setItem('file-view-type', value.toString());
    }

    created() {
        if (process.client) {
            this.viewNumber = parseInt(localStorage.getItem('file-view-type') ?? '0');
        }
    }

    async fetch() {
        await this.list(true)
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
                this.upgradeReason = "limit";
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
        const newFile = await fileStore.create({ template: file, name: name, team: this.team });
        if (newFile === null) {
            this.createLoading = false;
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
        if (!subscriptionStore.subscribed) {
            this.upgradeReason = "share";
            this.upgradeDialog = true;
            return;
        }
        fileStore.setFile(file)
        this.shareDialog = true;
    }

    async favoriteFile(file: File) {
        if(file.expand["file_favorites(file)"]?.length) {
            await fileStore.unfavoriteFile(file)
        }else {
            await fileStore.favoriteFile(file)
        }
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

<style></style>