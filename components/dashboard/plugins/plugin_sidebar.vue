<template>
    <div>
        <h4 class="text-h5"><b>Plugin Editor</b></h4>
        <v-list class="mt-4" dense>
            <v-list-item-group v-model="selectedItem" color="accent">
                <h5 class="mb-2 black--text">Inputs</h5>
                <v-list-item v-for="input, i in plugin.inputs" :key="'in_' + i" link>
                    <v-list-item-title class="drawer-title">
                        {{ input.name }}
                    </v-list-item-title>
                </v-list-item>
                <h5 class="mt-4 mb-2 black--text">Outputs</h5>
                <v-list-item v-for="output, i in plugin.outputs" :key="'out_' + i" link>
                    <v-list-item-title class="drawer-title">
                        {{ output.name }}
                    </v-list-item-title>
                </v-list-item>
                <h5 class="mt-4 mb-2 black--text">Controls</h5>
                <v-list-item v-for="control, i in plugin.controls" :key="'control_' + i" link>
                    <v-list-item-title class="drawer-title" @click="controlClick(control)">
                        {{ control.name }}
                    </v-list-item-title>
                </v-list-item>
            </v-list-item-group>

        </v-list>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "nuxt-property-decorator";
import { Plugin, PluginControl } from "~/models/plugin";

@Component({})
export default class PluginSidebar extends Vue {
    @Prop()
    plugin!: Plugin;

    selectedItem = -1;

    @Emit()
    controlClick(control: PluginControl) {
        return control
    }
}
</script>

<style></style>