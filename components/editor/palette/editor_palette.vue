<template>
    <div>
        <div class="d-flex ml-4 mb-2">
            <span class="font-weight-bold text-h5">{{ title }}</span>
            <v-spacer></v-spacer>
            <v-menu open-on-hover bottom offset-y nudge-bottom="2" content-class="vimu-menu elevation-0" v-for="editor in editors"
                :key="editor.id">
                <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on">
                        <vimu-avatar class="mx-4" :seed="editor.avatar" size="36"></vimu-avatar>
                    </div>

                </template>

                <v-list dense>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>{{ getEditorTooltip(editor) }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
        <div class="d-flex" style="overflow-x: scroll; overflow-y: hidden">
            <main-menu></main-menu>
            <template v-if="!readonly">
                <sub-menu :items="item.children" v-for="item, i  in items" :key="i" :dense="true"
                    :close-on-content-click="true" @menu-click="menuClick" nudge-bottom="2">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="palette-button" v-bind="attrs" v-on="on" text>
                            <div class="pa-1 d-flex">
                                <div>
                                    <v-icon color="primary">{{ item.icon }}</v-icon>
                                    <br>
                                    <span class="palette-button-text"> {{
                                        item.name
                                    }} </span>
                                </div>
                                <v-icon small>mdi-chevron-down</v-icon>
                            </div>
                        </v-btn>
                    </template>
                </sub-menu>
            </template>

        </div>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "nuxt-property-decorator";
import { VBtn, VIcon } from "vuetify/lib";
import VimuAvatar from "~/components/vimu/vimu_avatar.vue";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import { User } from "~/models/user";
import { fileStore } from "~/store";
import MainMenu from "./main_menu/main_menu.vue";
import { editorMenuItems, MenuItem } from "./menu_item";
import SubMenu from "./sub_menu.vue";

@Component({
    components: {
        MainMenu,
        SubMenu,
        VimuBtn,
        VimuAvatar
    }
})
export default class EditorPalette extends Vue {
    items = editorMenuItems

    get readonly() {
        return fileStore.readonly;
    }

    get title() {
        if (!fileStore.file) {
            return "";
        }
        return fileStore.file.name + (fileStore.readonly ? ' (read-only)' : '')
    }

    get editors() {
        return fileStore.editors;
    }

    getEditorTooltip(editor: User) {
        return editor.username == this.$pb.authStore.model?.username ? editor.username + " (You)" : editor.username
    }

    @Emit()
    menuClick(item: MenuItem) {
        return item;
    }
}
</script>

<style>
.palette-button {
    padding: 0 !important;
    margin: 0 8px;
    height: auto !important;
}

.palette-button-text {
    text-transform: none;
    letter-spacing: normal;
    font-size: 0.75rem;

}
</style>