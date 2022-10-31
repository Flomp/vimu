import Rete, { NodeEditor } from 'rete';

export default class DetectVoiceCrossingsControl extends Rete.Control {
  component: any;
  props: { emitter: NodeEditor; ikey: string; readonly: boolean };
  constructor(emitter: NodeEditor, key: string, readonly: boolean) {
    super(key);

    this.component = require('./detect_voice_crossings_control_component.vue').default;
    this.props = { emitter, ikey: key, readonly };
  }

}