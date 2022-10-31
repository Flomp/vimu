import Rete from 'rete';
export default {

}

const heroSocket = new Rete.Socket("index.hero")
const scoreSocket = new Rete.Socket("music21.stream.Score")
const partSocket = new Rete.Socket("music21.stream.Part")
const keySocket = new Rete.Socket("music21.key.Key")
const streamSocket = new Rete.Socket("music21.stream")

scoreSocket.combineWith(streamSocket)
partSocket.combineWith(streamSocket)
streamSocket.combineWith(scoreSocket)
streamSocket.combineWith(partSocket)

export const sockets = {
    hero: heroSocket,
    number: new Rete.Socket("Number value"),
    stream: streamSocket,
    score: scoreSocket,
    part: partSocket,
    key: keySocket

}

