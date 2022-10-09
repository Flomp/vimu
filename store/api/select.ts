import { Action, Module, VuexModule } from 'vuex-module-decorators';
import { $axios, apiStore } from '..';

@Module({
  name: 'api/select',
  stateFactory: true,
  namespaced: true,
})
export default class APISelectStore extends VuexModule {
  @Action({ rawError: true })

  async part(data: { data: string, part: number }): Promise<string> {
    apiStore.setLoading(true)
    const result = await $axios.post('/select/part', { 'data': data.data, 'part': data.part })
    apiStore.setLoading(false)

    return result.data.data;
  }

  @Action({ rawError: true })
  async measures(data: { data: string, start: number, end: number }): Promise<string> {
    apiStore.setLoading(true)
    const result = await $axios.post('/select/measures', { 'data': data.data, 'start': data.start, end: data.end })
    apiStore.setLoading(false)

    return result.data.data;
  }

  @Action({ rawError: true })
  async notes(data: { data: string, start: number, end: number }): Promise<string> {
    apiStore.setLoading(true)
    const result = await $axios.post('/select/notes', { 'data': data.data, 'start': data.start, end: data.end })
    apiStore.setLoading(false)
    
    return result.data.data;
  }

}
