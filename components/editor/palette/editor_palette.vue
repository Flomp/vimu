<template>
    <div>
        <div class="ml-4 mb-2">
            <span class="font-weight-bold text-h5">{{ title }}</span>
        </div>
        <div class="d-flex" style="overflow-x: scroll">
            <main-menu></main-menu>
            <template v-if="!readonly">
                <sub-menu :items="item.children" v-for="item, i  in items" :key="i" :dense="true"
                    :close-on-content-click="true" @menu-click="menuClick">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="palette-button" v-bind="attrs" v-on="on" text>
                            <div class="ma-1 d-flex">
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
import VimuBtn from "~/components/vimu/vimu_button.vue";
import { fileStore } from "~/store";
import MainMenu from "./main_menu/main_menu.vue";
import { editorMenuItems, MenuItem } from "./menu_item";
import SubMenu from "./sub_menu.vue";

@Component({
    components: {
        MainMenu,
        SubMenu,
        VimuBtn
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
        return fileStore.file.name + (fileStore.readonly ? ' (readonly)' : '')
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