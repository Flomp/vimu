<template>
    <v-sheet class="main">
        <v-container>
            <span class="vimu-title">Files</span>
            <div class="py-5">
                <vimu-btn :primary="true" :large="true" @click="createFile">New file <v-icon>mdi-plus</v-icon>
                </vimu-btn>
            </div>
            <v-row>
                <v-col col="12" md="6" lg="4" v-for="file in files" :key="file.id">
                    <file-card :file="file" @remove="removeFile" @rename="renameFile" @favorite="favoriteFile"
                        @open="openFile" @open-in-new-tab="openFileInNewTab">
                    </file-card>
                </v-col>
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
import { Component, Vue } from "nuxt-property-decorator";
import FileCard from "~/components/dashboard/file_card.vue";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import File from "~/models/file";
import { fileStore } from "~/store";

@Component({
    layout: 'dashboard',
    components: {
        VimuTextField,
        VimuBtn,
        FileCard
    },
})
export default class FilesPage extends Vue {
    renameDialog: boolean = false;
    filename: string = ""
    renamingFile: File | null = null;

    get files() {
        return fileStore.files;
    }

    async fetch() {
        await fileStore.list();
    }

    async createFile() {
        await fileStore.create();
        await fileStore.list();

    }

    async removeFile(file: File) {
        await fileStore.delete(file.id);
        await fileStore.list();
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
        await fileStore.list();
        this.renamingFile = null;
        this.renameDialog = false;
    }

    async favoriteFile(file: File) {
        await fileStore.update({ id: file.id, favorite: !file.favorite })
        await fileStore.list();
    }

    openFile(file: File) {
        this.$router.push('/editor/' + file.id);
    }

    openFileInNewTab(file: File) {
        let routeData = this.$router.resolve('/editor/' + file.id);
        console.log(routeData);
        
        window.open(routeData.href, '_blank');
    }
}
</script>
  
<style>

</style>