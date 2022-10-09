import { Action, Module, VuexModule } from 'vuex-module-decorators';
import { $axios, apiStore } from '..';

@Module({
  name: 'api/source',
  stateFactory: true,
  namespaced: true,
})
export default class APISourceStore extends VuexModule {
  @Action({ rawError: true })
  async load(data: { path: string }): Promise<string> {

    apiStore.setLoading(true)
    const result = await $axios.post('/source/corpus', { 'work_name': data.path })
    apiStore.setLoading(false)

    return result.data.data;
  }

  @Action({ rawError: true })
  async tinynotation(data: { tinynotation: string }): Promise<string> {
    apiStore.setLoading(true)
    const result = await $axios.post('/source/tinynotation', { 'data': data.tinynotation })
    apiStore.setLoading(false)

    return result.data.data;
  }
}
