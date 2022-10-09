import { Action, Module, VuexModule } from 'vuex-module-decorators';
import { $axios, apiStore } from '..';

@Module({
  name: 'api/transform',
  stateFactory: true,
  namespaced: true,
})
export default class APITransformStore extends VuexModule {
  @Action({ rawError: true })

  async chordify(data: { data: string }): Promise<string> {
    apiStore.setLoading(true)
    const result = await $axios.post('/transform/chordify', { 'data': data.data })
    apiStore.setLoading(false)

    return result.data.data;
  }

  @Action({ rawError: true })
  async transpose(data: { data: string, steps: number }): Promise<string> {
    apiStore.setLoading(true)
    const result = await $axios.post('/transform/transpose', { 'data': data.data, 'steps': data.steps })
    apiStore.setLoading(false)

    return result.data.data;
  }

  @Action({ rawError: true })
  async flatten(data: { data: string }): Promise<string> {
    apiStore.setLoading(true)
    const result = await $axios.post('/transform/flatten', { 'data': data.data})
    apiStore.setLoading(false)
    
    return result.data.data;
  }

}
