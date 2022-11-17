import { Action, Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import File from '~/models/file';
import { Score } from '~/models/score';
import { generateName } from '~/utils/string';
import { $pb, notificationStore } from '.';

@Module({
    name: 'file',
    stateFactory: true,
    namespaced: true,
})
export default class LogStore extends VuexModule {
    files: File[] = []
    file: File | null = null;


    @MutationAction({ mutate: ['files'] })
    async list(data: { filter: string, sort: string } = { filter: '', sort: '' }) {
        const response = await $pb.collection('files').getList(undefined, undefined, { sort: data.sort, filter: data.filter })
        return { files: response.items }
    }

    @MutationAction({ mutate: ['file'] })
    async get(id: string) {
        try {
            const response = await $pb.collection('files').getOne(id)
            return { file: response }
        } catch (error) {
            return { file: null }
        }
    }

    @Action
    async create(template?: File): Promise<File | null> {
        try {
            const name = generateName();
            const json = template !== undefined ? template!.json : '{"id":"vimu@0.1.0","nodes":{"1":{"id":1,"data":{},"inputs":{"in_0":{"connections":[{"node":24,"output":"out_0","data":{}}]}},"outputs":{},"position":[156,-1],"name":"output"},"24":{"id":24,"data":{},"inputs":{},"outputs":{"out_0":{"connections":[{"node":1,"input":"in_0","data":{}}]}},"position":[-119.5,-41],"name":"source_score"}}}'           
            const file: File = await $pb.collection('files').create({ 'name': name, 'json': json, 'user_id': $pb.authStore.model!.id })
            return file;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error creating new file', color: 'error' })
            return null;
        }
    }

    @Action
    async createFileFromScore(score: Score): Promise<File | null> {
        try {
            const name = generateName();
            const json = `{"id":"vimu@0.1.0","nodes":{"1":{"id":1,"data":{},"inputs":{"in_0":{"connections":[{"node":24,"output":"out_0","data":{}}]}},"outputs":{},"position":[156,-1],"name":"output"},"24":{"id":24,"data":{"data":{"id":"${score.id}","name":"${score.name}","data":"${score.data}"}},"inputs":{},"outputs":{"out_0":{"connections":[{"node":1,"input":"in_0","data":{}}]}},"position":[-119.5,-41],"name":"source_score"}}}`          
            const file: File = await $pb.collection('files').create({ 'name': name, 'json': json, 'user_id': $pb.authStore.model!.id })
            return file;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error creating new file', color: 'error' })
            return null;
        }
    }

    @Action
    async update(data: { id: string, json?: string, name?: string, favorite?: boolean, template?: boolean }): Promise<File | null> {
        try {
            const file: File = await $pb.collection('files').update(data.id, { 'name': data.name, 'json': data.json, 'favorite': data.favorite, 'template': data.template })
            return file;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error updating file', color: 'error' })
            return null;
        }
    }

    @Action
    async delete(id: string): Promise<boolean> {
        try {
            const success: boolean = await $pb.collection('files').delete(id)
            return success;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error deleting file', color: 'error' })
            return false;
        }
    }
}
