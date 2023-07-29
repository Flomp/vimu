<template>
    <div>
        <h4 class="text-h5 mb-4" v-if="activeElement"><b>{{ activeElement.key }}</b></h4>
        <h4 class="text-h5 mb-4" v-else><b>{{ plugin.name }}</b></h4>

        <template v-if="activeElement === null">
            <vimu-text-field class="mt-1" v-model="plugin.name" label="Name" :dense="true"></vimu-text-field>
            <vimu-textarea v-model="plugin.description" label="Description"></vimu-textarea>
        </template>
        <template v-else-if="currentSocket">
            <span class="text-caption">Name</span>
            <vimu-text-field class="mt-1" v-model="currentSocket.name" :dense="true"></vimu-text-field>
            <span class="text-caption">Data Type</span>
            <vimu-select v-model="currentSocket.type" :items="socketTypes" :dense="true"></vimu-select>
        </template>
        <template v-else-if="currentControl">
            <span class="text-caption">Name</span>
            <vimu-text-field class="mt-1" v-model="currentControl.name" :dense="true"></vimu-text-field>
            <v-divider class="mb-6"></v-divider>
            <h5 class="pb-4">Attributes</h5>
            <template v-for="attribute in currentControl.attributes">
                <span class="text-caption">{{ attribute.name }}</span>
                <vimu-text-field v-model="attribute.value" :dense="true" v-if="attribute.type = 'string'"></vimu-text-field>
            </template>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
import { sockets } from "~/components/editor/rete/sockets/sockets";
import VimuSelect from "~/components/vimu/vimu_select.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import VimuTextarea from "~/components/vimu/vimu_textarea.vue";
import { Plugin, PluginControl, PluginSocket } from "~/models/plugin";

@Component({
    components: {
        VimuTextField,
        VimuTextarea,
        VimuSelect
    }
})
export default class PluginProperties extends Vue {
    @Prop()
    plugin!: Plugin
    @Prop()
    activeElement!: PluginControl | PluginSocket | null

    currentSocket: PluginSocket | null = null;
    currentControl: PluginControl | null = null;

    socketTypes = Object.entries(sockets).map(([key, socket]) => ({
        text: socket.name,
        value: key
    }))

    @Watch("activeElement")
    onActiveElementChanged() {
        if (this.activeElement == null) {
            return;
        }
        if (Object.keys(this.activeElement).includes("attributes")) {
            this.currentControl = this.activeElement as PluginControl;
            this.currentSocket = null;
        } else {
            this.currentSocket = this.activeElement as PluginSocket;
            this.currentControl = null;
        }

    }
}
</script>

<style></style>