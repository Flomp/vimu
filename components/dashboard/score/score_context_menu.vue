<template>
    <v-menu offset-y content-class="vimu-menu elevation-0">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        <v-list dense>
            <v-list-item @click="edit">
                <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item @click="remove">
                <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "nuxt-property-decorator";

@Component({})
export default class ScoreContextMenu extends Vue {
    @Emit()
    edit() {
        return;
    }

    @Emit()
    remove() {
        return;
    }

}
</script>

<style>

</style>