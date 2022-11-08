<template>
    <v-sheet class="main">
        <v-container>
            <vimu-text-field v-model="query" class="mb-8" placeholder="Search" prepend-inner-icon="mdi-magnify"
                :clearable=true style="max-width: 400px;"></vimu-text-field>
            <span class="vimu-title">{{ title }}</span>
            <div class="py-5">
                <v-menu offset-y content-class="vimu-menu elevation-0">
                    <template v-slot:activator="{ on, attrs }">
                        <vimu-btn :large="true" class="mr-2" v-bind="attrs" v-on="on">From template <v-icon>
                                mdi-menu-down</v-icon>
                        </vimu-btn>
                    </template>
                    <v-list>
                        <template v-if="templates.length > 0">
                            <v-list-item v-for="template in templates" :key="template.id" @click="createFile(template)">
                                {{ template.name }}
                            </v-list-item>
                        </template>
                        <v-list-item>
                            <span class="empty-text">You have not created any template yet</span>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <vimu-btn class="mt-3 mt-sm-0" :primary="true" :large="true" @click="createFile">New file <v-icon>
                        mdi-plus</v-icon>
                </vimu-btn>
            </div>
            <v-row>
                <template v-if="!listLoading">
                    <v-col cols="12" sm="6" md="4" lg="3" v-for="file in files" :key="file.id">
                        <file-card :file="file" @remove="removeFile" @rename="renameFile" @favorite="favoriteFile"
                            @template="createTemplate" @open="openFile" @open-in-new-tab="openFileInNewTab">
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
                <v-card-actions class="pb-5">
                    <v-spacer></v-spacer>
                    <vimu-btn @click="saveRename">Save</vimu-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-sheet>
</template>
  
<script lang="ts">
import { Context } from "@nuxt/types";
import { Component, Vue } from "nuxt-property-decorator";
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
        FileCard
    },
})
export default class FilesPage extends Vue {
    renameDialog: boolean = false;
    filename: string = ""
    renamingFile: File | null = null;

    filter: string = "";
    sort: string = "-created";
    query: string = "";

    listLoading: boolean = false;

    get files() {
        if (this.query === null) {
            this.query = ""
        }
        return fileStore.files.filter(f => f.name.includes(this.query));
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

    async fetch() {
        await this.list();
    }

    async list(showLoading: boolean = true) {
        this.listLoading = showLoading;
        await fileStore.list({ filter: this.filter, sort: this.sort });
        this.listLoading = false;
    }

    async createFile(file?: File) {
        await fileStore.create(file);
        await this.list()

    }

    async removeFile(file: File) {
        await fileStore.delete(file.id);
        await this.list();
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

    async favoriteFile(file: File) {
        await fileStore.update({ id: file.id, favorite: !file.favorite })
        await this.list(false);
    }

    async createTemplate(file: File) {
        await fileStore.update({ id: file.id, template: !file.template })
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