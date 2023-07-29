<template>
    <div>
        <v-list class="transparent" dense>
            <v-list-item-group v-model="selectedItem" color="accent">
                <div class="d-flex justify-space-between align-center mb-2 ">
                    <h5 class="black--text">Inputs</h5>
                    <v-btn @click="addInput" icon><v-icon>mdi-plus</v-icon></v-btn>
                </div>
                <v-list-item v-for="input, i in plugin.inputs" :key="'in_' + i" link @click="elementClick(input, i)">
                    <v-list-item-title class=" drawer-title">
                        <span class="grey--text">{{ input.key }}: </span> {{ input.name }}
                    </v-list-item-title>
                </v-list-item>
                <div class="d-flex justify-space-between align-center mb-2 ">
                    <h5 class="black--text">Outputs</h5>
                    <v-btn @click="addOutput" icon><v-icon>mdi-plus</v-icon></v-btn>
                </div>
                <v-list-item v-for="output, i in plugin.outputs" :key="'out_' + i" link @click="elementClick(output, i)">
                    <v-list-item-title class="drawer-title">
                        <span class="grey--text">{{ output.key }}: </span> {{ output.name }}
                    </v-list-item-title>
                </v-list-item>
                <h5 class="mt-4 mb-2 black--text">Controls</h5>
                <v-list-item v-for="control, i in plugin.controls" :key="'control_' + i" link
                    @click="elementClick(control, i)">
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
import { Plugin, PluginControl, PluginOutput, PluginSocket } from "~/models/plugin";

@Component({})
export default class PluginSidebar extends Vue {
    @Prop()
    plugin!: Plugin;

    @VModel()
    selectedItem!: number;

    @Emit()
    elementClick(element: PluginControl | PluginSocket, index: number) {
        return { element: element, index: index }
    }

    @Emit()
    addInput() {
        return this.plugin;
    }

    @Emit()
    addOutput() {
        return this.plugin;
    }
}
</script>

<style></style>