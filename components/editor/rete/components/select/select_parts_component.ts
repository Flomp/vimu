import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import SelectPartsControl from "../../controls/select/parts_control/select_parts_control";
import { sockets } from "../../sockets/sockets";

export default class SelectPartsComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("select_parts");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Score", sockets.score);
    var out0 = new Rete.Output("out_0", "Part", sockets.part);


    node
      .addInput(in0)
      .addOutput(out0)
      .addControl(new SelectPartsControl(this.editor, "data", true));
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
   
  }
}