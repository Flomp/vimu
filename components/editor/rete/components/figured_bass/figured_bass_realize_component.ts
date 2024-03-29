import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import FiguredBassRealizeControl from "../../controls/figured_bass/figured_bass_realize_control";
import { sockets } from "../../sockets/sockets";

export default class FiguredBassRealizeComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("figured_bass_realize");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Stream", sockets.stream);
    var out0 = new Rete.Output("out_0", "Stream", sockets.stream);

    node
      .addControl(new FiguredBassRealizeControl(this.editor, "data", true))
      .addInput(in0)
      .addOutput(out0)

  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {

  }
}