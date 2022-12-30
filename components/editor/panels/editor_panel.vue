<template>
    <div style="position: relative;">
        <main-menu></main-menu>
        <v-progress-linear absolute indeterminate color="black" height="2" v-if="apiLoading"></v-progress-linear>
        <div id="rete" @contextmenu="showContextMenu"></div>
        <sub-menu v-model="showMenu" :absolute="true" :positionX="x" :positionY="y" :items="menuItems"
            @menu-click="createNode" v-if="!readonly" />
    </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue, Watch } from "nuxt-property-decorator";
import { Component as rComponent, NodeEditor } from "rete";
import ErrorBadge from "~/components/vimu/error_badge.vue";
import { LogLevel } from "~/models/log";
import { engineStore, fileStore, logStore } from "~/store";
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

    errorNode: HTMLElement | undefined;

    get readonly() {
        return fileStore.readonly
    }

    get apiLoading() {
        return engineStore.loading;
    }

    get selectedNode() {
        return this.editor.selected.list[0]
    }

    get outputNode() {
        return this.editor.nodes.find(n => n.name == "output")
    }

    get title() {
        return fileStore.file?.name ?? "";
    }

    get engineError() {
        return engineStore.error;
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
        if (this.engineError != null) {
            this.onEngineErrorChange();
        }
    }

    @Watch("engineError")
    onEngineErrorChange() {
        if (this.engineError !== null) {
            const affectedNode = this.editor?.nodes.find(n => n.id == this.engineError?.node.id);
            if (affectedNode) {
                const affectedEl = this.editor?.view.nodes.get(affectedNode)?.el
                if(affectedEl === this.errorNode) {
                    this.errorNode?.lastChild?.remove()
                }
                affectedEl?.children[0].classList.add('engine-error')

                var vueComponent = new ErrorBadge({ propsData: { "error": this.engineError.message } }).$mount();
                affectedEl?.appendChild(vueComponent.$el)
                this.errorNode = affectedEl;
            }
        } else {
            this.errorNode?.children[0].classList.remove("engine-error");
            this.errorNode?.lastChild?.remove()
            this.errorNode = undefined
        }
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
            } else if (e.code === "Enter" && this.selectedNode) {
                this.outputNode?.setMeta({ "Gallo": "WElt" })
                for (const connection of this.outputNode!.getConnections()) {
                    this.editor.removeConnection(connection)
                }
                this.editor.connect(this.selectedNode.outputs.get('out_0')!, this.outputNode!.inputs.get('in_0')!);
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
}
</script>


<style>
#rete {
    height: calc(100vh - 36px) !important;
}
</style>