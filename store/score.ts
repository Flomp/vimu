import Vue from 'vue';
import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { Score, ScoreMeta } from '~/models/score';
import { $axios, $pb, notificationStore, scoreStore } from '.';

@Module({
    name: 'score',
    stateFactory: true,
    namespaced: true,
})
export default class ScoreStore extends VuexModule {
    scores: Score[] = []
    score: Score | null = null;

    maxPage: number = -1;

    @Mutation
    setScore(score: Score) {
        this.score = score;
    }

    @Action({ rawError: true })
    async getMeta(file: File): Promise<ScoreMeta | null> {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await $axios.post('/musicxml/meta', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data.data
        } catch {
            return null;
        }
    }

    @Action({ rawError: true })
    async getThumbnail(file: File): Promise<Blob | null> {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await $axios.post('/musicxml/thumbnail', formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        } catch {
            return null;
        }
    }

    @MutationAction({ mutate: ['scores', 'maxPage'] })
    async list(data: { page: number, filter: string, sort: string, perPage?: number }) {
        try {
            const response = await $pb.collection('scores').getList(data.page, data.perPage, { sort: data.sort, filter: data.filter, expand: 'meta' })
            if (data.page == 1) {
                return { scores: response.items, maxPage: response.totalPages }
            } else {
                return { scores: this.scores.concat(response.items as any), maxPage: response.totalPages }
            }
        } catch {
            return { scores: this.scores, maxPage: this.maxPage }
        }
    }

    @Action
    async create(data: { score: Score, file: File, thumbnail?: Blob }): Promise<Score | null> {
        const formData = new FormData();
        formData.append("data", data.file);
        if (data.thumbnail) {
            formData.append("thumbnail", data.thumbnail)
        }
        for (const key in data.score) {
            if (key != "meta") {
                formData.append(key, data.score[key as keyof Score] as string);
            }
        }

        formData.append("owner", $pb.authStore.model!.id);
        try {
            const resultMeta: ScoreMeta = await $pb.collection('score_meta').create({ ...data.score.expand.meta })
            formData.append("meta", resultMeta.id!)
            const resultScore: Score = await $pb.collection('scores').create(formData, { expand: 'meta' })
            return resultScore;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error creating new score', color: 'error' })
            return null;
        }
    }

    @Action
    async update(score: Score): Promise<Score | null> {
        try {
            const updatedMeta: ScoreMeta = await $pb.collection('score_meta').update(score.expand.meta.id!, score.expand.meta)
            const updatedScore: Score = await $pb.collection('scores').update(score.id!, score, { expand: 'meta' })
            scoreStore.updateClient({ score, updatedScore });
            return updatedScore;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error updating score', color: 'error' })
            return null;
        }
    }

    @Mutation
    updateClient(data: { score: Score, updatedScore?: Score }) {
        const scoreIndex = this.scores.findIndex((s) => s.id == data.score.id)
        const isCurrentFile = this.score?.id == data.updatedScore?.id;
        if (data.updatedScore !== undefined) {
            if (isCurrentFile) {
                this.score = data.updatedScore;
            }
            if (scoreIndex !== -1) {
                if (data.updatedScore !== undefined) {
                    Vue.set(this.scores, scoreIndex, data.updatedScore)
                }
            }
        } else {
            if (isCurrentFile) {
                this.score = null;
            }
            if (scoreIndex !== -1) {
                this.scores.splice(scoreIndex, 1);
            }
        }
    }

    @Action
    async delete(score: Score): Promise<boolean> {
        try {
            let successMeta: boolean = true;
            if (score.expand.meta) {
                successMeta = await $pb.collection('score_meta').delete(score.expand.meta.id!)
            }
            const success: boolean = await $pb.collection('scores').delete(score.id!)
            scoreStore.updateClient({ score })
            return success && successMeta;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error deleting score', color: 'error' })
            return false;
        }
    }

    @Action
    async getTotalScores(): Promise<number | null> {
        try {
            const response = await $pb.collection('scores').getList();
            return response.totalItems;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error getting', color: 'error' })
            return null;
        }
    }
}
