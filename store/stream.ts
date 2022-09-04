import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { PyProxy } from '~/types/pyodide';
import { $axios, $pyodide } from '.'

@Module({
    name: 'stream',
    stateFactory: true,
    namespaced: true,
})
export default class StreamStore extends VuexModule {

    @Action({ rawError: true })
    async measures(data: { stream: PyProxy, start: number, end: number }): Promise<PyProxy> {
        const namespace = $pyodide.toPy({ stream: data.stream });
        const result = await $pyodide.runPython(`stream.measures(${data.start}, ${data.end})`, { globals: namespace });

        return result;
    }

    @Action({ rawError: true })
    async analyze(data: { stream: PyProxy }): Promise<PyProxy> {
        const namespace = $pyodide.toPy({ stream: data.stream });
        const result = await $pyodide.runPythonAsync(`stream.analyze('key')`, { globals: namespace });

        return result;
    }

    @Action({ rawError: true })
    async transpose(data: { stream: PyProxy, steps: number }): Promise<PyProxy> {

        const namespace = $pyodide.toPy({ stream: data.stream });
        const result = await $pyodide.runPythonAsync(`stream.transpose(${data.steps})`, { globals: namespace });

        return result;
    }

    @Action({ rawError: true })
    async streamToString(data: { stream: PyProxy}): Promise<string> {

        const namespace = $pyodide.toPy({ stream: data.stream });
        const result = await $pyodide.runPythonAsync(`open(stream.write()).read()`, { globals: namespace });

        return result;
    }

}
