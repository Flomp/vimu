import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { streamStore } from "~/store";
import { PyProxy } from "~/types/pyodide";
import StreamTransposeControl from "../../controls/stream/transpose_control/stream_transpose_control";
import { sockets } from "../../sockets/sockets";

export default class StreamTransposeComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("transform_transpose");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Stream", sockets.stream);
    var out0 = new Rete.Output("out_0", "Stream", sockets.stream);


    node
      .addInput(in0)
      .addOutput(out0)
      .addControl(new StreamTransposeControl(this.editor, "steps", true));
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const in0 = inputs["in_0"][0] as PyProxy
    if (in0) {
      const steps: number = (node.controls.get("steps") as StreamTransposeControl)?.getData("steps") as number;

      const data = await streamStore.transpose({ stream: in0, steps: steps })
      nodeData.data['data'] = data;
    }

    for (let key of node.outputs.keys()) {
      outputs[key] = nodeData.data.data;
    }
  }
}