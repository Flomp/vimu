import Rete from 'rete';
export default {

}

export const heroSocket = new Rete.Socket("index.hero")
const scoreSocket = new Rete.Socket("music21.stream.Score")
const partSocket = new Rete.Socket("music21.stream.Part")
const streamSocket = new Rete.Socket("music21.stream.base.Stream")
const objectSocket = new Rete.Socket("music21.base.Music21Object")
const intSocket = new Rete.Socket("int")
const floatSocket = new Rete.Socket("float")
const stringSocket = new Rete.Socket("string")
const boolSocket = new Rete.Socket("bool")
const listSocket = new Rete.Socket("list")
const setSocket = new Rete.Socket("set")
const dictSocket = new Rete.Socket("dict")


scoreSocket.combineWith(streamSocket)
partSocket.combineWith(streamSocket)
streamSocket.combineWith(scoreSocket)
streamSocket.combineWith(partSocket)

scoreSocket.combineWith(objectSocket)
partSocket.combineWith(objectSocket)
streamSocket.combineWith(objectSocket)

export const sockets = {
    int: intSocket,
    float: floatSocket,
    string: stringSocket,
    bool: boolSocket,
    list: listSocket,
    set: setSocket,
    dict: dictSocket,
    stream: streamSocket,
    score: scoreSocket,
    part: partSocket,
    object: objectSocket,
}

