import { MutationAction } from 'nuxt-property-decorator';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Subscription } from '~/models/subscription';
import { $pb } from '.';

@Module({
    name: 'subscription',
    stateFactory: true,
    namespaced: true,
})
export default class SubscriptionStore extends VuexModule {
    subscription: Subscription | null = null

    @Mutation
    clear() {
        this.subscription = null;
    }

    @Mutation
    setSubscription(subscription: Subscription) {
        this.subscription = subscription
    }

    @Action
    async getSubscription() {
        try {
            const response = await $pb.collection('subscriptions').getFirstListItem<Subscription>(`user='${$pb.authStore.model?.id}'`, { '$autoCancel': false });
            return response
        } catch (e) {
            return this.subscription;
        }
    }

    get subscribed() {
        return this.subscription !== null && this.subscription.status == "active";
    }
}
