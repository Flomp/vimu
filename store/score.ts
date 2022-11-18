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

    @Mutation
    async increaseClickCount(score: Score) {
        score.clicks += 1;
        scoreStore.update(score)
    }

    @MutationAction({ mutate: ['scores'] })
    async list(data: { filter: string, sort: string } = { filter: '', sort: '' }) {
        try {
            const response = await $pb.collection('scores').getList(undefined, 24, { sort: data.sort, filter: data.filter, expand: 'meta' })
            return { scores: response.items }
        } catch {
            return { scores: this.scores }
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

        formData.append("user_id", $pb.authStore.model!.id);
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
            return updatedScore;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error updating score', color: 'error' })
            return null;
        }
    }

    @Action
    async delete(score: Score): Promise<boolean> {
        try {
            const successMeta: boolean = await $pb.collection('score_meta').delete(score.expand.meta.id!)
            const success: boolean = await $pb.collection('scores').delete(score.id!)
            return success && successMeta;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error deleting score', color: 'error' })
            return false;
        }
    }
}
