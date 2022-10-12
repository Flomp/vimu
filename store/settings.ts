import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { default_settings, Settings } from '~/models/settings';

@Module({
    name: 'settings',
    stateFactory: true,
    namespaced: true,
})
export default class SettingsStore extends VuexModule {
    settings: Settings = default_settings;

    @Mutation
    changeSettings(settings: Settings) {
       this.settings = settings;
    }
}
