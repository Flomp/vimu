import { Action, Module, VuexModule } from 'vuex-module-decorators';
import { $axios, apiStore } from '..';

@Module({
  name: 'api/search',
  stateFactory: true,
  namespaced: true,
})
export default class APISearchStore extends VuexModule {

  @Action({ rawError: true })
  async part(data: { data: string, part: string }): Promise<M21> {
    apiStore.setLoading(true)
    const result = await $axios.post('/search/part', { 'data': data.data, 'part': data.part })
    apiStore.setLoading(false)

    return result.data.data;
  }


}
