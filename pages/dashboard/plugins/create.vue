<template>
    <v-sheet class="page fill-height">
        <div id="plugin-grid">
            <div class="pa-6">
                <plugin-sidebar :plugin="plugin" @control-click="sidebarControlClick"></plugin-sidebar>
            </div>
            <div style="position:relative">
                <component-palette class="palette py-2" @menu-click="menuClick"></component-palette>
                <div id="plugin-rete" class="pa-0 pixel-grid">
                </div>
            </div>
            <div class="blue-grey darken-4"></div>
            <div class="pa-6">
                <plugin-properties :plugin="plugin" :active-element="activeElement"></plugin-properties>
            </div>
        </div>
    </v-sheet>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import Rete, { Input, Node, NodeEditor, Output } from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import Vuetify from "vuetify";
import PluginComponent from "~/components/editor/rete/components/plugins/plugin_component";
import ComponentPalette from "~/components/dashboard/plugins/component_palette.vue"
import { MenuItem } from "~/components/editor/palette/menu_item";
import TextControl from "~/components/editor/rete/controls/plugins/text/text_control";
import { Plugin, PluginControl, PluginInput, PluginTextField, empty_plugin } from "~/models/plugin";
import { sockets } from "~/components/editor/rete/sockets/sockets";
import PluginSidebar from "~/components/dashboard/plugins/plugin_sidebar.vue";
import PluginProperties from "~/components/dashboard/plugins/plugin_properties.vue";

@Component({
    layout: 'editor',
    components: {
        ComponentPalette,
        PluginSidebar,
        PluginProperties
    }
})
export default class CreatePluginPage extends Vue {

    pluginNode!: Node;
    editor!: NodeEditor;

    plugin: Plugin = empty_plugin;

    activeElement: PluginControl | null = null;

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

        editor.on(["connectioncreate", "connectionremove"], () => {
            engine.process(editor.toJSON())
        });

        editor.on(["process"], (params) => {
            const trigger = (params as any).trigger
            if (trigger === "primary") {
                this.$router.push('/dashboard/files/my')
            } else if (trigger === "secondary") {
                this.$router.push('/docs')

            }

        });
        this.renderPlugin();
        this.editor = editor;
    }

    renderPlugin() {
        this.plugin.inputs.forEach((pluginInput, i) => {
            const input = new Rete.Input(pluginInput.key, pluginInput.name, sockets.stream);
            this.pluginNode.addInput(input)
        })
        this.plugin.outputs.forEach((pluginOutput, i) => {
            const output = new Rete.Output(pluginOutput.key, pluginOutput.name, sockets.stream);
            this.pluginNode.addOutput(output)
        })
    }

    menuClick(item: MenuItem) {
        switch (item.key) {
            case "text_field":
                const key = "control_" + this.plugin.controls.length
                const pluginTextField = new PluginTextField(key, "TextField", "");
                this.pluginNode.addControl(new TextControl(this.editor, key, false, pluginTextField.atrributes))
                this.plugin.controls.push(pluginTextField)
                break;

            default:
                break;
        }
        this.pluginNode.update();

    }

    sidebarControlClick(control: PluginControl) {
        this.activeElement = control;
        console.log("here");

    }

    @Watch("plugin", { deep: true })
    onPluginChanged() {
        this.pluginNode.name = this.plugin.name

        this.pluginNode.update();
    }
}
</script>

<style>
#plugin-grid {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 220px 1fr 1fr 250px;

}

#plugin-rete {
    height: 100% !important;
}
</style>