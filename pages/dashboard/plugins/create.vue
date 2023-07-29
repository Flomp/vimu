<template>
    <v-sheet class="page fill-height">
        <div id="plugin-grid" @mouseup="endDrag" @mousemove="onDrag">
            <div class="pa-6">
                <plugin-sidebar v-model="sidebarSelectedItem" :plugin="plugin" @element-click="sidebarElementClick"
                    @add-input="addInput" @add-output="addOutput"></plugin-sidebar>
            </div>
            <div id="editor" style="position:relative">
                <component-palette class="palette py-2" @menu-click="menuClick"></component-palette>
                <div id="plugin-rete" class="pa-0 pixel-grid">
                </div>
            </div>
            <div class="vertical-dragbar" @mousedown="startLeftDrag"></div>
            <div id="code" class="blue-grey darken-4">
                <client-only>
                    <plugin-code-editor v-model="content" ref="codeEditor" :readonlyLines="[3, 4]"></plugin-code-editor>
                </client-only>
            </div>
            <div class="pa-6">
                <plugin-properties :plugin="plugin" :active-element="activeElement"></plugin-properties>
            </div>
        </div>
    </v-sheet>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from "nuxt-property-decorator";
import Rete, { Node, NodeEditor } from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import Vuetify from "vuetify";
import ComponentPalette from "~/components/dashboard/plugins/component_palette.vue";
import PluginCodeEditor from "~/components/dashboard/plugins/plugin_code_editor.vue";
import PluginProperties from "~/components/dashboard/plugins/plugin_properties.vue";
import PluginSidebar from "~/components/dashboard/plugins/plugin_sidebar.vue";
import { MenuItem } from "~/components/editor/palette/menu_item";
import PluginComponent from "~/components/editor/rete/components/plugins/plugin_component";
import TextControl from "~/components/editor/rete/controls/plugins/text/text_control";
import { sockets } from "~/components/editor/rete/sockets/sockets";
import { Plugin, PluginControl, PluginInput, PluginOutput, PluginSocket, PluginTextField, empty_plugin } from "~/models/plugin";
import { countNewLinesBeforeQueryTerm } from "~/utils/string";

@Component({
    layout: 'editor',
    components: {
        ComponentPalette,
        PluginSidebar,
        PluginProperties,
        PluginCodeEditor
    }
})
export default class CreatePluginPage extends Vue {

    @Ref()
    codeEditor!: PluginCodeEditor;

    pluginNode!: Node;
    editor!: NodeEditor;

    plugin: Plugin = empty_plugin;

    activeElement: PluginControl | PluginSocket | null = null;

    sidebarSelectedItem: number = -1;

    content: string = `from music21 import *

class PluginRepository(Repository):
    def process(self, node: EngineNode, input_data: WorkerInputs, output_data: WorkerOutputs):

        if in_0_data is not None:
            new_output_data = in_0_data

            for key in node.outputs.keys():
                output_data[key] = new_output_data`;

    isLeftDragging: boolean = false;


