import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import ChoralSelectControl from "../../controls/source/choral_select_control/choral_select_control";
import { sockets } from "../../sockets/sockets";

export default class ChoralSelectComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("source_corpus");
    this.editor = editor;

  }

  async builder(node: Node) {
    var out = new Rete.Output("out_0", "Choral", sockets.stream);


    node
      .addControl(new ChoralSelectControl(this.editor, "data", true))
      .addOutput(out);

  }

  worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

  
    if (!node) {
        return;
    }

    for (let key of node.outputs.keys()) {
        outputs[key] = nodeData.data.data;
    }
  }
}