import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { apiSourceStore } from "~/store";
import SourceCorpusControl from "../../controls/source/corpus_control/source_corpus_control";
import { sockets } from "../../sockets/sockets";

export default class SourceCorpusComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("source_corpus");
    this.editor = editor;

  }

  async builder(node: Node) {
    var out = new Rete.Output("out_0", "Score", sockets.score);


    node
      .addControl(new SourceCorpusControl(this.editor, "data", true))
      .addOutput(out);

  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node || !node.data.data) {
      return;
    }

    const xml = await apiSourceStore.load({ path: nodeData.data.data as string });

    node.data.xml = xml;

    for (let key of node.outputs.keys()) {
      outputs[key] = xml;
    }
  }
}