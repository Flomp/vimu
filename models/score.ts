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
    opus?: string;
    times?: string;
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
    clicks: 0,
    data: "",
    expand: {
        meta: empty_score_meta
    },
    user_id: ""
}



export { Score, ScoreMeta, empty_score, empty_score_meta }