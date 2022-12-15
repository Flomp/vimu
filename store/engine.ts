import { Node } from 'rete';
import { Data } from 'rete/types/core/data';
import { Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { $axios } from '.';

@Module({
    name: 'engine',
    stateFactory: true,
    namespaced: true,
})
export default class EngineStore extends VuexModule {
    loading: boolean = false;
    data: string = "";
    error: { message: string, node: Node } | null = null

    @Mutation
    setLoading(loading: boolean) {
        this.loading = loading
    }

    @MutationAction({ mutate: ['data', 'error'] })
    async process(data: Data) {
        try {
            const result = await $axios.post('/engine', data);
            return result.data;
        } catch {
            return {
                data: ""
            }
        }
    }
}
