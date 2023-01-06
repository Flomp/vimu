import { Node } from 'rete';
import { Data } from 'rete/types/core/data';
import { Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { $axios, engineStore, settingsStore } from '.';

@Module({
    name: 'engine',
    stateFactory: true,
    namespaced: true,
})
export default class EngineStore extends VuexModule {
    loading: boolean = false;
    data: string = "";
    plots: string[] = [];
    error: { message: string, node: Node } | null = null

    @Mutation
    setLoading(loading: boolean) {
        this.loading = loading
    }

    @MutationAction({ mutate: ['data', 'plots', 'error'] })
    async process(data: Data) {
        try {
            const result = await $axios.post('/engine', data);
            
            return {
                data: result.data.data?.output ?? engineStore.data,
                plots: result.data.data?.plots ?? engineStore.plots,
                error: result.data.error
            };
        } catch (e) {
            return {
                data: "",
                plots: [],
                error: null
            }
        }
    }
}
