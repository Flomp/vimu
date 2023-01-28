import { Store } from 'vuex'
import { initialiseStores } from '~/utils/store-accessor'
import { Context } from "@nuxt/types";

export const actions = {
    async nuxtServerInit(store: Store<any>, context: Context) {
        const settings = await store.dispatch('settings/getEditorSettings')
        
        if (settings) {
            store.commit('settings/changeSettings', JSON.parse(JSON.stringify(settings)));
        }
        
        const subscription = await store.dispatch('subscription/getSubscription');
        store.commit('subscription/setSubscription', JSON.parse(JSON.stringify(subscription)));
    }
};

const initializer = (store: Store<any>) => initialiseStores(store)

export const plugins = [initializer]
export * from '~/utils/store-accessor'
