import Rete, { NodeEditor } from 'rete';

export default class SourceScoreControl extends Rete.Control {
  component: any;
  props: { emitter: NodeEditor; ikey: string; readonly: boolean };
  constructor(emitter: NodeEditor, key: string, readonly: boolean) {
    super(key);

    this.component = require('./source_score_control_component.vue').default;;
    this.props = { emitter, ikey: key, readonly };
  }

}