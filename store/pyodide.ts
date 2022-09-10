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

    callbacks: any = {};

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
                const onSuccess = this.callbacks[data.id];
                delete this.callbacks[data.id];
                if (onSuccess) {
                    if (data.result) {
                        onSuccess(data.result);
                    } else if (data.error) {
                        logStore.log({ level: LogLevel.error, text: data.error })
                    }
                }
            }
        };

    }

    @Action({ rawError: true })
    async asyncRun(data: { id: number, python: string, writeNodeData: boolean }) {
        this.setLoading(true);
        const result = await new Promise<any>((onSuccess) => {
            this.callbacks[data.id] = onSuccess;

            this.worker.postMessage({
                id: data.id,
                python: data.python,
                writeNodeData: data.writeNodeData,
            });
        }).finally(() => this.setLoading(false));


        return result;
    };
}


