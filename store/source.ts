import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { PyProxy } from '~/types/pyodide';
import { $axios, $pyodide } from '.'

@Module({
  name: 'source',
  stateFactory: true,
  namespaced: true,
})
export default class SourceStore extends VuexModule {
  @Action({ rawError: true })
  async load(path: string): Promise<PyProxy> {
    const result = await $pyodide.runPythonAsync(`
    from music21 import corpus
    corpus.parse('${path}')
  `)
  
    return result;
  }
}
