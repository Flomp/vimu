<template>
    <v-sheet class="page fill-height">
        <div id="plugin-grid" @mouseup="endDrag" @mousemove="onDrag" v-if="plugin">
            <div class="plugin-sidebar">
                <plugin-sidebar :plugin="plugin" @element-click="sidebarElementClick" @plugin-click="selectPlugin"
                    @add-input="addInput" @add-output="addOutput"></plugin-sidebar>
            </div>
            <div id="plugin-editor" style="position:relative">
                <component-palette class="palette py-2" @menu-click="menuClick"></component-palette>
                <div id="plugin-rete" class="pa-0 pixel-grid">
                </div>
            </div>
            <div class="vertical-dragbar" @mousedown="startLeftDrag"></div>
            <div id="code" class="d-flex flex-column" style="background: #24292e;">
                <code-palette class="palette-dark py-2 mb-2" :loading="runLoading" @save="exportCode"
                    @run="run"></code-palette>
                <client-only>
                    <plugin-code-editor :value="plugin.code" :timer="true" ref="codeEditor"
                        @update="saveCode"></plugin-code-editor>
                </client-only>
                <plugin-logs></plugin-logs>
            </div>
            <div class="pa-6">
                <plugin-properties :mode="propertiesMode" :currentIndex="sidebarSelectedIndex"></plugin-properties>
            </div>
        </div>
    </v-sheet>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from "nuxt-property-decorator";
import Rete, { Node, NodeEditor } from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import Vuetify from "vuetify";
import CodePalette from "~/components/dashboard/plugins/code_palette.vue";
import ComponentPalette from "~/components/dashboard/plugins/component_palette.vue";
import PluginCodeEditor from "~/components/dashboard/plugins/plugin_code_editor.vue";
import PluginLogs from "~/components/dashboard/plugins/plugin_logs.vue";
import PluginProperties from "~/components/dashboard/plugins/plugin_properties.vue";
import PluginSidebar from "~/components/dashboard/plugins/plugin_sidebar.vue";
import { MenuItem } from "~/components/editor/palette/menu_item";
import PluginComponent from "~/components/editor/rete/components/plugins/plugin_component";
import { sockets } from "~/components/editor/rete/sockets/sockets";
import { Plugin, PluginControl, PluginInput, PluginOutput, PluginSocket } from "~/models/plugin";
import { pluginStore } from "~/store";
import { download } from "~/utils/download";

@Component({
    layout: 'editor',
    components: {
        ComponentPalette,
        PluginSidebar,
        PluginProperties,
        PluginCodeEditor,
        CodePalette,
        PluginLogs
    }
})
export default class CreatePluginPage extends Vue {

    @Ref()
    codeEditor!: PluginCodeEditor;

    pluginNode!: Node;
    pluginComponent!: PluginComponent
    editor!: NodeEditor;

    isLeftDragging: boolean = false;

    propertiesMode: "plugin" | "inputs" | "outputs" | "controls" = "plugin";
    sidebarSelectedKey: string = ""
    sidebarSelectedIndex: number = -1

    runLoading: boolean = false;

    get plugin() {
        return pluginStore.plugin;
    }

    get pluginWatcher() {
        return JSON.parse(JSON.stringify(this.plugin))
    }


    async fetch() {
        const pid = this.$route.params.id;
        if (pluginStore.plugin == null || pluginStore.plugin.id != pid) {
            await pluginStore.get(pid);
        }
    }


