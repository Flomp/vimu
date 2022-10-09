import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { apiTransformStore } from "~/store";
import TransformTransposeControl from "../../controls/transform/transpose_control/transform_transpose_control";
import { sockets } from "../../sockets/sockets";

export default class TransformTransposeComponent extends Rete.Component {
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
      .addControl(new TransformTransposeControl(this.editor, "steps", true));
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const in0 = inputs["in_0"][0] as string
    if (in0) {
      const steps: number = (node.controls.get("steps") as TransformTransposeControl)?.getData("steps") as number;

      const data = await apiTransformStore.transpose({ data: in0, steps: steps })
      nodeData.data.xml = data



      for (let key of node.outputs.keys()) {
        outputs[key] = data
      }
    }
  }
}