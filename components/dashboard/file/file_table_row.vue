<template>
    <tr @click="open" class="hover-table-row">
        <td v-if="!readonly">
            <v-btn color="primary" icon @click="favoriteButton">
                <v-icon>{{ favoriteIcon }}</v-icon>
            </v-btn>
        </td>
        <td>
            {{ file.name }}
        </td>
        <td v-if="!$vuetify.breakpoint.mobile">
            {{ editedTimestamp }}
        </td>
        <td v-if="!$vuetify.breakpoint.mobile">
            {{ createdTimestamp }}
        </td>
        <td> <file-share-menu :file="file" :shared="!owned"></file-share-menu>
        </td>
        <td v-if="!readonly">
            <file-context-menu @share="share" @remove="remove" @rename="rename" @favorite="favoriteMenu"
                @duplicate="duplicate" @open="open" @open-in-new-tab="openInNewTab" :file="file" :shared="shared">
            </file-context-menu>
        </td>
    </tr>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "nuxt-property-decorator";
import { File } from "~/models/file";
import { $pb } from "~/store";
import getRelativeTime from "~/utils/date";
import FileContextMenu from "./file_context_menu.vue";
import FileShareMenu from "./file_share_menu.vue";

@Component({
    components: {
        FileContextMenu,
        FileShareMenu
    }
})
export default class FileTableRow extends Vue {
    @Prop() file!: File;
    @Prop() shared!: boolean;
    @Prop() readonly!: boolean;

    get favoriteIcon() {
        return this.file.expand["file_favorites(file)"]?.length ? 'mdi-star' : 'mdi-star-outline'
    }

    get owned() {
        return this.file.owner == $pb.authStore.model?.id;
    }

    editedTimestamp = getRelativeTime(this.file.updated)
    createdTimestamp = getRelativeTime(this.file.created)

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
.hover-table-row {
    cursor: pointer;
}
</style>