<template>
    <div class="vimu-card hover-card file-card pa-4" @click="open">
        <div class="d-flex">
            <p class="vimu-card-title" v-if="!editMode">
                {{ file.name }}
            </p>
            <v-spacer></v-spacer>
            <v-btn color="primary" icon @click="favoriteButton" v-if="!shared">
                <v-icon>{{ favoriteIcon }}</v-icon>
            </v-btn>

            <file-context-menu @share="share" @remove="remove" @rename="rename" @favorite="favoriteMenu"
                @duplicate="duplicate" @open="open" @open-in-new-tab="openInNewTab" :file="file" :shared="shared">
            </file-context-menu>
        </div>
        <div class="d-flex justify-space-between align-center pt-3">
            <span class="file-card-timestamp">Edited {{ editTimestamp }}</span>
            <file-share-menu :file="file" :shared="shared"></file-share-menu>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "nuxt-property-decorator";
import FileContextMenu from "~/components/dashboard/file/file_context_menu.vue";
import { File, FilePermission } from "~/models/file";
import getRelativeTime from "~/utils/date";
import FileShareCard from "./file_share_card.vue";
import FileShareMenu from "./file_share_menu.vue";

@Component({
    components: {
        FileShareCard,
        FileContextMenu,
        FileShareMenu
    }
})
export default class FileCard extends Vue {
    @Prop({ required: true }) readonly file!: File;
    @Prop() shared!: boolean;

    editMode: boolean = false;
    newName: string = this.file.name;

    checkTimeInterval!: NodeJS.Timeout;

    get favoriteIcon() {
        return this.file.favorite ? 'mdi-star' : 'mdi-star-outline'
    }

    get permissionIcon() {
        if (this.file.expand.collaborators?.length == 1) {
            return this.file.expand.collaborators[0].permission == FilePermission.view ? "mdi-eye" : "mdi-pencil"
        }
        return "mdi-help-circle"
    }

    editTimestamp = getRelativeTime(this.file.updated)

    mounted() {
        this.checkTimeInterval = setInterval(() => {
            this.editTimestamp = getRelativeTime(this.file.updated);
        }, 1000);
    }

    @Emit()
    share() {
        return this.file;
    }

    @Emit()
    rename() {
        return this.file;
    }

    @Emit()
    remove() {
        return this.file;
    }

    @Emit("favorite")
    favoriteButton(e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation();
        return this.file;
    }

    @Emit("favorite")
    favoriteMenu() {
        return this.file;
    }

    @Emit()
    duplicate() {
        return this.file;
    }

    @Emit()
    open() {
        return this.file;
    }

    @Emit()
    openInNewTab() {
        return this.file;
    }
}
</script>

<style>
.hover-card {
    cursor: pointer;
}

.hover-card:hover {
    background-color: #f1f1f1;
}

.file-card-timestamp {
    font-size: 0.75rem
}
</style>