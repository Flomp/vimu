import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import HistogramControl from "../../controls/plot/histogram_control/historgram_control";
import { sockets } from "../../sockets/sockets";

export default class PlotHistogramComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("plot_histogram");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Stream", sockets.stream);


    node
      .addControl(new HistogramControl(this.editor, "data", true))
      .addInput(in0);

  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    
  }
}