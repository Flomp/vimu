<template>
    <div>
        <v-list class="transparent" dense>
            <v-list-item-group v-model="selectedItem" color="accent">
                <div class="d-flex justify-space-between align-center mb-2 ">
                    <h5 class="black--text">Inputs</h5>
                    <v-btn @click="addInput" icon><v-icon>mdi-plus</v-icon></v-btn>
                </div>
                <v-list-item v-for="input, i in pluginConfig.inputs" :key="'in_' + i" link @click="elementClick(input, i, 'inputs')">
                    <v-list-item-title class=" drawer-title">
                        <span class="grey--text">{{ input.key }}: </span> {{ input.name }}
                    </v-list-item-title>
                </v-list-item>
                <div class="d-flex justify-space-between align-center mb-2 ">
                    <h5 class="black--text">Outputs</h5>
                    <v-btn @click="addOutput" icon><v-icon>mdi-plus</v-icon></v-btn>
                </div>
                <v-list-item v-for="output, i in pluginConfig.outputs" :key="'out_' + i" link @click="elementClick(output, i, 'outputs')">
                    <v-list-item-title class="drawer-title">
                        <span class="grey--text">{{ output.key }}: </span> {{ output.name }}
                    </v-list-item-title>
                </v-list-item>
                <h5 class="mt-4 mb-2 black--text">Controls</h5>
                <v-list-item v-for="control, i in pluginConfig.controls" :key="'control_' + i" link
                    @click="elementClick(control, i, 'controls')">
                    <v-list-item-title class="drawer-title">
                        <span class="grey--text">{{ control.key }}: </span> {{ control.name }}
                    </v-list-item-title>
                </v-list-item>
            </v-list-item-group>

        </v-list>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, VModel } from "nuxt-property-decorator";
import { PluginConfig, PluginControl, PluginOutput, PluginSocket } from "~/models/plugin";

@Component({})
export default class PluginSidebar extends Vue {
    @Prop()
    pluginConfig!: PluginConfig;

    @VModel()
    selectedItem!: number;

    @Emit()
    elementClick(element: PluginControl | PluginSocket, index: number, mode: "inputs" | "outputs" | "controls") {
        return { element: element, index: index, mode: mode }
    }

    @Emit()
    addInput() {
        return this.pluginConfig;
    }

    @Emit()
    addOutput() {
        return this.pluginConfig;
    }
}
</script>

<style></style>