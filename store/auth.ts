import { AuthProviderInfo } from 'pocketbase';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { generateSeed } from '~/utils/string';
import { $pb, notificationStore, subscriptionStore } from '.';

@Module({
    name: 'auth',
    stateFactory: true,
    namespaced: true,
})
export default class AuthStore extends VuexModule {
    redirectPath: string = "/dashboard/files/my"

    @Mutation
    setRedirectPath(redirectPath: string) {
        this.redirectPath = redirectPath;
    }

    @Action({ rawError: true })
    async signup(data: { email: string, password: string, passwordConfirm: string, avatar?: string }) {
        try {
            const avatarSeed = generateSeed()
            data.avatar = avatarSeed;
            const user = await $pb.collection('users').create(data)
            if (user) {
                await $pb.collection('users').requestVerification(data.email);
                const userData = await $pb?.collection('users').authWithPassword(data.email, data.password);
            } else {
                return false;
            }
        } catch (error: any) {
            return false;
        }
        return true;
    }

    @Action({ rawError: true })
    async resendVerificationEmail() {
        if (!$pb.authStore.model) {
            return;
        }
        try {

            const response = await $pb.collection('users').requestVerification($pb.authStore.model.email);
        } catch (error: any) {
            return false;
        }
        return true;
    }

    @Action({ rawError: true })
    async checkVerification() {
        if (!$pb.authStore.model) {
            return;
        }
        try {
            const response = await $pb.collection('users').getOne($pb.authStore.model.id);
            $pb.authStore.save($pb.authStore.token, response);
            return response.verified;
        } catch (error: any) {
            return false;
        }
    }

    @Action({ rawError: true })
    async login(data: { email: string, password: string }): Promise<boolean> {
        try {
            const userData = await $pb?.collection('users').authWithPassword(data.email, data.password);
            await subscriptionStore.sub();
        } catch (error: any) {
            if (error.status == 400 && error.data?.message == 'Failed to authenticate.') {
                notificationStore.sendNotification({ title: 'Wrong email or password', color: 'error' })
            } else {
                notificationStore.sendNotification({ title: 'Error during login', color: 'error' })
            }
            return false;
        }
        return true;
    }

    @Action({ rawError: true })
    async oauth(data: { provider: AuthProviderInfo, code: string, redirectUrl: string }) {
        try {
            await $pb.collection('users').authWithOAuth2(
                data.provider.name,
                data.code,
                data.provider.codeVerifier,
                data.redirectUrl,
                {
                    avatar: generateSeed(),
                    emailVisibility: false,
                }
            )
        } catch (error: any) {
            notificationStore.sendNotification({ title: 'Something went wrong during authentication', color: 'error' })
            return false;
        }
        return true;
    }

    @Action({ rawError: true })
    logout() {
        $pb.authStore.clear();
        subscriptionStore.clear()
    }

    get loggedIn() {
        return $pb.authStore.model?.id !== undefined;
    }

}
