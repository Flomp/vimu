import Rete, { NodeEditor } from "rete";
export default class SelectPartsControl extends Rete.Control {
  component: any;
  props: { emitter: NodeEditor; ikey: string; readonly: boolean };
  constructor(emitter: NodeEditor, key: string, readonly: boolean) {
    super(key);
    this.component = require("./select_parts_control_component.vue").default;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val: string) {
    (this as any).vueContext.value = val;
  }
}