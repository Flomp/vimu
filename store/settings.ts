import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { default_email_settings, default_settings, EmailSettings, EditorSettings } from '~/models/settings';
import { $pb, engineStore, notificationStore, settingsStore } from '.';

@Module({
    name: 'settings',
    stateFactory: true,
    namespaced: true,
})
export default class SettingsStore extends VuexModule {
    settings: EditorSettings = default_settings;

    emailSettings: EmailSettings = default_email_settings;

    @Mutation
    changeSettings(settings: EditorSettings) {
        this.settings = settings;
    }

    @Action
    async getEditorSettings() {
        try {
            const editorSettings: EditorSettings = await $pb.collection('editor_settings').getFirstListItem(`user='${$pb.authStore.model?.id}'`, { '$autoCancel': false })
            return editorSettings;
        } catch (error) {
            return null;
        }
    }

    @MutationAction({ mutate: ['settings'] })
    async updateEditorSettings(editorSettings: EditorSettings) {
        if (!$pb.authStore.isValid) {
            return { settings: this.settings };
        }
        try {
            let updatedEditorSettings: EditorSettings;
            if (editorSettings.id == "default") {
                editorSettings.user = $pb.authStore.model?.id;
                editorSettings.id = ""
                updatedEditorSettings = await $pb.collection('editor_settings').create(editorSettings);
            } else {
                updatedEditorSettings = await $pb.collection('editor_settings').update(editorSettings.id, editorSettings)
            }

            return { settings: updatedEditorSettings };
        } catch (error) {
            return { settings: this.settings };
        }
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
            if (emailSettings.id == "default") {
                emailSettings.user = $pb.authStore.model?.id;
                emailSettings.id = ""
                updatedEmailSettings = await $pb.collection('email_settings').create(emailSettings);
            } else {
                updatedEmailSettings = await $pb.collection('email_settings').update(emailSettings.id, emailSettings)
            }

            return updatedEmailSettings;
        } catch (error) {
            return null
        }
    }
}
