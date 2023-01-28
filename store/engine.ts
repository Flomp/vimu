import { Node } from 'rete';
import { Data } from 'rete/types/core/data';
import { Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { $axios, engineStore } from '.';
import { Canceler } from 'axios'
@Module({
    name: 'engine',
    stateFactory: true,
    namespaced: true,
})
export default class EngineStore extends VuexModule {
    data: string = "";
    plots: string[] = [];
    error: { message: string, node: Node } | null = null

    unresolvedCalls: number = 0;
    requestCanceler: Canceler | null = null;

    @Mutation
    reset() {
        this.data = ""
        this.plots = []
        this.error = null
    }

    @Mutation
    setRequestCanceler(c: Canceler | null) {
        this.requestCanceler = c;
    }

    @Mutation
    updateUnresolvedCalls(unresolvedCalls: number) {
        this.unresolvedCalls = unresolvedCalls
    }

    @MutationAction({ mutate: ['data', 'plots', 'error'] })
    async process(data: Data) {
        try {
            if (this.requestCanceler) {
                this.requestCanceler();
            }

            engineStore.updateUnresolvedCalls(engineStore.unresolvedCalls + 1)

            const result = await $axios.post('/engine', data, {
                cancelToken: new $axios.CancelToken(c => {
                    engineStore.setRequestCanceler(c)
                }),
            });

            return {
                data: result.data.data?.output ?? "",
                plots: result.data.data?.plots ?? [],
                error: result.data.error
            };
        } catch (e) {
            return {
                data: this.data,
                plots: this.plots,
                error: null
            }
        } finally {
            engineStore.updateUnresolvedCalls(engineStore.unresolvedCalls - 1)
        }
    }

    get loading() {
        return this.unresolvedCalls > 0
    }

}
