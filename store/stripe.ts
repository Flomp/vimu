import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { $axios } from '~/utils/store-accessor';

@Module({
    name: 'stripe',
    stateFactory: true,
    namespaced: true,
})
export default class StripeStore extends VuexModule {
    
    @Action
    async createSession(data: {price_id: string, email: string, user_id: string}) : Promise<string | null>{
        const response = await $axios.post('/stripe/session', data)
        return response.data?.data;
    }
}