    async mounted() {

        const container = document.querySelector<HTMLElement>("#plugin-rete");
        const editor = new Rete.NodeEditor("vimu@0.1.0", container!);
        const engine = new Rete.Engine("vimu@0.1.0");
        const background = document.createElement("div");
        const [w, h] = [
            editor.view.container.clientWidth,
            editor.view.container.clientHeight,
        ];

        background.classList.add("pixel-grid");

        const AreaPlugin = require("rete-area-plugin").default;
        editor.use(AreaPlugin, { background: background });
        const VueRenderPlugin = require("rete-vue-render-plugin").default;
        editor.use(VueRenderPlugin, {
            options: {
                vuetify: new Vuetify(
                    {
                        theme: {
                            themes: {
                                light: {
                                    primary: '#000000',
                                    accent: '#2962FF',
                                }
                            }
                        }
                    }
                ),
            },
        });
        editor.use(ConnectionPlugin);

        (editor.view.area as any)._zoom.intensity = 0.03;

        this.pluginComponent = new PluginComponent(editor);

        editor.register(this.pluginComponent);
        engine.register(this.pluginComponent);

        const pluginNodeWidth = 186
        const pluginNodeHeight = 144

        this.pluginNode = await this.pluginComponent.createNode();
        this.pluginNode.position = [w / 2 - pluginNodeWidth / 2, h / 2 - pluginNodeHeight / 2]
        editor.addNode(this.pluginNode);

        editor.on("zoom", ({ zoom, source }) => {
            return source != 'dblclick' && zoom > 0.5 && zoom < 2;
        });

        editor.on("nodeselect", (node) => {
            const pluginNodeElement: HTMLElement = (this.pluginNode as any).vueContext?.$el
            pluginNodeElement?.classList.add("selected");

        })

        this.editor = editor;

        document.addEventListener('keydown', e => {
            const activeDOMElement = document.activeElement as HTMLInputElement;
            if (activeDOMElement?.tagName == "TEXTAREA" || (activeDOMElement?.tagName == "INPUT" && ["number", "text"].includes(activeDOMElement.type))) {
                return;
            }
            if (e.code == "Backspace") {
                this.delete()
            }
        });

        this.onPluginChanged(this.plugin!, null)
        editor.selectNode(this.pluginNode)

    }

    setCursor(cursor: CSSStyleDeclaration["cursor"]) {
        let page = document.getElementById("plugin-grid");
        page!.style.cursor = cursor;
    }

    startLeftDrag() {
        this.isLeftDragging = true;

        this.setCursor("ew-resize");
    }

    endDrag() {
        if (this.isLeftDragging) {
            this.setCursor("auto");
            this.editor!.view.resize();
        }
        this.isLeftDragging = false;
    }

    onDrag(event: MouseEvent) {
        if (this.isLeftDragging) {

            let page = document.getElementById("plugin-grid");

            const dragbarWidth = 2;

            const leftColWidth = event.clientX;

            const cols = [
                220,
                leftColWidth - 220,
                dragbarWidth,
                page!.clientWidth - 250 - leftColWidth - dragbarWidth,
                250
            ];

            let newColDefn = cols.map(c => c.toString() + "px").join(" ");

            page!.style.gridTemplateColumns = newColDefn;

            event.preventDefault()
        }
    }

    sidebarElementClick(data: { element: PluginControl | PluginSocket, index: number, mode: "inputs" | "outputs" | "controls" }) {
        this.deselect()
        this.propertiesMode = data.mode;
        this.sidebarSelectedKey = data.element.key;
        this.sidebarSelectedIndex = data.index;

        const pluginNodeDOMElement: HTMLElement = (this.pluginNode as any).vueContext?.$el
        pluginNodeDOMElement?.classList.remove("selected")

        this.editor.selected.list.clear()

        this.select(data.element, data.index);
    }

    selectPlugin() {
        console.log("here");
        
        this.sidebarSelectedKey = "";
        this.propertiesMode = "plugin";
    }

    select(element: PluginControl | PluginSocket | null, index: number) {
        if (element == null) {
            return;
        }
        if (element.key.startsWith("control")) {
            const controlDOMElement: HTMLElement = (this.pluginNode.controls.get(element.key) as any)?.vueContext.$el;
            controlDOMElement?.querySelector(".v-input__slot")?.classList.add("selected-component")
        } else {
            const pluginDOMElement: HTMLElement = (this.pluginNode as any)?.vueContext.$el;
            let socketDOMElement;
            if (element.key.startsWith("in")) {
                socketDOMElement = pluginDOMElement?.querySelectorAll(".input.socket")[index];
            } else {
                socketDOMElement = pluginDOMElement?.querySelectorAll(".output.socket")[index];
            }

            socketDOMElement.classList.add("selected-component");

        }

    }

