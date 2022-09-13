import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { sourceStore } from "~/store";
import SourceTinynotationControl from "../../controls/source/tinynotation_control/source_tinynotation_control";
import { sockets } from "../../sockets/sockets";

export default class SourceTinynotationComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("source_tinynotation");
    this.editor = editor;

  }

  async builder(node: Node) {
    var out = new Rete.Output("out_0", "Part", sockets.part);


    node
      .addControl(new SourceTinynotationControl(this.editor, "data", true))
      .addOutput(out);

  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);
    
    if (!node || !node.data.data) {
      return;
    }
      
    await sourceStore.tinynotation({id: nodeData.id, tinynotation: nodeData.data.data as string});
    node.data.hasData = true;

    for (let key of node.outputs.keys()) {
      outputs[key] = nodeData.id;
    }
  }
}