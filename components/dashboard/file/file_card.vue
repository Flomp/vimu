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
            <v-menu open-on-hover bottom offset-y content-class="vimu-menu elevation-0"
                v-if="((file.expand && file.expand.collaborators) || file.public) && !shared">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-share-variant</v-icon>
                </template>

                <v-list dense>
                    <v-list-item v-if="file.public">
                        <v-list-item-avatar>
                            <v-icon>mdi-earth</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>Anyone</v-list-item-title>
                            <v-list-item-subtitle>can view</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <file-share-card :fileShare="s" :readonly="true" v-for="s in file.expand.collaborators" :key="s.id">

                    </file-share-card>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "nuxt-property-decorator";
import FileContextMenu from "~/components/dashboard/file/file_context_menu.vue";
import { File, FilePermission } from "~/models/file";
import getRelativeTime from "~/utils/date";
import FileShareCard from "./file_share_card.vue";

@Component({
    components: {
        FileShareCard,
        FileContextMenu
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