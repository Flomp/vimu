import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import DetectModulationControl from "../../controls/detect/detect_modulation_control/detect_modulation_control";
import { sockets } from "../../sockets/sockets";

export default class DetectModulationComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("detect_modulation");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Stream", sockets.stream);
    var out0 = new Rete.Output("out_0", "Stream", sockets.stream);

    node
      .addControl(new DetectModulationControl(this.editor, "key", true))
      .addInput(in0)
      .addOutput(out0)
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
   
  }
}