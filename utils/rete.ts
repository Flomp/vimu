import { Component, Node, NodeEditor } from "rete";
import { Data } from "rete/types/core/data";
import PluginComponent from "~/components/editor/rete/components/plugins/plugin_component";
import { pluginStore } from "./store-accessor";

export class NodePluginEditor extends NodeEditor {

    async fromJSON(json: Data) {
        if (!this.beforeImport(json)) return false;
        const nodes: { [key: string]: Node } = {};

        try {
            await Promise.all(Object.keys(json.nodes).map(async id => {
                const node = json.nodes[id];
                const component = this.getComponentOrNull(node.name);

                if (component !== null) {
                    nodes[id] = await component.build(Node.fromJSON(node));
                    this.addNode(nodes[id]);
                } else {
                    const plugin_id = node.data['plugin_id'] as string;
                    
                    if (!plugin_id) {
                        throw `No plugin id found for ${node.name}`;
                    }
                    await pluginStore.get(plugin_id);
                    if(!pluginStore.plugin) {
                        throw `Invalid plugin id for ${node.name}`;
                    }
                    const pluginComponent = this.components.get("plugin_node") as PluginComponent
                    nodes[id] = await pluginComponent.buildPlugin(Node.fromJSON(node), pluginStore.plugin);
                    this.addNode(nodes[id]);

                    nodes[id].name = pluginStore.plugin.name;
                }
            }));

            Object.keys(json.nodes).forEach(id => {
                const jsonNode = json.nodes[id];
                const node = nodes[id];

                Object.keys(jsonNode.outputs).forEach(key => {
                    const outputJson = jsonNode.outputs[key];

                    outputJson.connections.forEach(jsonConnection => {
                        const nodeId = jsonConnection.node;
                        const data = jsonConnection.data;
                        const targetOutput = node.outputs.get(key);
                        const targetInput = nodes[nodeId].inputs.get(jsonConnection.input);

                        if (!targetOutput || !targetInput) {
                            return this.trigger('error', `IO not found for node ${node.id}`);
                        }

                        this.connect(targetOutput, targetInput, data);
                    });
                });

            });
        } catch (e) {
            this.trigger('warn', e as Error);
            return !this.afterImport();
        }

        return this.afterImport();
    }

    getComponentOrNull(name: string) {
        const component = this.components.get(name);

        if (!component)
            return null;

        return component as Component;
    }
}