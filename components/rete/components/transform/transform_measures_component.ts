import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { streamStore } from "~/store";
import { PyProxy } from "~/types/pyodide";
import TransformMeasuresControl from "../../controls/transform/measures_control/transform_measures_control";
import { sockets } from "../../sockets/sockets";

export default class TransformMeasuresComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("transform_measures");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Stream", sockets.stream);
    var out0 = new Rete.Output("out_0", "Stream", sockets.stream);


    node
      .addInput(in0)
      .addOutput(out0)
      .addControl(new TransformMeasuresControl(this.editor, "stream", true));
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const in0 = inputs["in_0"][0] as number
    if (in0) {
      const measures: number[] = (node.controls.get("stream") as TransformMeasuresControl)?.getData("stream") as number[];

      const data = await streamStore.measures({ nodeId: nodeData.id, inputNodeId: in0, start: measures[0], end: measures[1]})
      nodeData.data['data'] = data;
    }

    for (let key of node.outputs.keys()) {
      outputs[key] = nodeData.id
    }
  }
}