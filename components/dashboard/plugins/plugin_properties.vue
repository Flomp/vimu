<template>
    <div>
        <!-- <h4 class="text-h5 mb-4" v-if="activeElement"><b>{{ activeElement.key }}</b></h4>
        <h4 class="text-h5 mb-4" v-else><b>{{ activeElement.name }}</b></h4> -->

        <h5 class="mb-4">Properties</h5>

        <template v-if="mode == 'plugin'">
            <div v-if="readonly">
                <span class="text-caption">Author</span>
                <h5 class="text-h5">{{ pluginOwner }}</h5>
                <v-divider class="my-4"></v-divider>
            </div>

            <span class="text-caption">Name</span>
            <vimu-text-field class="mt-1" v-model="name" :dense="true" @blur="update"
                :disabled="readonly"></vimu-text-field>
            <span class="text-caption">Description</span>
            <vimu-textarea v-model="description" @blur="update" :counter="400" :rules="descriptionRules"
                :disabled="readonly"></vimu-textarea>
        </template>
        <template v-else-if="mode == 'inputs' || mode == 'outputs'">
            <span class="text-caption">Name</span>
            <vimu-text-field class="mt-1" v-model="socketName" :dense="true" @blur="update"
                :disabled="readonly"></vimu-text-field>
            <span class="text-caption">Data Type</span>
            <vimu-select v-model="socketType" :items="socketTypes" :dense="true" @blur="update"
                :disabled="readonly"></vimu-select>
        </template>
        <template v-else-if="mode == 'controls'">
            <span class="text-caption">Name</span>
            <vimu-text-field class="mt-1" v-model="controlName" :dense="true" @blur="update"
                :disabled="readonly"></vimu-text-field>
            <v-divider class="mb-6"></v-divider>
            <h5 class="pb-4">Attributes</h5>
            <template v-for="attribute, key in controlAttributes">
                <span class="text-caption">{{ attribute.name }}</span>
                <vimu-text-field :value="attribute.value" :dense="true" @input="setAttributeValue($event, key)"
                    @blur="update" v-if="attribute.type == 'string'" :disabled="readonly"></vimu-text-field>
                <vimu-text-field :value="attribute.value" :dense="true" @input="setAttributeValue($event, key)"
                    @blur="update" type="number" :rules="[numberRule]" v-if="attribute.type == 'number'"
                    :disabled="readonly"></vimu-text-field>
                <v-checkbox :label="attribute.value ? 'True' : 'False'" :input-value="attribute.value" dense
                    @change="setAttributeValue($event, key); update()" v-if="attribute.type == 'bool'" :disabled="readonly">
                </v-checkbox>
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

    @Prop()
    readonly!: boolean;

    descriptionRules = [(value: string) => value.length <= 400 || '',
    ]

    numberRule(v: string) {
        if (v === "" || !isNaN(parseFloat(v))) return true;
        return "Not a number";
    }

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

    set controlName(n: string | undefined) {
        if (n) {
            pluginStore.setPluginControlName({ controlIndex: this.currentIndex, value: n })
        }
    }

    get controlAttributes() {
        return pluginStore.plugin?.config.controls[this.currentIndex].attributes
    }

    get pluginOwner() {
        return pluginStore.plugin?.expand.owner.username ?? "";
    }

    setAttributeValue(value: any, key: string | number) {
        pluginStore.setPluginControlAttribute({ controlIndex: this.currentIndex, attributeKey: key as string, value: value });
    }

    update() {
        if (pluginStore.plugin == null) {
            return;
        }
        pluginStore.update({ plugin: pluginStore.plugin });
    }

}
</script>

<style></style>