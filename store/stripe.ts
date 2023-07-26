import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { StripeInvoice } from '~/models/stripe';
import { $axios, $pb, stripeStore } from '~/utils/store-accessor';

@Module({
    name: 'stripe',
    stateFactory: true,
    namespaced: true,
})
export default class StripeStore extends VuexModule {

    invoices: StripeInvoice[] = []

    @Action
    async createSession(data: { price_id: string, email: string, user_id: string }): Promise<string | null> {
        try {
            const response = await $pb.send('/api/stripe/session', { body: data, method: 'post' })

            return response.data;
        } catch {
            return null;
        }
    }

    @MutationAction({ mutate: ['invoices'] })
    async listInvoices(customerId: string) {
        try {
            const response = await $pb.send('/api/stripe/invoice', { params: { customer_id: customerId }, })
            return { invoices: response.data };
        } catch {
            return { invoices: stripeStore.invoices }
        }
    }
}
