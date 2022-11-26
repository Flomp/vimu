<template>
    <div class="vimu-card hover-card file-card pa-4" @click="open">
        <div class="d-flex">
            <p class="vimu-card-title" v-if="!editMode">
                {{ file.name }}
            </p>
            <v-spacer></v-spacer>
            <v-btn color="primary" icon @click="favoriteButton">
                <v-icon>{{ favoriteIcon }}</v-icon>
            </v-btn>

            <v-menu offset-y content-class="vimu-menu elevation-0">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item @click="open">
                        <v-list-item-title>Open</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="openInNewTab">
                        <v-list-item-title>Open in new tab</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="favoriteMenu">
                        <v-list-item-title>{{ favoriteText }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="share">
                        <v-list-item-title>Share</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="rename">
                        <v-list-item-title>Rename</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="duplicate">
                        <v-list-item-title>Duplicate</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="remove">
                        <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </div>
        <div class="d-flex pt-3">
            <span class="file-card-timestamp">Edited {{ editTimestamp }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "nuxt-property-decorator";
import File from "~/models/file";
import getRelativeTime from "~/utils/date";

@Component({
    components: {
    }
})
export default class FileCard extends Vue {
    @Prop({ required: true }) readonly file!: File;

    editMode: boolean = false;
    newName: string = this.file.name;

    checkTimeInterval!: NodeJS.Timeout;

    get favoriteIcon() {
        return this.file.favorite ? 'mdi-star' : 'mdi-star-outline'
    }

    get favoriteText() {
        return this.file.favorite ? 'Remove from favorites' : 'Add to favorites'
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