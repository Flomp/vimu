<template>
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
            <v-divider v-if="!shared"></v-divider>
            <v-list-item @click="favorite" v-if="!shared">
                <v-list-item-title>{{ favoriteText }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="share" v-if="!shared">
                <v-list-item-title>Share</v-list-item-title>
            </v-list-item>
            <v-divider v-if="!shared"></v-divider>
            <v-list-item @click="rename" v-if="!shared">
                <v-list-item-title>Rename</v-list-item-title>
            </v-list-item>
            <v-list-item @click="duplicate" v-if="!shared">
                <v-list-item-title>Duplicate</v-list-item-title>
            </v-list-item>
            <v-list-item @click="remove" v-if="!shared">
                <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, VModel } from "nuxt-property-decorator";
import { File } from "~/models/file";

@Component({})
export default class FileContextMenu extends Vue {
    @VModel() menu!: boolean;
    @Prop() file!: File;
    @Prop() shared!: boolean;

    get favoriteText() {
        return this.file.favorite ? 'Remove from favorites' : 'Add to favorites'
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

    @Emit()
    favorite() {
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

</style>