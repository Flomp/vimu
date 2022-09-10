import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { streamStore } from "~/store";
import AnalysisRomanNumeralControl from "../../controls/analysis/analysis_roman_numeral_control/analysis_roman_numeral_control";
import { sockets } from "../../sockets/sockets";

export default class AnalysisRomanNumeralComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("analysis_roman_numeral");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Key", sockets.key);
    var in1 = new Rete.Input("in_1", "Stream", sockets.stream);

    node
      .addControl(new AnalysisRomanNumeralControl(this.editor, "data", true))
      .addInput(in0)
      .addInput(in1)

  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const in0 = inputs["in_0"][0] as number
    const in1 = inputs["in_1"][0] as number

    if (in0 && in1) {          
      const data = await streamStore.romanNumeral({ nodeId: nodeData.id, input0NodeId: in0, input1NodeId: in1 })
      nodeData.data['data'] = data;
    }
  }
}