    deselect() {
        if (this.propertiesMode == "controls") {
            const controlDOMElement: HTMLElement = (this.pluginNode.controls.get(this.sidebarSelectedKey) as any)?.vueContext.$el;
            controlDOMElement?.querySelector(".v-input__slot")?.classList.remove("selected-component")
        } else {
            const pluginDOMElement: HTMLElement = (this.pluginNode as any)?.vueContext.$el;
            const socketDOMElement = pluginDOMElement?.querySelector(".socket.selected-component");
            socketDOMElement?.classList.remove("selected-component");
        }
    }

    addInput() {
        const index = this.plugin?.config.inputs.length;
        const key = "in_" + index;
        const pluginInput = <PluginInput>{ key: key, name: `Stream`, type: "stream" }
        const newPlugin: Plugin = JSON.parse(JSON.stringify(this.plugin));
        newPlugin.config.inputs.push(pluginInput);
        pluginStore.update({ plugin: newPlugin });

        this.codeEditor.insertLine(`${key}_data = input_data.get('${key}')`, 2, 0)
    }

    addOutput() {
        const key = "out_" + this.plugin?.config.outputs.length;
        const pluginOutput = <PluginOutput>{ key: key, name: "Stream", type: "stream" }
        const newPlugin: Plugin = JSON.parse(JSON.stringify(this.plugin));
        newPlugin.config.outputs.push(pluginOutput);
        pluginStore.update({ plugin: newPlugin });
    }

    menuClick(item: MenuItem) {
        const key = "control_" + this.plugin?.config.controls.length
        const newPlugin: Plugin = JSON.parse(JSON.stringify(this.plugin));

        const newControl = PluginControl.createControlInstance(item.key as any, key)
        if (!newControl) {
            throw `Control key ${item.key} not registered`
        }
        newPlugin.config.controls.push(newControl)

        this.codeEditor.insertLine(`${key}_data = node.data.get('${key}')`, 2, 0)
        pluginStore.update({ plugin: newPlugin });

    }

    delete() {
        if (!this.plugin || !this.codeEditor) {
            return;
        }

        const key = this.sidebarSelectedKey;
        const newPlugin: Plugin = JSON.parse(JSON.stringify(this.plugin));

        if (key.startsWith("in")) {
            newPlugin.config.inputs = newPlugin.config.inputs.filter(i => i.key != key);
            this.codeEditor.updateContent(newPlugin.code.replace(`${key}_data = input_data.get('${key}')\n`, ""))

        } else if (key.startsWith("out")) {
            newPlugin.config.outputs = newPlugin.config.outputs.filter(i => i.key != key);
        } else if (key.startsWith("control")) {
            newPlugin.config.controls = newPlugin.config.controls.filter(i => i.key != key);
            this.codeEditor.updateContent(newPlugin.code.replace(`${key}_data = node.data.get('${key}')\n`, ""))
        }
        pluginStore.update({ plugin: newPlugin });

        this.sidebarSelectedKey = "";
        this.propertiesMode = "plugin"
    }

    exportCode() {
        if (!this.plugin) {
            return;
        }
        var jsonBlob = new Blob([this.plugin.code], {
            type: "text;charset=utf-8",
        });
        download(jsonBlob, "py", this.plugin.name)
    }

    async run() {
        this.runLoading = true;
        await pluginStore.run(this.pluginNode)
        this.runLoading = false;
    }

