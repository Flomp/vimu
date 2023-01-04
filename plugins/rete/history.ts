import { NodeEditor } from 'rete';
import { Data } from 'rete/types/core/data';

class History {
    produced: Data[] = [];
    reserved: Data[] = [];

    add(data: Data) {
        this.produced.push(JSON.parse(JSON.stringify(data)));
        this.reserved = [];
    }

    get last() {
        return this.produced[this.produced.length - 1];
    }

    _do(data: { from: Data[], to: Data[] }) {
        const action = data.from.pop();

        if (!action) return;
        data.to.push(action);
    }

    undo() {
        const action = this.produced[this.produced.length - 2];
        this._do({ from: this.produced, to: this.reserved });

        return action
    }

    clear() {
        this.produced = [];
        this.reserved = [];
    }

    redo() {
        const action = this.reserved[this.reserved.length - 1];
        this._do({ from: this.reserved, to: this.produced });

        return action
    }
}

function install(editor: NodeEditor) {
    editor.bind('undo');
    editor.bind('redo');
    editor.bind('addhistory');
    editor.bind('clearhistory');

    const history = new History();

    async function update(data?: Data) {
        if (!data) {
            return;
        }
        await editor.fromJSON(data);
        editor.trigger('setdata' as any, {data: data, updateBackend: true})
    }

    editor.on('undo' as any, async () => {
        const data = history.undo();        
        await update(data);
    });
    editor.on('redo' as any, async () => {
        const data = history.redo();
        await update(data);
    });
    editor.on('addhistory' as any, (data: Data) => {
        history.add(data);
    });

    editor.on('clearhistory' as any, () => {
        history.clear();
    });
}

export default {
    name: 'history',
    install
}