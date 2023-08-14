import Rete, { Input, Node, NodeEditor, Output } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { Plugin, PluginControl } from "~/models/plugin";
import BoolControl from "../../controls/plugins/bool/bool_control";
import NumberInputControl from "../../controls/plugins/number_input/number_input_control";
import TextInputControl from "../../controls/plugins/text_input/text_input_control";
import { sockets } from "../../sockets/sockets";
import SelectControl from "../../controls/plugins/select/select_control";

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
      this.buildControl(node, x)
    })

    node.data['plugin_id'] = plugin.id;
    node.data['code'] = plugin.code;
    node.name = "plugin_node";
    return node;
  }

  buildControl(node: Node, control: PluginControl) {

    switch (control.type) {
      case "text":
        node.addControl(new TextInputControl(this.editor, control.key, false, control.attributes))
        break;
      case "number":
        node.addControl(new NumberInputControl(this.editor, control.key, false, control.attributes))
        break;
      case "bool":
        node.addControl(new BoolControl(this.editor, control.key, false, control.attributes))
        break;
      case "select":
        node.addControl(new SelectControl(this.editor, control.key, false, control.attributes))
        break;
      default:
        break;
    }
  }

  async builder(node: Node) {
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {

  }
}