import { Data } from 'rete/types/core/data';
import Vue from 'vue';
import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { example_files, File, FileData, FilePermission } from '~/models/file';
import { Score } from '~/models/score';
import { generateName } from '~/utils/string';
import { $pb, fileStore, notificationStore } from '.';
import { rename } from '~/utils/json';

@Module({
    name: 'file',
    stateFactory: true,
    namespaced: true,
})
export default class FileStore extends VuexModule {
    files: File[] = []
    favorites: File[] = []
    file: File | null = null;

    maxPage: number = -1;

    @Mutation
    setFile(file: File | null) {
        this.file = file;
    }

    @Mutation
    setData(json: Data) {
        if (!this.file) {
            return;
        }
        this.file.expand.data.json = json;
    }

    @MutationAction({ mutate: ['files', 'maxPage'] })
    async list(data: { page: number, filter: string, sort: string, perPage?: number }) {
        try {
            const response = await $pb.collection('files').getList(undefined, undefined, { sort: data.sort, filter: data.filter, expand: 'file_data(file),collaborators.user,owner' })
            response.items = rename(response.items, 'file_data(file)', 'data')
            if (data.page == 1) {
                return { files: response.items, maxPage: response.totalPages }
            } else {
                return { files: this.files.concat(response.items as any), maxPage: response.totalPages }
            }
        } catch {
            return { files: this.files, maxPage: this.maxPage }
        }
    }

    @MutationAction({ mutate: ['favorites'] })
    async listFavorites() {
        try {
            const response = await $pb.collection('files').getFullList<File>(undefined, { sort: 'name', filter: 'favorite=true', '$autoCancel': false })
            return { favorites: response }
        } catch {
            return { favorites: this.favorites }
        }
    }

    @MutationAction({ mutate: ['file'] })
    async get(id: string) {
        try {
            if (Object.keys(example_files).includes(id)) {
                return { file: example_files[id] }
            }
            let response = await $pb.collection('files').getOne<File>(id, { expand: 'file_data(file),collaborators.user,owner' })
            response = rename(response, 'file_data(file)', 'data')
            fileStore.updateClient({ id: id, updatedFile: response })
            return { file: response }
        } catch (error) {
            return { file: null }
        }
    }

    @Action
    async create(data: { template?: File, name?: string }): Promise<File | null> {
        try {
            const name = data.name ?? generateName();
            const json = data.template !== undefined ? data.template!.expand.data.json : '{"id":"vimu@0.1.0","nodes":{"1":{"id":1,"data":{},"inputs":{"in_0":{"connections":[{"node":24,"output":"out_0","data":{}}]}},"outputs":{},"position":[156,-1],"name":"output"},"24":{"id":24,"data":{},"inputs":{},"outputs":{"out_0":{"connections":[{"node":1,"input":"in_0","data":{}}]}},"position":[-119.5,-41],"name":"source_score"}}}'
            const file: File = await $pb.collection('files').create<File>({ name: name, owner: $pb.authStore.model!.id })
            const fileData: FileData = await $pb.collection('file_data').create<FileData>({ json: json, file: file.id })

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
            const file: File = await $pb.collection('files').create<File>({ name: name, owner: $pb.authStore.model!.id })
            const fileData: FileData = await $pb.collection('file_data').create<FileData>({ json: json, file: file.id })

            return file;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error creating new file', color: 'error' })
            return null;
        }
    }

    @Action
    async update(data: { id: string, name?: string, favorite?: boolean, public?: boolean, collaborators?: string[] }): Promise<File | null> {
        try {
            let updatedFile: File = await $pb.collection('files').update(data.id, { 'name': data.name, 'favorite': data.favorite, 'collaborators': data.collaborators, 'public': data.public }, { expand: 'file_data(file),collaborators.user,owner' })
            updatedFile = rename(updatedFile, 'file_data(file)', 'data')
            fileStore.updateClient({ id: data.id, updatedFile })
            return updatedFile;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error updating file', color: 'error' })
            return null;
        }
    }

    @Action
    async updateData(data: { id: string, json: string }): Promise<FileData | null> {
        try {
            fileStore.setData(JSON.parse(data.json));
            const updatedFileData: FileData = await $pb.collection('file_data').update(data.id, { json: data.json })
            return updatedFileData;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error updating file data', color: 'error' })
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
                Vue.set(this.files, fileIndex, data.updatedFile)
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
            const success = await $pb.collection('files').delete(file.id)
            fileStore.updateClient({ id: file.id })
            return success;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error deleting file', color: 'error' })
            return false;
        }
    }

    @Action
    async getTotalFiles(): Promise<number | null> {
        try {
            const response = await $pb.collection('files').getList();
            return response.totalItems;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error getting', color: 'error' })
            return null;
        }
    }

    get readonly() {
        if (!this.file) {
            return false;
        }
        if (this.file.owner === $pb.authStore.model?.id) {
            return false;
        }
        for (const fileShare of this.file.expand.collaborators ?? []) {
            if (fileShare.user === $pb.authStore.model?.id) {
                return fileShare.permission == FilePermission.view;
            }
        }
        if (this.file.public) {
            return true;
        }
        return true
    }
}
