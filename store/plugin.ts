import Vue from 'vue';
import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { Plugin, empty_plugin_config } from '~/models/plugin';
import { $pb, notificationStore, pluginStore } from '~/utils/store-accessor';
import { generateName } from '~/utils/string';

@Module({
    name: 'plugin',
    stateFactory: true,
    namespaced: true,
})
export default class PluginStore extends VuexModule {
    plugins: Plugin[] = [];
    plugin: Plugin | null = null;

    maxPage: number = -1;

    @Mutation
    setPlugin(plugin: Plugin) {
        this.plugin = plugin;
    }

    @Mutation
    setPluginCode(code: string) {
        if (!this.plugin) {
            return;
        }
        this.plugin.code = code;
    }

    @Mutation
    setPluginConfig(data: { key: "name" | "description", value: string }) {
        if (!this.plugin) {
            return;
        }
        this.plugin[data.key] = data.value;
    }

    @Mutation
    setSocketName(data: { socketType: "inputs" | "outputs", index: number, value: string }) {
        if (!this.plugin) {
            return;
        }
        this.plugin.config[data.socketType][data.index].name = data.value;
    }

    @Mutation
    setSocketType(data: { socketType: "inputs" | "outputs", index: number, value: any }) {
        if (!this.plugin) {
            return;
        }
        this.plugin.config[data.socketType][data.index].type = data.value;
    }

    @Mutation
    setPluginAttribute(data: { controlIndex: number, attributeKey: string, value: any }) {
        if (!this.plugin) {
            return;
        }
        this.plugin.config.controls[data.controlIndex].attributes[data.attributeKey].value = data.value;
    }

    @MutationAction({ mutate: ['plugins', 'maxPage'] })
    async list(data: { page: number, filter: string, sort: string, perPage?: number }) {
        try {
            const response = await $pb.collection('plugins').getList(data.page, data.perPage, { sort: data.sort, filter: data.filter })
            if (data.page == 1) {
                return { plugins: response.items, maxPage: response.totalPages }
            } else {
                return { plugins: this.plugins.concat(response.items as any), maxPage: response.totalPages }
            }
        } catch {
            return { plugins: this.plugins, maxPage: this.maxPage }
        }
    }

    @MutationAction({ mutate: ['plugin'] })
    async get(id: string) {
        try {
            let response = await $pb.collection('plugins').getOne<Plugin>(id, { expand: 'owner', $autoCancel: false })
            return { plugin: response }
        } catch (error) {
            return { plugin: null }
        }
    }

    @Action
    async create() {
        try {
            const config = empty_plugin_config;
            const code = `from music21 import *
in_0_data = input_data.get('in_0')
if in_0_data is not None:
    new_output_data = in_0_data

    for key in node.outputs.keys():
        output_data[key] = new_output_data`;
            const plugin: Plugin = await $pb.collection('plugins').create<Plugin>({
                name: generateName(),
                description: "", config: config, code: code, owner: $pb.authStore.model!.id
            })

            return plugin;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error creating new plugin', color: 'error' })
            return null;
        }
    }

    @Action
    async update(newPlugin: Plugin) {
        try {
            pluginStore.setPlugin(newPlugin);
            let response = await $pb.collection('plugins').update<Plugin>(newPlugin.id, newPlugin)
        } catch (error) {
            return { plugin: null }
        }
    }

    @Action
    async delete(plugin: Plugin): Promise<boolean> {
        try {
            let successMeta: boolean = true;
            const success: boolean = await $pb.collection('plugins').delete(plugin.id!)
            pluginStore.updateClient({ plugin })
            return success && successMeta;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error deleting plugin', color: 'error' })
            return false;
        }
    }

    @Mutation
    updateClient(data: { plugin: Plugin, updatedPlugin?: Plugin }) {
        const pluginIndex = this.plugins.findIndex((s) => s.id == data.plugin.id)
        const isCurrentFile = this.plugin?.id == data.updatedPlugin?.id;
        if (data.updatedPlugin !== undefined) {
            if (isCurrentFile) {
                this.plugin = data.updatedPlugin;
            }
            if (pluginIndex !== -1) {
                if (data.updatedPlugin !== undefined) {
                    Vue.set(this.plugins, pluginIndex, data.updatedPlugin)
                }
            }
        } else {
            if (isCurrentFile) {
                this.plugin = null;
            }
            if (pluginIndex !== -1) {
                this.plugins.splice(pluginIndex, 1);
            }
        }
    }
}
