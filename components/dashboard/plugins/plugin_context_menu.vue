<template>
    <v-menu offset-y content-class="vimu-menu elevation-0">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        <v-list dense>
            <v-list-item @click="rename">
                <v-list-item-title>Rename</v-list-item-title>
            </v-list-item>
            <v-list-item @click="publish">
                <v-list-item-title>{{ public ? "Unpublish" : "Publish" }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="remove">
                <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "nuxt-property-decorator";

@Component({})
export default class PluginContextMenu extends Vue {
    @Prop()
    public!: boolean;

    @Emit()
    rename() {
        return;
    }
    @Emit()
    publish() {
        return;
    }
    @Emit()
    remove() {
        return;
    }

}
</script>

<style></style>