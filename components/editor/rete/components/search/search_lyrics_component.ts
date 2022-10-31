import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import SearchLyricsControl from "../../controls/search/search_lyrics_control/search_lyrics_control";
import { sockets } from "../../sockets/sockets";

export default class SearchLyricsComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("search_lyrics");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Score", sockets.stream);
    var out0 = new Rete.Output("out_0", "Score", sockets.stream);

    node
      .addControl(new SearchLyricsControl(this.editor, "data", true))
      .addInput(in0)
      .addOutput(out0);

  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
   
  }
}