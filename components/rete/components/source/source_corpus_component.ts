import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
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
    
  }
}