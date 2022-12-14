import Rete from 'rete';
export default {

}

const heroSocket = new Rete.Socket("index.hero")
const scoreSocket = new Rete.Socket("music21.stream.Score")
const partSocket = new Rete.Socket("music21.stream.Part")
const keySocket = new Rete.Socket("music21.key.Key")
const streamSocket = new Rete.Socket("music21.stream.Base")
const objectSocket = new Rete.Socket("music21.base.Music21Object")

scoreSocket.combineWith(streamSocket)
partSocket.combineWith(streamSocket)
streamSocket.combineWith(scoreSocket)
streamSocket.combineWith(partSocket)

scoreSocket.combineWith(objectSocket)
partSocket.combineWith(objectSocket)
keySocket.combineWith(objectSocket)
streamSocket.combineWith(objectSocket)

export const sockets = {
    hero: heroSocket,
    number: new Rete.Socket("Number value"),
    stream: streamSocket,
    score: scoreSocket,
    part: partSocket,
    key: keySocket,
    object: objectSocket
}

