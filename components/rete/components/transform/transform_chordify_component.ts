import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { apiTransformStore,  } from "~/store";
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
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const in0 = inputs["in_0"][0] as string
    if (in0) {
      const data = await apiTransformStore.chordify({ data: in0 })
      nodeData.data.xml = data;


      for (let key of node.outputs.keys()) {
        outputs[key] = data
      }
    }
  }
}