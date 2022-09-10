import { Action, Module, VuexModule } from 'vuex-module-decorators';
import { pyodideStore } from '.';

@Module({
  name: 'source',
  stateFactory: true,
  namespaced: true,
})
export default class SourceStore extends VuexModule {
  @Action({ rawError: true })
  async load(data: { id: number, path: string }): Promise<string> {
    const result = await pyodideStore.asyncRun({
      id: data.id, python: `
    from music21 import corpus
    corpus.parse('${data.path}')
  `, writeNodeData: true
    })

    return result;
  }
}
