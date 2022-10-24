<template>
    <div style="position: relative;">
        <main-menu></main-menu>
        <v-progress-linear absolute indeterminate color="black" height="2" v-if="apiLoading"></v-progress-linear>
        <div id="rete" @contextmenu="showContextMenu"></div>
        <sub-menu v-model="showMenu" :absolute="true" :positionX="x" :positionY="y" :items="menuItems"
            @menu-click="createNode" />

    </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue, Watch } from "nuxt-property-decorator";
import { Component as rComponent, NodeEditor } from "rete";
import { LogLevel } from "~/models/log";
import { engineStore, logStore } from "~/store";
import MainMenu from "../main_menu.vue";
import { editorMenuItems, MenuItem } from "../palette/menu_item";
import SubMenu from "../palette/sub_menu.vue";

@Component({
    components: {
        MainMenu,
        SubMenu,
    }
})
export default class EditorPanel extends Vue {
    @InjectReactive()
    editor!: NodeEditor;

    showMenu = false;
    menuItems = editorMenuItems;
    x = 0;
    y = 0;
    editorX = 0;
    editorY = 0;

    get apiLoading() {
        return engineStore.loading;
    }

    mounted() {
        this.bindKeys()
    }


    @Watch("editor")
    onEditorInjected() {
        this.editor.on("mousemove", ({ x, y }) => {
            this.editorX = x;
            this.editorY = y;
        });
    }

    bindKeys() {
        document.addEventListener('keydown', e => {
            const activeElement = document.activeElement as HTMLInputElement;
            if (activeElement?.tagName == "INPUT" && activeElement.type == "text") {
                return;
            }
            if (e.code === "Space") {
                this.x = this.editorX + 2;
                this.y = this.editorY + 30;
                this.$nextTick(() => {
                    this.showMenu = true;
                });
            }
        });
    }

    showContextMenu(e: MouseEvent) {
        e.preventDefault();
        this.showMenu = false;
        this.x = e.clientX;
        this.y = e.clientY;
        this.$nextTick(() => {
            this.showMenu = true;
        });
    }

    async createNode(item: MenuItem) {
        if (!item.key || !this.editor) {
            return;
        }
        const node = await (
            this.editor?.components.get(item.key) as rComponent
        ).createNode();

        node.position = [this.editorX, this.editorY];

        this.editor.addNode(node);

        logStore.log({
            level: LogLevel.info,
            text: `Added new node ${item.key}`,
        });
    }

    downloadJSON() {
        const jsonData = JSON.stringify(this.editor?.toJSON());
        var jsonBlob = new Blob([jsonData], {
            type: "text/xml;charset=utf-8",
        });
        var url = URL.createObjectURL(jsonBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = url;
        const timestamp = new Date().getTime();
        downloadLink.download = `vimu_export_${timestamp}.json`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
</script>


<style>
#rete {
    height: calc(100vh - 36px) !important;
}
</style>