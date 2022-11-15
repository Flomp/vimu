interface Score {
    id?: string;
    name: string;
    public: boolean;
    meta?: ScoreMeta
}

interface ScoreMeta {
    ambitus?: string;
    composer?: string;
    date?: string;
    instruments?: string;
    keys?: string;
    language?: string;
    times?: string;
}

const empty_score: Score = {
    name: "",
    public: false,
    meta: {
        ambitus: "",
        composer: "",
        date: "",
        instruments: "",
        keys: "",
        language: "",
        times: "",
    }
}

export { Score, ScoreMeta, empty_score }