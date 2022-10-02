import { Action, Module, VuexModule } from 'vuex-module-decorators';
import { PyProxy } from '~/types/pyodide';
import { pyodideStore } from '.';

@Module({
    name: 'stream',
    stateFactory: true,
    namespaced: true,
})
export default class StreamStore extends VuexModule {

    @Action({ rawError: true })
    async measures(data: { nodeId: number, inputNodeId: number, start: number, end: number }): Promise<PyProxy> {

        const result = await pyodideStore.asyncRun({ id: data.nodeId, python: `n${data.inputNodeId}.measures(${data.start}, ${data.end})`, writeNodeData: true });

        return result;
    }

    @Action({ rawError: true })
    async part(data: { nodeId: number, inputNodeId: number, part: number }): Promise<string> {

        const result = await pyodideStore.asyncRun({ id: data.nodeId, python: `n${data.inputNodeId}.parts[${data.part}]`, writeNodeData: true });

        return result;
    }

    @Action({ rawError: true })
    async notes(data: { nodeId: number, inputNodeId: number, start: number, end: number }): Promise<PyProxy> {

        const result = await pyodideStore.asyncRun({ id: data.nodeId, python: `
        from music21 import stream
        l = n${data.inputNodeId}.flat.notes[${data.start}:${data.end}]
        s = stream.Stream()
        s.append(l)
        s
        `, writeNodeData: true });

        return result;
    }

    @Action({ rawError: true })
    async analyze(data: { nodeId: number, inputNodeId: number }): Promise<PyProxy> {

        const result = await pyodideStore.asyncRun({ id: data.nodeId, python: `n${data.inputNodeId}.analyze('key')`, writeNodeData: true });

        return result;
    }

    @Action({ rawError: true })
    async romanNumeral(data: { nodeId: number, input0NodeId: number, input1NodeId: number }): Promise<PyProxy> {

        const result = await pyodideStore.asyncRun({
            id: data.nodeId, python: `
        from music21 import roman, key
        for c in n${data.input1NodeId}.recurse().getElementsByClass('Chord'):
            rn = roman.romanNumeralFromChord(c, n${data.input0NodeId})
            c.addLyric(str(rn.figure))
        n${data.input1NodeId}
        `, writeNodeData: true
        });

        return result;
    }

    @Action({ rawError: true })
    async transpose(data: { nodeId: number, inputNodeId: number, steps: number }): Promise<PyProxy> {

        const result = await pyodideStore.asyncRun({ id: data.nodeId, python: `n${data.inputNodeId}.transpose(${data.steps})`, writeNodeData: true });

        return result;
    }

    @Action({ rawError: true })
    async chordify(data: { nodeId: number, inputNodeId: number }): Promise<PyProxy> {

        const result = await pyodideStore.asyncRun({
            id: data.nodeId, python: `
        s = n${data.inputNodeId}.chordify()
        for c in s.recurse().getElementsByClass('Chord'):
            c.closedPosition(forceOctave=4, inPlace=True)
        s
        `, writeNodeData: true
        });

        return result;
    }

    @Action({ rawError: true })
    async flatten(data: { nodeId: number, inputNodeId: number }): Promise<PyProxy> {

        const result = await pyodideStore.asyncRun({ id: data.nodeId, python: `n${data.inputNodeId}.flatten()`, writeNodeData: true });

        return result;
    }

    @Action({ rawError: true })
    async streamToString(data: { nodeId: number }): Promise<string> {

        const result = await pyodideStore.asyncRun({ id: Date.now(), python: `open(n${data.nodeId}.write()).read()`, writeNodeData: false });

        return result;
    }

}
