import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import SelectMeasuresControl from "../../controls/select/measures_control/select_measures_control";
import { sockets } from "../../sockets/sockets";

export default class SelectMeasuresComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("select_measures");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Stream", sockets.stream);
    var out0 = new Rete.Output("out_0", "Stream", sockets.stream);

    node
      .addInput(in0)
      .addOutput(out0)
      .addControl(new SelectMeasuresControl(this.editor, "data", true));
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
   
  }
}