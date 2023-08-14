import Rete, { NodeEditor } from "rete";
import { PluginControlAttribute } from "~/models/plugin";
export default class NumberInputControl extends Rete.Control {
  component: any;
  props: { emitter: NodeEditor; ikey: string; readonly: boolean, attributes: Record<string, PluginControlAttribute> };
  constructor(emitter: NodeEditor, key: string, readonly: boolean, attributes: Record<string, PluginControlAttribute>) {
    super(key);
    this.component = require("./number_input_control_component.vue").default;
    this.props = { emitter, ikey: key, readonly, attributes };
  }

  setValue(val: string) {
    (this as any).vueContext.value = val;
  }
}