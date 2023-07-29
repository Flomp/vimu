import Rete from 'rete';
export default {

}

export const heroSocket = new Rete.Socket("index.hero")
const scoreSocket = new Rete.Socket("music21.stream.Score")
const partSocket = new Rete.Socket("music21.stream.Part")
const streamSocket = new Rete.Socket("music21.stream.Base")
const objectSocket = new Rete.Socket("music21.base.Music21Object")

scoreSocket.combineWith(streamSocket)
partSocket.combineWith(streamSocket)
streamSocket.combineWith(scoreSocket)
streamSocket.combineWith(partSocket)

scoreSocket.combineWith(objectSocket)
partSocket.combineWith(objectSocket)
streamSocket.combineWith(objectSocket)

export const sockets = {
    stream: streamSocket,
    score: scoreSocket,
    part: partSocket,
    object: objectSocket,
    number: new Rete.Socket("int"),

}

