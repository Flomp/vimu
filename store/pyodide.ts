import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { LogLevel } from '~/models/log';
import { logStore } from '.';

@Module({
    name: 'pyodide',
    stateFactory: true,
    namespaced: true,
})
export default class PyodideStore extends VuexModule {
    worker = new Worker("/pyodide-worker.js");

    callbacks: Record<number, { resolve: (value: any) => void, reject: (reason?: any) => void }> = {};

    initialised: number = 0.0;

    loading: boolean = false;

    @Mutation
    setInitialised(initialised: number) {
        this.initialised = initialised
    }

    @Mutation
    setLoading(loading: boolean) {
        this.loading = loading
    }

    @Action({ rawError: true })
    init() {
        this.worker.onmessage = (event) => {
            const data: { id: number, result?: any, error?: any } = event.data;

            if (data.id == -1) {
                this.setInitialised(data.result)
            } else {
                const callback = this.callbacks[data.id];
                delete this.callbacks[data.id];
                if (callback) {
                    if (data.result) {
                        callback.resolve(data.result);
                    } else if (data.error) {
                        callback.reject(data.error)
                    }
                }
            }
        };

    }

    @Action({ rawError: true })
    async asyncRun(data: { id: number, python: string, writeNodeData: boolean }) {
        this.setLoading(true);
        const result = await new Promise<any>((onSuccess, onError) => {
            this.callbacks[data.id] = { resolve: onSuccess, reject: onError };

            this.worker.postMessage({
                id: data.id,
                python: data.python,
                writeNodeData: data.writeNodeData,
            });
        }).catch((error) => {
            logStore.log({ level: LogLevel.error, text: error })
        }).finally(() => this.setLoading(false));

        return result;
    };
}


