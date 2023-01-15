import { MutationAction } from 'nuxt-property-decorator';
import { Module, VuexModule } from 'vuex-module-decorators';
import { Subscription } from '~/models/subscription';
import { $pb } from '.';

@Module({
    name: 'subscription',
    stateFactory: true,
    namespaced: true,
})
export default class SubscriptionStore extends VuexModule {
    subscription: Subscription | null = null

    @MutationAction({ mutate: ['subscription'] })
    async sub() {              
        try {
            const response = await $pb.collection('subscriptions').getFirstListItem(`user='${$pb.authStore.model?.id}'`);            
            return { subscription: response }
        } catch (e){            
            return { subscription: this.subscription }
        }
    }

    get subscribed() {
        return this.subscription !== null;
    }
}
