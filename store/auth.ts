import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { generateSeed } from '~/utils/string';
import { $pb, notificationStore } from '.';

@Module({
    name: 'auth',
    stateFactory: true,
    namespaced: true,
})
export default class LogStore extends VuexModule {
    redirectPath: string = "/dashboard/files/my"

    username : string = '';
    avatar : string = '';

    @Mutation
    setUsername(username: string) {
        this.username = username;
    }

    @Mutation
    setAvatar(avatar: string) {
        this.avatar = avatar;
    }

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
            }else {
                return false;
            }
        }catch(error: any) {
            return false;
        }
        return true;
    }

    @Action({ rawError: true })
    async login(data: { email: string, password: string }) : Promise<boolean> {
        try {
            const userData = await $pb?.collection('users').authWithPassword(data.email, data.password);
        } catch(error: any) {           
            if(error.status == 400 && error.data?.message == 'Failed to authenticate.') {                
                notificationStore.sendNotification({title: 'Wrong email or password', color: 'error'})
            }
            return false;
        }
        return true;
    }

    @Action({ rawError: true })
    logout() {
        $pb.authStore.clear();
    }

    get loggedIn() {
        return $pb.authStore.model?.id !== undefined;
    }

}
