import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { sourceStore } from "~/store";
import ChoralSelectControl from "../../controls/source/choral_select_control/source_corpus_control";
import { sockets } from "../../sockets/sockets";

export default class SourceCorpusComponent extends Rete.Component {
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

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);
    
    if (!node || !node.data.data) {
      return;
    }
      
    await sourceStore.load({id: nodeData.id, path: nodeData.data.data as string});

    for (let key of node.outputs.keys()) {
      outputs[key] = nodeData.id;
    }
  }
}