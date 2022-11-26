import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { fileStore } from "~/store";
import SourceScoreControl from "../../controls/source/source_score_control/source_score_control";
import { sockets } from "../../sockets/sockets";

export default class SourceScoreComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("source_score");
    this.editor = editor;

  }

  async builder(node: Node) {
    var out = new Rete.Output("out_0", "Score", sockets.score);


    node
      .addControl(new SourceScoreControl(this.editor, "data", fileStore.readonly))
      .addOutput(out);

  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    
  }
}