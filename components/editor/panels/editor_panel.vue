<template>
    <div style="position: relative;">
        <editor-palette class="palette py-2" @menu-click="createNode" @plugin="createPluginNode"></editor-palette>
        <v-progress-linear absolute indeterminate color="black" height="2" v-if="apiLoading"></v-progress-linear>
        <div id="rete" @contextmenu="showContextMenu"></div>
        <v-snackbar outlined bottom left v-model="showSnackbar" :timeout="10000" min-width="0">
            Would you like to open the Plot Panel?

            <template v-slot:action="{ attrs }">
                <v-btn color="primary" text v-bind="attrs" @click="showSnackbar = false">
                    No
                </v-btn>
                <v-btn color="primary" text v-bind="attrs" @click="showPlotPanel">
                    Yes
                </v-btn>
            </template>
        </v-snackbar>
        <welcome-dialog v-model="showWelcomeDialog" @done="disableTutorial"></welcome-dialog>
    </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue, Watch } from "nuxt-property-decorator";
import Rete, { Component as rComponent, NodeEditor } from "rete";
import { VBtn, VProgressLinear, VSnackbar } from "vuetify/lib";
import ErrorBadge from "~/components/vimu/error_badge.vue";
import { LogLevel } from "~/models/log";
import { EditorSettings } from "~/models/settings";
import { engineStore, fileStore, logStore, settingsStore } from "~/store";
import EditorPalette from "../palette/editor_palette.vue";
import { editorMenuItems, MenuItem } from "../palette/menu_item";
import SubMenu from "../palette/sub_menu.vue";
import WelcomeDialog from "../welcome_dialog.vue";
import { Plugin } from "~/models/plugin";
import { sockets } from "../rete/sockets/sockets";
import TextControl from "../rete/controls/plugins/text/text_control";
import BoolControl from "../rete/controls/plugins/bool/bool_control";
import { NodePluginEditor } from "~/utils/rete";
import PluginComponent from "../rete/components/plugins/plugin_component";

@Component({
    components: {
        SubMenu,
        EditorPalette,
        WelcomeDialog
    }
})
export default class EditorPanel extends Vue {
    @InjectReactive()
    editor!: NodePluginEditor;

    showMenu = false;
    menuItems = editorMenuItems;
    x = 0;
    y = 0;
    editorX = 0;
    editorY = 0;

    errorNode: HTMLElement | undefined;

    showSnackbar: boolean = false;

    showWelcomeDialog: boolean = false;

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

    get engineError() {
        return engineStore.error;
    }

    get title() {
        if (!fileStore.file) {
            return "";
        }
        return fileStore.file.name + (fileStore.readonly ? ' (readonly)' : '')
    }

    mounted() {
        this.bindKeys()

        if (settingsStore.settings.tutorial_completed === false && this.$pb.authStore.isValid) {
            this.showWelcomeDialog = true;
        }
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
                if (affectedEl === this.errorNode) {
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
            if (e.code === "Enter" && this.selectedNode) {
                this.outputNode?.setMeta({ "Gallo": "WElt" })
                for (const connection of this.outputNode!.getConnections()) {
                    this.editor.removeConnection(connection)
                }
                this.editor.connect(this.selectedNode.outputs.get('out_0')!, this.outputNode!.inputs.get('in_0')!);
            }
        });
    }

    showContextMenu(e: MouseEvent) {
        // e.preventDefault();
        this.showMenu = false;
        this.$nextTick(() => {
            this.showMenu = true;
        });
    }

    async createNode(item: MenuItem) {

        if (!item.key || !this.editor) {
            return;
        }

        if (item.key.startsWith('plot') && !settingsStore.settings.plot) {
            this.showSnackbar = true;
        }
        const node = await this.editor?.getComponent(item.key).createNode();

        node.position = [this.editorX, this.editorY];

        this.editor.addNode(node);

        logStore.log({
            level: LogLevel.info,
            text: `Added new node ${item.key}`,
        });
    }

    async createPluginNode(plugin: Plugin) {
        const component = await this.editor?.getComponent("plugin_node") as PluginComponent
        let node = await component.createNode();
        node = await component.buildPlugin(node, plugin);
        this.editor.addNode(node);
        node.name = plugin.name;

    }

    showPlotPanel() {
        const settings: EditorSettings = JSON.parse(
            JSON.stringify(settingsStore.settings)
        );
        settings.plot = true;
        settingsStore.updateEditorSettings(settings);

        this.showSnackbar = false;
    }

    disableTutorial() {
        const settings: EditorSettings = JSON.parse(
            JSON.stringify(settingsStore.settings)
        );

        settings.tutorial_completed = true;
        settingsStore.updateEditorSettings(settings);
    }
}
</script>


<style>
#rete {
    height: 100vh;
}

.palette {
    position: absolute;
    z-index: 1;
    width: 100%;
    background-color: transparent;
    transition: 0.25s;
    backdrop-filter: blur(3px);
    border-bottom: 2px solid #f5f5f5;
}

.palette:hover {
    background-color: #fff;

}
</style>