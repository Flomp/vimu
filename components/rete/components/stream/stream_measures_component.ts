import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { streamStore } from "~/store";
import { PyProxy } from "~/types/pyodide";
import StreamMeasuresControl from "../../controls/stream/measures_control/stream_measures_control";
import { sockets } from "../../sockets/sockets";

export default class StreamMeasuresComponent extends Rete.Component {
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
      .addControl(new StreamMeasuresControl(this.editor, "stream", true));
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const in0 = inputs["in_0"][0] as PyProxy
    if (in0) {
      const measures: number[] = (node.controls.get("stream") as StreamMeasuresControl)?.getData("stream") as number[];

      const data = await streamStore.measures({stream: in0, start: measures[0], end: measures[1]})
      nodeData.data['data'] = data;
    }

    for (let key of node.outputs.keys()) {
      outputs[key] = nodeData.data.data;
    }
  }
}