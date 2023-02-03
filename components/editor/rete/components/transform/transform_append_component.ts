import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import TransformAppendControl from "../../controls/transform/append_control/transform_append_control";
import TransformTransposeControl from "../../controls/transform/transpose_control/transform_transpose_control";
import { sockets } from "../../sockets/sockets";

export default class TransformAppendComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("transform_append");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Stream", sockets.stream);
    var in1 = new Rete.Input("in_1", "Stream", sockets.stream);
    var out0 = new Rete.Output("out_0", "Stream", sockets.stream);


    node
      .addControl(new TransformAppendControl(this.editor, "data", true))
      .addInput(in0)
      .addInput(in1)
      .addOutput(out0)
      
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
   
  }
}