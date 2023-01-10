import Rete, { NodeEditor } from 'rete';

export default class HistogramControl extends Rete.Control {
  component: any;
  props: { emitter: NodeEditor; ikey: string; readonly: boolean };
  constructor(emitter: NodeEditor, key: string, readonly: boolean) {
    super(key);

    this.component = require('./histogram_control_component.vue').default;
    this.props = { emitter, ikey: key, readonly };
  }

}