    @Watch("pluginWatcher", { deep: true })
    onPluginChanged(newPlugin: Plugin, oldPlugin: Plugin | null) {

        this.pluginNode.name = this.plugin?.name ?? this.pluginNode.name

        let newInputs: PluginSocket[] = []
        let deletedInputs: PluginSocket[] = [];
        let newOutputs: PluginSocket[] = [];
        let deletedOutputs: PluginSocket[] = [];
        let newControls: PluginControl[] = [];
        let deletedControls: PluginControl[] = [];
        if (oldPlugin) {
            for (const input of newPlugin.config.inputs) {
                if (!oldPlugin.config.inputs.map(y => y.key).includes(input.key)) {
                    newInputs.push(input);
                } else {
                    const pluginInput = this.pluginNode.inputs.get(input.key);
                    if (!pluginInput) {
                        continue;
                    }
                    if (pluginInput.socket.name != sockets[input.type].name) {
                        pluginInput.socket = sockets[input.type]
                    }
                    if (pluginInput.name != input.name) {
                        pluginInput.name = input.name;
                    }
                }
            }
            deletedInputs = oldPlugin.config.inputs.filter(x => !newPlugin.config.inputs.map(y => y.key).includes(x.key));
            for (const output of newPlugin.config.outputs) {
                if (!oldPlugin.config.outputs.map(y => y.key).includes(output.key)) {
                    newOutputs.push(output);
                } else {
                    const pluginOutput = this.pluginNode.outputs.get(output.key);
                    if (!pluginOutput) {
                        continue;
                    }
                    if (pluginOutput.socket.name != sockets[output.type].name) {
                        pluginOutput.socket = sockets[output.type]
                    }
                    if (pluginOutput.name != output.name) {
                        pluginOutput.name = output.name;
                    }
                }
            }

            deletedOutputs = oldPlugin.config.outputs.filter(x => !newPlugin.config.outputs.map(y => y.key).includes(x.key));

            newControls = this.plugin!.config.controls.filter(x => !oldPlugin.config.controls.map(y => y.key).includes(x.key));
            deletedControls = oldPlugin.config.controls.filter(x => !newPlugin.config.controls.map(y => y.key).includes(x.key));
        } else {
            newInputs = newPlugin.config.inputs;
            newOutputs = newPlugin.config.outputs;
            newControls = newPlugin.config.controls;
        }



        newInputs.forEach(x => {
            const input = new Rete.Input(x.key, x.name, sockets[x.type]);
            this.pluginNode.addInput(input);
        })
        deletedInputs.forEach(x => {
            this.pluginNode.removeInput(this.pluginNode.inputs.get(x.key)!);
        });

        newOutputs.forEach(x => {
            const output = new Rete.Output(x.key, x.name, sockets[x.type]);
            this.pluginNode.addOutput(output);
        })
        deletedOutputs.forEach(x => {
            this.pluginNode.removeOutput(this.pluginNode.outputs.get(x.key)!);
        });

        newControls?.forEach((x) => {
            this.pluginComponent.buildControl(this.pluginNode, x);
        })

        deletedControls.forEach(x => {
            this.pluginNode.removeControl(this.pluginNode.controls.get(x.key)!);
        });

        this.pluginNode.update();
    }

    saveCode(value: string) {
        pluginStore.setPluginCode(value);
        pluginStore.update({ plugin: pluginStore.plugin! });
    }
}
</script>

<style>
.palette-dark {
    width: 100%;
    background-color: #24292e;
    transition: 0.25s;
    border-bottom: 1px solid #151515;
    height: 71px
}

.palette-dark:hover {
    background-color: #151515;

}

#plugin-grid {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 220px 1fr 2px 1fr 250px;

}

#plugin-rete {
    height: 100% !important;
}

.plugin-sidebar {
    background-color: #ffffff;
}

.vertical-dragbar {
    cursor: ew-resize;
    background-color: #e0e0e0;
    z-index: 1
}

.v-input>.v-input__control>.selected-component {
    background: #e4ebff;
}

.socket.selected-component {
    background: #e4ebff !important;
}
</style>