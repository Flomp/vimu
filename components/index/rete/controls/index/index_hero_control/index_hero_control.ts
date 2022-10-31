import Rete, { NodeEditor } from 'rete';

export default class IndexHeroControl extends Rete.Control {
  component: any;
  props: { emitter: NodeEditor; ikey: string; readonly: boolean };
  constructor(emitter: NodeEditor, key: string, readonly: boolean) {
    super(key);

    this.component = require('./index_hero_control_component.vue').default;;
    this.props = { emitter, ikey: key, readonly };
  }

}