    get pluginWatcher() {
        return JSON.parse(JSON.stringify(this.plugin))
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

        const pluginComponent = new PluginComponent(editor);

        editor.register(pluginComponent);
        engine.register(pluginComponent);

        const pluginNodeWidth = 186
        const pluginNodeHeight = 144

        this.pluginNode = await pluginComponent.createNode();
        this.pluginNode.position = [w / 2 - pluginNodeWidth / 2, h / 2 - pluginNodeHeight / 2]
        this.plugin.name = this.plugin.name
        editor.addNode(this.pluginNode);
        editor.selectNode(this.pluginNode)

        editor.on("zoom", ({ zoom, source }) => {
            return source != 'dblclick' && zoom > 0.5 && zoom < 2;
        });

        editor.on("nodeselect", (node) => {
            const pluginNodeElement: HTMLElement = (this.pluginNode as any).vueContext?.$el
            pluginNodeElement?.classList.add("selected");

            this.sidebarSelectedItem = -1

            this.deselect(this.activeElement);
            this.activeElement = null;

        })

        this.addInput();
        this.addOutput();
        this.editor = editor;

        document.addEventListener('keydown', e => {
            const activeDOMElement = document.activeElement as HTMLInputElement;
            if (activeDOMElement?.tagName == "INPUT" && ["number", "text"].includes(activeDOMElement.type)) {
                return;
            }
            if (e.code == "Backspace") {
                this.delete()
            }
        });
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
            let editor = document.getElementById("editor");
            let code = document.getElementById("code");

            const dragbarWidth = 2;

            const leftColWidth = event.clientX - 220;
            const rightColWidth = code?.clientWidth ?? 0;

            const cols = [
                220,
                leftColWidth,
                dragbarWidth,
                page!.clientWidth - 220 - 250 - leftColWidth - dragbarWidth,
                250
            ];

            let newColDefn = cols.map(c => c.toString() + "px").join(" ");

            page!.style.gridTemplateColumns = newColDefn;

            event.preventDefault()
        }
    }

    sidebarElementClick(data: { element: PluginControl | PluginSocket, index: number }) {
        this.deselect(this.activeElement)
        this.activeElement = data.element;

        const pluginNodeDOMElement: HTMLElement = (this.pluginNode as any).vueContext?.$el
        pluginNodeDOMElement?.classList.remove("selected")

        this.editor.selected.list.clear()

        this.select(data.element, data.index);
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

    deselect(element: PluginControl | PluginSocket | null) {
        if (element == null) {
            return;
        }
        if (element.key.startsWith("control")) {
            const controlDOMElement: HTMLElement = (this.pluginNode.controls.get(element.key) as any)?.vueContext.$el;
            controlDOMElement?.querySelector(".v-input__slot")?.classList.remove("selected-component")
        } else {
            const pluginDOMElement: HTMLElement = (this.pluginNode as any)?.vueContext.$el;
            const socketDOMElement = pluginDOMElement?.querySelector(".socket.selected-component");
            socketDOMElement?.classList.remove("selected-component");
        }
    }

    addInput() {
        const index = this.plugin.inputs.length;
        const key = "in_" + index;
        const pluginInput = <PluginInput>{ key: key, name: `Stream`, type: "stream" }
        this.plugin.inputs.push(pluginInput);

        const insertionPoint = countNewLinesBeforeQueryTerm(this.content, "class PluginRepository")
        this.codeEditor.insertLine(`        ${key}_data = input_data.get('${key}')`, insertionPoint + 2, 0)
    }

    addOutput() {
        const key = "out_" + this.plugin.outputs.length;
        const pluginOutput = <PluginOutput>{ key: key, name: "Stream", type: "stream" }
        this.plugin.outputs.push(pluginOutput);
    }

    menuClick(item: MenuItem) {
        const key = "control_" + this.plugin.controls.length

        switch (item.key) {
            case "text_field":
                const pluginTextField = new PluginTextField(key, "TextField", "");
                this.plugin.controls.push(pluginTextField)
                break;

            default:
                break;
        }
        const insertionPoint = countNewLinesBeforeQueryTerm(this.content, "class PluginRepository")
        this.codeEditor.insertLine(`        ${key}_data = node.data.get('${key}')`, insertionPoint + 2, 0)
        this.pluginNode.update();

    }

    delete() {
        if (this.activeElement == null) {
            return;
        }

        const key = this.activeElement.key;
        if (key.startsWith("in")) {
            this.plugin.inputs = this.plugin.inputs.filter(i => i.key != key);
            this.codeEditor.updateContent(this.content.replace(`        ${key}_data = input_data.get('${key}')\n`, ""))

        } else if (key.startsWith("out")) {
            this.plugin.outputs = this.plugin.outputs.filter(i => i.key != key);
        } else if (key.startsWith("control")) {
            this.plugin.controls = this.plugin.controls.filter(i => i.key != key);
            this.codeEditor.updateContent(this.content.replace(`        ${key}_data = node.data.get('${key}')\n`, ""))
        }

        this.activeElement = null;
    }

    @Watch("pluginWatcher", { deep: true })
    onPluginChanged(newPlugin: Plugin, oldPlugin: Plugin) {
        this.pluginNode.name = this.plugin.name

        let newInputs: PluginSocket[] = []
        for (const input of newPlugin.inputs) {
            if (!oldPlugin.inputs.map(y => y.key).includes(input.key)) {
                newInputs.push(input);
            } else {
                const pluginInput = this.pluginNode.inputs.get(input.key);
                if (!pluginInput) {
                    return;
                }
                if (pluginInput.socket.name != sockets[input.type].name) {
                    pluginInput.socket = sockets[input.type]
                }
                if (pluginInput.name != input.name) {
                    pluginInput.name = input.name;
                }
            }
        }
        const deletedInputs = oldPlugin.inputs.filter(x => !newPlugin.inputs.map(y => y.key).includes(x.key));

        let newOutputs: PluginSocket[] = []
        for (const output of newPlugin.outputs) {
            if (!oldPlugin.outputs.map(y => y.key).includes(output.key)) {
                newOutputs.push(output);
            } else {
                const pluginOutput = this.pluginNode.outputs.get(output.key);
                if (!pluginOutput) {
                    return;
                }
                if (pluginOutput.socket.name != sockets[output.type].name) {
                    pluginOutput.socket = sockets[output.type]
                }
                if (pluginOutput.name != output.name) {
                    pluginOutput.name = output.name;
                }
            }
        }
        const deletedOutputs = oldPlugin.outputs.filter(x => !newPlugin.outputs.map(y => y.key).includes(x.key));

        const newControls = this.plugin.controls.filter(x => !oldPlugin.controls.map(y => y.key).includes(x.key));
        const deletedControls = oldPlugin.controls.filter(x => !newPlugin.controls.map(y => y.key).includes(x.key));

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

        newControls.forEach((x) => {
            switch (x.type) {
                case "text":
                    this.pluginNode.addControl(new TextControl(this.editor, x.key, false, x.attributes))
                    break;

                default:
                    break;
            }
        })
        deletedControls.forEach(x => {
            this.pluginNode.removeControl(this.pluginNode.controls.get(x.key)!);
        });

        this.pluginNode.update();
    }
}
</script>

<style>
#plugin-grid {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 220px 1fr 2px 1fr 250px;

}

#plugin-rete {
    height: 100% !important;
}

.vertical-dragbar {
    cursor: ew-resize;
    background-color: #e0e0e0;
    z-index: 1
}

.v-text-field--outlined>.v-input__control>.selected-component {
    background: #e4ebff;
}

.socket.selected-component {
    background: #e4ebff !important;
}
</style>