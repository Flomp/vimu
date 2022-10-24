import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import TransformChordifyControl from "../../controls/transform/chordify_control/transform_chordify_control";
import { sockets } from "../../sockets/sockets";

export default class TransformChordifyComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("transform_chordify");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Score", sockets.score);
    var out0 = new Rete.Output("out_0", "Part", sockets.part);


    node
      .addInput(in0)
      .addOutput(out0)
      .addControl(new TransformChordifyControl(this.editor, "chordify", true));
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    
  }
}