import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { apiSelectStore, } from "~/store";
import SelectMeasuresControl from "../../controls/select/measures_control/select_measures_control";
import { sockets } from "../../sockets/sockets";

export default class SelectMeasuresComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("select_measures");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Stream", sockets.stream);
    var out0 = new Rete.Output("out_0", "Stream", sockets.stream);

    node
      .addInput(in0)
      .addOutput(out0)
      .addControl(new SelectMeasuresControl(this.editor, "stream", true));
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const in0 = inputs["in_0"][0] as string
    if (in0) {
      const measures: number[] = (node.controls.get("stream") as SelectMeasuresControl)?.getData("stream") as number[];

      const data = await apiSelectStore.measures({ data: in0, start: measures[0], end: measures[1] })
      node.data.xml = data;

      for (let key of node.outputs.keys()) {
        outputs[key] = data
      }
    }
  }
}