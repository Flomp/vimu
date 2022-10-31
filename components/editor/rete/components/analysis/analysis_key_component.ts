import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import AnalysisKeyControl from "../../controls/analysis/analysis_key_control/analysis_key_control";
import { sockets } from "../../sockets/sockets";

export default class AnalysisKeyComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("analysis_key");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Stream", sockets.stream);
    var out0 = new Rete.Output("out_0", "Key", sockets.key);

    node
      .addControl(new AnalysisKeyControl(this.editor, "key", true))
      .addInput(in0)
      .addOutput(out0)
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
   
  }
}