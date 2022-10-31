import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
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
    var out0 = new Rete.Output("out_0", "Stream", sockets.stream);

    node
      .addControl(new AnalysisRomanNumeralControl(this.editor, "data", true))
      .addInput(in0)
      .addInput(in1)
      .addOutput(out0)
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    
  }
}