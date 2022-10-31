import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { sockets } from "../../../../editor/rete/sockets/sockets";
import IndexEastereggControl from "../../controls/index/index_easteregg_control/index_easteregg_control";

export default class IndexEastereggComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "", sockets.hero);

    node
      .addControl(new IndexEastereggControl(this.editor, "key", true))
      .addInput(in0)
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {

    const node = this.editor?.nodes.find(n => n.id == nodeData.id)
    const carrot = node?.getConnections().length !== 0;

    (node?.controls.get('key') as IndexEastereggControl)?.setValue(carrot);
  }
}