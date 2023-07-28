<template>
    <v-sheet class="page">
        <v-container class="pt-0">
            <div class="header-section pt-4">
                <div class="d-flex align-center mb-8">
                    <vimu-searchbar id="plugin-searchbar" v-model="filters.query" :hide-details="true" @update="search"
                        style="max-width: 400px;">
                    </vimu-searchbar>
                </div>
                <span class="vimu-title">Plugins</span>
            </div>
        </v-container>
    </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component({
    head: {
        title: "Scores"
    },
    layout: 'dashboard',
})
export default class PluginsPage extends Vue {
    filters = {
        query: "",

    }

    search() {

    }
}
</script>

<style></style>