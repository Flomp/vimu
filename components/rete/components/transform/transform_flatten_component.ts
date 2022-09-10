import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { streamStore } from "~/store";
import TransformFlattenControl from "../../controls/transform/flatten_control/transform_flatten_control";
import { sockets } from "../../sockets/sockets";

export default class TransformFlattenComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("transform_flatten");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Stream", sockets.stream);
    var out0 = new Rete.Output("out_0", "Stream", sockets.stream);


    node
      .addInput(in0)
      .addOutput(out0)
      .addControl(new TransformFlattenControl(this.editor, "chordify", true));
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const in0 = inputs["in_0"][0] as number
    if (in0) {
      const data = await streamStore.flatten({ nodeId: nodeData.id, inputNodeId: in0 })
      nodeData.data['data'] = data;
    }

    for (let key of node.outputs.keys()) {
      outputs[key] = nodeData.id;
    }
  }
}