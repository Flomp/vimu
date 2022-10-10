import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { apiSearchStore, apiSourceStore } from "~/store";
import SearchLyricsControl from "../../controls/search/lyrics_control/search_lyrics_control";
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
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node || !node.data.data) {
      return;
    }
    const in0 = inputs["in_0"][0] as string

    if (in0) {
      const data = await apiSearchStore.lyrics({ data: in0, lyrics: nodeData.data.data as string, color: nodeData.data.color as string });
      node.data.xml = data;

      for (let key of node.outputs.keys()) {
        outputs[key] = data;
      }
    }
  }
}