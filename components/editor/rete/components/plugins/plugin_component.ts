import Rete, { Input, Node, NodeEditor, Output } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { Plugin } from "~/models/plugin";
import { sockets } from "../../sockets/sockets";
import TextControl from "../../controls/plugins/text/text_control";
import BoolControl from "../../controls/plugins/bool/bool_control";

export default class PluginComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("plugin_node");
    this.editor = editor;
  }

  async buildPlugin(node: Node, plugin: Plugin) {
    plugin.config.inputs.forEach(x => {
      const input = new Input(x.key, x.name, sockets[x.type]);
      node.addInput(input);
    })

    plugin.config.outputs.forEach(x => {
      const output = new Output(x.key, x.name, sockets[x.type]);
      node.addOutput(output);
    })

    plugin.config.controls.forEach((x) => {
      switch (x.type) {
        case "text":
          node.addControl(new TextControl(this.editor, x.key, false, x.attributes))
          break;
        case "bool":
          node.addControl(new BoolControl(this.editor, x.key, false, x.attributes))
          break;
        default:
          break;
      }
    })

    node.data['plugin_id'] = plugin.id;
    node.data['code'] = plugin.code;
    node.name = "plugin_node";
    return node;
  }

  async builder(node: Node) {
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {

  }
}