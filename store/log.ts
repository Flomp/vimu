import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Log, LogLevel } from '~/models/log';

@Module({
    name: 'log',
    stateFactory: true,
    namespaced: true,
})
export default class LogStore extends VuexModule {
    logs: Log[] = []
    @Mutation
    log(data: { level: LogLevel, text: string }) {
        this.logs.push(<Log>{ date: new Date(), level: data.level, text: data.text })
    }
}
