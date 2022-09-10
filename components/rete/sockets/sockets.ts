import Rete from 'rete';
export default {

}

export const sockets = {
    number: new Rete.Socket("Number value"),
    stream: new Rete.Socket("Stream"),
    key: new Rete.Socket("Key")

}

