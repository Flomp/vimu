import { Data } from 'rete/types/core/data';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { historyStore } from '.';

@Module({
    name: 'history',
    stateFactory: true,
    namespaced: true,
})
export default class HistoryStore extends VuexModule {
    produced: Data[] = [];
    reserved: Data[] = [];

    @Mutation
    add(data: Data) {
        this.produced.push(JSON.parse(JSON.stringify(data)));
        this.reserved = [];
    }

    get last() {
        return this.produced[this.produced.length - 1];
    }

    @Mutation
    _do(data: { from: Data[], to: Data[] }) {
        const action = data.from.pop();

        if (!action) return;
        data.to.push(action);        
    }

    @Action({ rawError: true })
    async undo() {
        const action = this.produced[this.produced.length - 2];
        historyStore._do({ from: this.produced, to: this.reserved });

        return action
    }

    @Action
    clear() {
        this.produced = [];
        this.reserved = [];
    }

    @Action
    redo() {
        const action = this.reserved[this.reserved.length - 1];
        historyStore._do({ from: this.reserved, to: this.produced });

        return action
    }
}
