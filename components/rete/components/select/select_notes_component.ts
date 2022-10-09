import Rete, { Node, NodeEditor } from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { apiSelectStore,  } from "~/store";
import SelectNotesControl from "../../controls/select/notes_control/select_notes_control";
import { sockets } from "../../sockets/sockets";

export default class SelectNotesComponent extends Rete.Component {
  editor!: NodeEditor;
  constructor(editor: NodeEditor) {
    super("select_notes");
    this.editor = editor;

  }

  async builder(node: Node) {
    var in0 = new Rete.Input("in_0", "Part", sockets.part);
    var out0 = new Rete.Output("out_0", "Stream", sockets.stream);


    node
      .addInput(in0)
      .addOutput(out0)
      .addControl(new SelectNotesControl(this.editor, "stream", true));
  }

  async worker(nodeData: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const node = this.editor.nodes.find(n => n.id == nodeData.id);

    if (!node) {
      return;
    }

    const in0 = inputs["in_0"][0] as string
    if (in0) {
      const notes: number[] = (node.controls.get("stream") as SelectNotesControl)?.getData("stream") as number[];

      const data = await apiSelectStore.notes({ data: in0, start: notes[0], end: notes[1] })
      node.data.xml = data;


      for (let key of node.outputs.keys()) {
        outputs[key] = data
      }
    }
  }
}