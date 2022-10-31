import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { sockets } from "../../../../editor/rete/sockets/sockets";
import IndexHeroControl from "../../controls/index/index_hero_control/index_hero_control";

export default class IndexHeroComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("The visual musicology editor");
    this.editor = editor;

  }

  async builder(node: Node) {
    var out0 = new Rete.Output("out_0", "", sockets.hero, false);

    node
      .addControl(new IndexHeroControl(this.editor, "key", true))
      .addOutput(out0)
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
  }
}