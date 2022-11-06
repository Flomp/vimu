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

    @Mutation
    setLoading(loading: boolean) {
        this.loading = loading
    }

    @MutationAction({ mutate: ['data'] })
    async process(data: Data) {
        const result = await $axios.post('/', data)

        if (result.data.data) {
            return result.data;
        }else {
            return {
                data: ""
            }
        }

    }
}
