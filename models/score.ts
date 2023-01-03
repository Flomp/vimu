interface Score {
    id?: string;
    name: string;
    thumbnail: string;
    data: string;
    public: boolean;
    expand: {
        meta: ScoreMeta
    }
    owner: string;
    updated: string;
    created: string;
}

interface ScoreMeta {
    id?: string;
    composer?: string;
    date?: string;
    instruments?: string;
    keys?: string;
    language?: string;
    opus?: string;
    times?: string;
}

interface ScoreFilter {
    composer?: string[];
    date?: string[];
    instruments?: string[];
    keys?: string[];
    language?: string[];
    opus?: string[];
    times?: string[];
}

const empty_score_meta: ScoreMeta = {
    composer: "",
    date: "",
    instruments: "",
    keys: "",
    language: "",
    opus: "",
    times: ""
}

const empty_score: Score = {
    name: "",
    public: false,
    thumbnail: "",
    data: "",
    expand: {
        meta: empty_score_meta
    },
    owner: "",
    updated: "",
    created: ""
}



export { Score, ScoreMeta, ScoreFilter, empty_score, empty_score_meta }