import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import DetectParallelsControl from "../../controls/detect/detect_parallels_control/detect_parallels_control";
import { sockets } from "../../sockets/sockets";

export default class DetectParallelsComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("detect_parallels");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Score", sockets.stream);
    var out0 = new Rete.Output("out_0", "Score", sockets.stream);

    node
      .addControl(new DetectParallelsControl(this.editor, "data", true))
      .addInput(in0)
      .addOutput(out0);

  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
   
  }
}