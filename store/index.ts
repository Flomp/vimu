import { Context } from '@nuxt/types';
import { Store } from 'vuex'
import { initialiseStores } from '~/utils/store-accessor'

const initializer = (store: Store<any>) => initialiseStores(store)

export const actions = {
    nuxtServerInit(store: Store<any>, context:Context) {
        if((context as any).$pb.authStore.model) {
            store.commit('auth/setUsername', (context as any).$pb.authStore.model?.username)
            store.commit('auth/setAvatar', (context as any).$pb.authStore.model?.avatar)
        }
    }
};

export const plugins = [initializer]
export * from '~/utils/store-accessor'
