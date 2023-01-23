import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { default_email_settings, default_settings, EmailSettings, Settings } from '~/models/settings';
import { $pb, notificationStore } from '.';

@Module({
    name: 'settings',
    stateFactory: true,
    namespaced: true,
})
export default class SettingsStore extends VuexModule {
    settings: Settings = default_settings;

    emailSettings: EmailSettings = default_email_settings;

    @Mutation
    changeSettings(settings: Settings) {
        this.settings = settings;
    }

    @MutationAction({ mutate: ['emailSettings'] })
    async getEmailSettings() {
        try {
            const emailSettings: EmailSettings = await $pb.collection('email_settings').getFirstListItem(`user='${$pb.authStore.model?.id}'`)

            return { emailSettings: emailSettings };
        } catch (error) {            
            return { emailSettings: this.emailSettings }
        }
    }

    @Action
    async updateEmailSettings(emailSettings: EmailSettings) {
        try {
            let updatedEmailSettings: EmailSettings;
            if(emailSettings.id == "default") {
                emailSettings.user = $pb.authStore.model?.id;
                emailSettings.id = ""
                updatedEmailSettings = await $pb.collection('email_settings').create(emailSettings);
            }else {
                updatedEmailSettings = await $pb.collection('email_settings').update(emailSettings.id, emailSettings)
            }

            return updatedEmailSettings;
        } catch (error) {
            return null
        }
    }
}
