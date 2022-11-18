<template>
    <v-list dense>
        <v-list-item class="px-12" v-if="showLogo">
            <nuxt-link to="/">
                <Logo :width=128 />
            </nuxt-link>
        </v-list-item>

        <v-list-item to="/dashboard/files/recent">
            <v-list-item-avatar>
                <v-icon size="20">mdi-history</v-icon>
            </v-list-item-avatar>
            <v-list-item-title class="drawer-title">
                Recent
            </v-list-item-title>
        </v-list-item>
        <v-list-item to="/dashboard/files/all">
            <v-list-item-avatar>
                <v-icon size="20">mdi-file</v-icon>
            </v-list-item-avatar>
            <v-list-item-title class="drawer-title">
                Files
            </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <div class="my-4">
            <span class="navigation-heading mx-4">Favorites</span>
            <template v-if="favorites.length > 0">
                <v-list-item :to="'/editor/' + fav.id" v-for="fav in favorites" :key="fav.id">
                    <v-list-item-title class="favorite-title">
                        <span class="ml-4">{{ fav.name }}</span>
                    </v-list-item-title>

                </v-list-item>
            </template>
            <div class="mx-4 my-2" style="line-height: 1rem" v-else>
                <span class="empty-text">Click the star on any file to add it here</span>
            </div>

        </div>
        <v-divider></v-divider>
        <v-list-item to="/dashboard/scores">
            <v-list-item-avatar>
                <v-icon size="20">mdi-music</v-icon>
            </v-list-item-avatar>
            <v-list-item-title class="drawer-title">
                Scores
            </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <div class="my-4">
            <div class="d-flex align-center">
                <span class="navigation-heading mx-4">Teams</span>
                <v-btn color="primary" icon><v-icon size="20">mdi-plus</v-icon></v-btn>
            </div>
            <div class="mx-4 my-2" style="line-height: 1rem">
                <span class="empty-text">Your teams appear here</span>
            </div>
        </div>
        <v-divider v-if="!showLogo"></v-divider>
    </v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import File from "~/models/file";
import { fileStore } from "~/store";
import Logo from "../vimu/logo.vue";

@Component({
    components: {
        Logo
    }
})
export default class DashboardNavigation extends Vue {
    @Prop({ default: true }) readonly showLogo!: boolean;

    get favorites(): File[] {
        return fileStore.files.filter(f => f.favorite);
    }

    get templates(): File[] {
        return fileStore.files.filter(f => f.template);
    }
}
</script>

<style>
.drawer-title {
    font-size: 0.8rem;
    font-weight: 600;
}

.navigation-heading {
    font-size: 0.75rem;
    font-weight: 700;
}

.favorite-title {
    font-size: 0.7rem !important;
}

.empty-text {
    color: #5A5A5A;
    font-size: 0.7rem;

}
</style>