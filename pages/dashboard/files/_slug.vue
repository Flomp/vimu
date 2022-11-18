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
            <v-row>
                <template v-if="!listLoading">
                    <v-col cols="12" sm="6" md="4" lg="3" v-for="file in files" :key="file.id">
                        <file-card :file="file" @remove="showDeleteConfirm" @rename="renameFile"
                            @favorite="favoriteFile" @duplicate="createFile(file, false)" @open="openFile"
                            @open-in-new-tab="openFileInNewTab">
                        </file-card>
                    </v-col>
                </template>
                <template v-else>
                    <v-col cols="12" sm="6" md="4" lg="3" v-for="i in 4" :key="i">
                        <v-skeleton-loader type="card"></v-skeleton-loader>
                    </v-col>
                </template>

            </v-row>
        </v-container>
        <v-dialog v-model="renameDialog" width="500">
            <v-card>
                <v-card-title>
                    Rename file
                </v-card-title>
                <v-card-text class="pb-0">
                    <vimu-text-field v-model="filename"></vimu-text-field>
                </v-card-text>
                <v-card-actions class="py-4">
                    <v-spacer></v-spacer>
                    <vimu-btn @click="saveRename">Save</vimu-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <confirm-dialog v-model="deleteConfirmDialog" title="Are you sure?"
            text="You are about to permanently delete this file." action="Delete" @confirm="removeFile">
        </confirm-dialog>
    </v-sheet>
</template>
  
<script lang="ts">
import { Context } from "@nuxt/types";
import { Component, Vue } from "nuxt-property-decorator";
import ConfirmDialog from "~/components/dashboard/confirm_dialog.vue";
import FileCard from "~/components/dashboard/file_card.vue";
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
        ConfirmDialog
    },
})
export default class FilesPage extends Vue {
    renameDialog: boolean = false;
    deleteConfirmDialog: boolean = false;
    filename: string = ""
    renamingFile: File | null = null;
    deletingFile: File | null = null;

    filter: string = "";
    sort: string = "-created";
    query: string = "";

    listLoading: boolean = false;

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

    get templates() {
        return fileStore.files.filter(f => f.template)
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

    async search(value?: string) {
        if (!value) {
            this.filter = ""
        } else {
            this.filter = `name~"${value}"`
        }
        this.list(true);
    }

    async list(showLoading: boolean = true) {
        this.listLoading = showLoading;
        await fileStore.list({ filter: this.filter, sort: this.sort });
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


    async removeFile() {
        if (!this.deletingFile) {
            return;
        }
        await fileStore.delete(this.deletingFile.id);
        await this.list(false);
    }

    renameFile(file: File) {
        this.filename = file.name;
        this.renamingFile = file;
        this.renameDialog = true;
    }

    async saveRename() {
        if (!this.renamingFile) {
            return;
        }
        await fileStore.update({ id: this.renamingFile.id, name: this.filename })
        await this.list()
        this.renamingFile = null;
        this.renameDialog = false;
    }

    showDeleteConfirm(file: File) {
        this.deletingFile = file;
        this.deleteConfirmDialog = true
    }

    async favoriteFile(file: File) {
        await fileStore.update({ id: file.id, favorite: !file.favorite })
        await this.list(false);
    }

    openFile(file: File) {
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