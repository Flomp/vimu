import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({
    name: 'api/api',
    stateFactory: true,
    namespaced: true,
})
export default class APIStore extends VuexModule {
    loading: boolean = false;

    @Mutation
    setLoading(loading: boolean) {
        this.loading = loading
    }
}
