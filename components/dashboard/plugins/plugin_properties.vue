<template>
    <div>
        <!-- <h4 class="text-h5 mb-4" v-if="activeElement"><b>{{ activeElement.key }}</b></h4>
        <h4 class="text-h5 mb-4" v-else><b>{{ activeElement.name }}</b></h4> -->

        <h5 class="mb-4">Properties</h5>

        <template v-if="mode == 'plugin'">
            <span class="text-caption">Name</span>
            <vimu-text-field class="mt-1" v-model="name" :dense="true" @blur="update"></vimu-text-field>
            <span class="text-caption">Description</span>
            <vimu-textarea v-model="description" @blur="update"></vimu-textarea>
        </template>
        <template v-else-if="mode == 'inputs' || mode == 'outputs'">
            <span class="text-caption">Name</span>
            <vimu-text-field class="mt-1" v-model="socketName" :dense="true" @blur="update"></vimu-text-field>
            <span class="text-caption">Data Type</span>
            <vimu-select v-model="socketType" :items="socketTypes" :dense="true" @blur="update"></vimu-select>
        </template>
        <template v-else-if="mode == 'controls'">
            <span class="text-caption">Name</span>
            <vimu-text-field class="mt-1" v-model="controlName" :dense="true" @blur="update"></vimu-text-field>
            <v-divider class="mb-6"></v-divider>
            <h5 class="pb-4">Attributes</h5>
            <template v-for="attribute, key in controlAttributes">
                <span class="text-caption">{{ attribute.name }}</span>
                <vimu-text-field :value="attribute.value" :dense="true" @input="setAttributeValue($event, key)"
                    v-if="attribute.type = 'string'" @blur="update"></vimu-text-field>
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
import { PluginConfig, PluginControl, PluginControlAttribute, PluginSocket } from "~/models/plugin";
import { pluginStore } from "~/store";

@Component({
    components: {
        VimuTextField,
        VimuTextarea,
        VimuSelect
    }
})
export default class PluginProperties extends Vue {
    @Prop()
    mode!: "plugin" | "inputs" | "outputs" | "controls"

    @Prop()
    currentIndex!: number;

    socketTypes = Object.entries(sockets).map(([key, socket]) => ({
        text: socket.name,
        value: key
    }))


    get name() {
        return pluginStore.plugin?.name ?? ""
    }

    set name(value: string) {
        pluginStore.setPluginConfig({ key: "name", value: value });
    }

    get description() {
        return pluginStore.plugin?.description ?? ""
    }

    set description(value: string) {
        pluginStore.setPluginConfig({ key: "description", value: value });
    }

    get socketName() {
        if (this.mode == "inputs") {
            return pluginStore.plugin!.config.inputs[this.currentIndex].name
        } else if (this.mode == "outputs") {
            return pluginStore.plugin!.config.outputs[this.currentIndex].name
        }
        return ""
    }

    set socketName(value: string) {
        pluginStore.setSocketName({ socketType: this.mode as any, index: this.currentIndex, value: value });
    }

    get socketType() {
        if (this.mode == "inputs") {
            return pluginStore.plugin!.config.inputs[this.currentIndex].type
        } else if (this.mode == "outputs") {
            return pluginStore.plugin!.config.outputs[this.currentIndex].type
        }
        return "stream"
    }

    set socketType(value: keyof typeof sockets) {
        pluginStore.setSocketType({ socketType: this.mode as any, index: this.currentIndex, value: value });
    }

    get controlName() {
        return pluginStore.plugin?.config.controls[this.currentIndex].name
    }

    get controlAttributes() {
        return pluginStore.plugin?.config.controls[this.currentIndex].attributes
    }

    setAttributeValue(value: any, key: string) {
        pluginStore.setPluginAttribute({ controlIndex: this.currentIndex, attributeKey: key, value: value });
    }

    update() {
        if(pluginStore.plugin == null) {
            return;
        }
        pluginStore.update(pluginStore.plugin);
    }

}
</script>

<style></style>