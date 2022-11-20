import Vue from 'vue';
import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import File, { example_files } from '~/models/file';
import { Score } from '~/models/score';
import { generateName } from '~/utils/string';
import { $pb, fileStore, notificationStore } from '.';

@Module({
    name: 'file',
    stateFactory: true,
    namespaced: true,
})
export default class LogStore extends VuexModule {
    files: File[] = []
    file: File | null = null;

    maxPage: number = -1;

    @Mutation
    setFile(file: File | null) {
        this.file = file;
    }


    @MutationAction({ mutate: ['files', 'maxPage'] })
    async list(data: { page:number, filter: string, sort: string, perPage?: number }) {
        try {
            const response = await $pb.collection('files').getList(undefined, undefined, { sort: data.sort, filter: data.filter })
            if (data.page == 1) {
                return { files: response.items, maxPage: response.totalPages }
            } else {
                return { files: this.files.concat(response.items as any), maxPage: response.totalPages }
            }
        }catch {
            return { files: this.files, maxPage: this.maxPage }
        }
    }

    @MutationAction({ mutate: ['file'] })
    async get(id: string) {
        try {
            if (Object.keys(example_files).includes(id)) {
                return { file: example_files[id] }
            }
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
    async update(data: { id: string, json?: string, name?: string, favorite?: boolean }): Promise<File | null> {
        try {
            const updatedFile: File = await $pb.collection('files').update(data.id, { 'name': data.name, 'json': data.json, 'favorite': data.favorite })
            fileStore.updateClient({ id: data.id, updatedFile })
            return updatedFile;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error updating file', color: 'error' })
            return null;
        }
    }

    @Mutation
    updateClient(data: { id: string, updatedFile?: File }) {
        const fileIndex = this.files.findIndex((s) => s.id == data.id)
        const isCurrentFile = this.file?.id == data.updatedFile?.id;
        if (data.updatedFile !== undefined) {
            if (isCurrentFile) {
                this.file = data.updatedFile;
            }
            if (fileIndex !== -1) {
                if (data.updatedFile !== undefined) {
                    Vue.set(this.files, fileIndex, data.updatedFile)
                } 
            }
        } else {
            if (isCurrentFile) {
                this.file = null;
            }
            if (fileIndex !== -1) {
                this.files.splice(fileIndex, 1);
            }
        }
    }

    @Action
    async delete(file: File): Promise<boolean> {
        try {
            const success: boolean = await $pb.collection('files').delete(file.id)
            fileStore.updateClient({ id: file.id })
            return success;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error deleting file', color: 'error' })
            return false;
        }
    }
}
