<template>
    <v-sheet class="main">
        <v-container class="pt-0">
            <div class="header-section pt-4">
                <vimu-searchbar class="mb-8" v-model="query" :hide-details="true" @update="search"
                    style="max-width: 400px;">
                </vimu-searchbar>
                <span class="vimu-title">{{ title }}</span>
                <div class="py-5">
                    <vimu-btn class="mt-3 mt-sm-0" :primary="true" :large="true" @click="createFile()">New file <v-icon>
                            mdi-plus</v-icon>
                    </vimu-btn>
                </div>
            </div>
            <file-list :files="files" :loading="listLoading || nextPageLoading" :initialLoading="listLoading"
                :nextPageLoading="nextPageLoading" @create="createFile" :searching="query.length > 0"
                @share="showShareDialog" @remove="showDeleteConfirm" @rename="renameFile" @favorite="favoriteFile"
                @duplicate="duplicateFile" @open="openFile" @open-in-new-tab="openFileInNewTab" @next="nextPage">
            </file-list>
        </v-container>
        <file-rename-dialog v-model="renameDialog" :filename="filename" @save="saveRename"></file-rename-dialog>
        <confirm-dialog v-model="deleteConfirmDialog" title="Are you sure?"
            text="You are about to permanently delete this file" action="Delete" @confirm="removeFile">
        </confirm-dialog>
        <file-share-dialog v-model="shareDialog" :file="sharingFile"></file-share-dialog>
    </v-sheet>
</template>
  
<script lang="ts">
import { Context } from "@nuxt/types";
import { Component, Vue } from "nuxt-property-decorator";
import ConfirmDialog from "~/components/dashboard/confirm_dialog.vue";
import FileCard from "~/components/dashboard/file/file_card.vue";
import FileList from "~/components/dashboard/file/file_list.vue";
import FileRenameDialog from "~/components/dashboard/file/file_rename_dialog.vue";
import FileShareDialog from "~/components/dashboard/file/file_share_dialog.vue";
import VimuAutocomplete from "~/components/vimu/vimu_autocomplete.vue";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";

import File from "~/models/file";
import { fileStore } from "~/store";

@Component({
    layout: 'dashboard',
    fetchOnServer: false,
    components: {
        VimuTextField,
        VimuAutocomplete,
        VimuBtn,
        FileCard,
        FileRenameDialog,
        ConfirmDialog,
        FileList,
        FileShareDialog
    },
})
export default class FilesPage extends Vue {
    renameDialog: boolean = false;
    deleteConfirmDialog: boolean = false;
    shareDialog: boolean = false;

    filename: string = ""
    renamingFile: File | null = null;
    deletingFile: File | null = null;
    sharingFile: File | null = null;

    filter: string = "";
    sort: string = "-created";
    query: string = "";

    listLoading: boolean = false;
    nextPageLoading: boolean = false;

    currentPage = 1;

    get files() {
        return fileStore.files;
    }

    get title() {
        const slug = this.$route.params.slug;

        switch (slug) {
            case 'recent':
                return 'Recent'
        }
        return 'Files'

    }

    validate({ params }: Context) {
        return ['all', 'recent'].includes(params.slug)
    }

    created() {
        const slug = this.$route.params.slug;
        switch (slug) {
            case 'recent':
                this.sort = '-updated'
                this.filter = ''
                break;
            default:
                this.filter = ''
                this.sort = '-created'
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
        console.log(this.query);

        if (!value) {
            this.filter = ""
        } else {
            this.filter = `name~"${value}"`
        }
        this.list(true);
    }

    async list(showLoading: boolean = true) {
        this.listLoading = showLoading;
        await fileStore.list({ page: this.currentPage, perPage: 24, filter: this.filter, sort: this.sort });
        this.listLoading = false;
    }

    async createFile(file?: File, navigate: boolean = true) {
        const newFile = await fileStore.create(file);
        if (newFile === null) {
            return;
        }
        if (navigate) {
            this.$router.push('/editor/' + newFile.id)
        } else {
            this.list(false);
        }
    }

    async duplicateFile(file: File) {
        await this.createFile(file, false);
    }


    async removeFile() {
        if (!this.deletingFile) {
            return;
        }
        await fileStore.delete(this.deletingFile);
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
        this.sharingFile = JSON.parse(JSON.stringify(file));
        this.shareDialog = true;
    }

    async favoriteFile(file: File) {
        await fileStore.update({ id: file.id, favorite: !file.favorite })
    }

    openFile(file: File) {
        fileStore.setFile(file);
        this.$router.push('/editor/' + file.id);
    }

    openFileInNewTab(file: File) {
        let routeData = this.$router.resolve('/editor/' + file.id);

        window.open(routeData.href, '_blank');
    }
}
</script>
  
<style>

</style>