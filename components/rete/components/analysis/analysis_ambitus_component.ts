import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { apiAnalysisStore,  } from "~/store";
import AnalysisAmbitusControl from "../../controls/analysis/analysis_ambitus_control/analysis_ambitus_control";
import { sockets } from "../../sockets/sockets";

export default class AnalysisAmbitusComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("analysis_ambitus");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Stream", sockets.stream);
    var out0 = new Rete.Output("out_0", "Part", sockets.part);

    node
      .addControl(new AnalysisAmbitusControl(this.editor, "key", true))
      .addInput(in0)
      .addOutput(out0)
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const in0 = inputs["in_0"][0] as string
    if (in0) {
      const data = await apiAnalysisStore.ambitus({data: in0 })
      nodeData.data.xml = data.data;
      nodeData.data.raw = data.raw!

      for (let key of node.outputs.keys()) {
        outputs[key] = data.raw;
      }
    }


  }
}