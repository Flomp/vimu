import { Action, Module, VuexModule } from 'vuex-module-decorators';
import { $axios, apiStore } from '..';

@Module({
  name: 'api/analysis',
  stateFactory: true,
  namespaced: true,
})
export default class APISourceStore extends VuexModule {
  @Action({ rawError: true })
  async key(data: { data: string }): Promise<M21> {
    apiStore.setLoading(true);
    const result = await $axios.post('/analysis/key', { 'data': data.data })
    apiStore.setLoading(false)

    return result.data;
  }

  @Action({ rawError: true })
  async ambitus(data: { data: string }): Promise<M21> {
    apiStore.setLoading(true);
    const result = await $axios.post('/analysis/ambitus', { 'data': data.data })
    apiStore.setLoading(false)

    return result.data;
  }

  @Action({ rawError: true })
  async romanNumeral(data: { data: string, key: string }): Promise<string> {
    apiStore.setLoading(true);
    const result = await $axios.post('/analysis/roman-numeral', { 'data': data.data, 'key': data.key })
    apiStore.setLoading(false)

    return result.data.data;
  }
}
