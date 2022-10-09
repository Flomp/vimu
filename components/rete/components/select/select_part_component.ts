import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { apiSelectStore } from "~/store";
import SelectPartControl from "../../controls/select/part_control/select_part_control";
import { sockets } from "../../sockets/sockets";

export default class SelectPartComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("select_part");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Score", sockets.score);
    var out0 = new Rete.Output("out_0", "Part", sockets.part);


    node
      .addInput(in0)
      .addOutput(out0)
      .addControl(new SelectPartControl(this.editor, "part", true));
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const in0 = inputs["in_0"][0] as string
    if (in0) {
      const part: number = (node.controls.get("part") as SelectPartControl)?.getData("part") as number;

      const data = await apiSelectStore.part({ data: in0, part: part })
      node.data.xml = data;


      for (let key of node.outputs.keys()) {
        outputs[key] = data;
      }
    }
  }
}