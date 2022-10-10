import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { apiSearchStore,  } from "~/store";
import SearchPartControl from "../../controls/search/search_part_control/search_part_control";
import { sockets } from "../../sockets/sockets";

export default class SearchPartComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("search_part");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Part", sockets.part);
    var in1 = new Rete.Input("in_1", "Stream", sockets.stream);
    var out0 = new Rete.Output("out_0", "Stream", sockets.stream);

    node
      .addControl(new SearchPartControl(this.editor, "data", true))
      .addInput(in0)
      .addInput(in1)
      .addOutput(out0)
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const in0 = inputs["in_0"][0] as string
    const in1 = inputs["in_1"][0] as string
    
    if (in0 && in1) {
      const data = await apiSearchStore.part({ data: in1, part: in0, color: nodeData.data.color as string})
      node.data.xml = data;

      for (let key of node.outputs.keys()) {
        outputs[key] = data
      }
    }
  }
}