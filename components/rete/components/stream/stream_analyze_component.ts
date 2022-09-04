import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { streamStore } from "~/store";
import { PyProxy } from "~/types/pyodide";
import AnalysisKeyControl from "../../controls/analysis/analysis_key_control/analysis_key_control";
import { sockets } from "../../sockets/sockets";

export default class StreamAnalyzeComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("analysis_key");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Stream", sockets.stream);


    node
      .addControl(new AnalysisKeyControl(this.editor, "key", true))

      .addInput(in0)

  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const in0 = inputs["in_0"][0] as PyProxy
    if (in0) {
      const data = await streamStore.analyze({stream: in0})
      nodeData.data['data'] = data;
      (node.controls.get("key") as AnalysisKeyControl)?.setValue(data.toJs().name);

    }


  }
}