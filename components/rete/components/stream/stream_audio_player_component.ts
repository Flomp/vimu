import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import StreamAudioPlayerControl from "../../controls/stream/audio_player_control/stream_audio_player_control";
import { sockets } from "../../sockets/sockets";

export default class StreamAudioPlayerComponent extends Rete.Component {
  editor!: NodeEditor;
  node!: Node;
  constructor(editor: NodeEditor) {
    super("Play Stream");
    this.editor = editor;

  }

  async builder(node: Node) {
    var inp1 = new Rete.Input("in_0", "Stream", sockets.stream);


    node
      .addInput(inp1)
      .addControl(new StreamAudioPlayerControl(this.editor, "stream", true))

  }

  worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const stream: string = inputs["in_0"][0] as string

    nodeData.data['data'] = stream;

    (node.controls.get("stream") as StreamAudioPlayerControl)?.setValue(stream);

    for (let key of node.outputs.keys()) {
      outputs[key] = nodeData.data.data;
    }
  }
}