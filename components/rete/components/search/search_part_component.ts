import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
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
   
  }
}