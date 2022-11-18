interface Score {
    id?: string;
    name: string;
    thumbnail: string;
    data: string;
    public: boolean;
    clicks: number;
    expand: {
        meta: ScoreMeta
    }
    user_id: string;
}

interface ScoreMeta {
    id?: string;
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
    thumbnail: "",
    clicks: 0,
    data: "",
    expand: {
        meta: {
            composer: "",
            date: "",
            instruments: "",
            keys: "",
            language: "",
            times: "",
        }
    },
    user_id: ""
}

const empty_score_meta: ScoreMeta = {
    composer: "",
    date: "",
    instruments: "",
    keys: "",
    language: "",
    times: ""
}

export { Score, ScoreMeta, empty_score, empty_score_meta }