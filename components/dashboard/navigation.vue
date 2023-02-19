<template>
    <v-list dense>
        <v-list-item class="px-12 pb-2" v-if="showLogo">
            <nuxt-link to="/">
                <Logo :width=128 />
            </nuxt-link>
        </v-list-item>
        <v-list-item class="mx-4" to="/dashboard/files/my">
            <v-list-item-avatar>
                <v-icon size="20">mdi-file</v-icon>
            </v-list-item-avatar>
            <v-list-item-title class="drawer-title">
                My Files
            </v-list-item-title>
        </v-list-item>
        <v-list-item class="mx-4" to="/dashboard/files/shared">
            <v-list-item-avatar>
                <v-icon size="20">mdi-share-variant</v-icon>
            </v-list-item-avatar>
            <v-list-item-title class="drawer-title">
                Shared Files
            </v-list-item-title>
        </v-list-item>
        <v-list-item class="mx-4 mb-4" to="/dashboard/scores">
            <v-list-item-avatar>
                <v-icon size="20">mdi-music</v-icon>
            </v-list-item-avatar>
            <v-list-item-title class="drawer-title">
                Scores
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
            <div class="mx-4 my-2" style="line-height: 1rem" v-else-if="favorites.length == 0 && !$fetchState.pending">
                <span class="empty-text">Click the star on any file to add it here</span>
            </div>
            <v-skeleton-loader class="mx-4" type="paragraph" v-else></v-skeleton-loader>
        </div>
        <v-divider></v-divider>
        <div class="my-4">
            <div class="d-flex align-center mx-4">
                <span class="navigation-heading">Teams</span>
                <v-spacer></v-spacer>
                <v-btn color="primary" icon @click="checkSubscriptionAndNavigate"><v-icon
                        size="20">mdi-plus</v-icon></v-btn>
            </div>
            <template v-if="teams.length > 0">
                <v-list-item @click="goToTeam(team)" v-for="team in teams" :key="team.id">
                    <team-avatar class="ma-1" :team="team" :size="20"></team-avatar>
                    <v-list-item-title class="favorite-title">
                        <span class="ml-4">{{ team.name }}</span>
                    </v-list-item-title>

                </v-list-item>
            </template>
            <div class="mx-4 my-2" style="line-height: 1rem" v-else-if="teams.length == 0 && !$fetchState.pending">
                <span class="empty-text">Your teams appear here</span>
            </div>
        </div>
        <v-divider v-if="!showLogo"></v-divider>
        <upgrade-dialog v-model="showUpgradeDialog" reason="team"></upgrade-dialog>
    </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { File } from "~/models/file";
import { Team } from "~/models/team";
import { fileStore, subscriptionStore, teamStore } from "~/store";
import Logo from "../vimu/illustrations/logo.vue";
import TeamAvatar from "./team/team_avatar.vue";
import UpgradeDialog from "./upgrade_dialog.vue";

@Component({
    components: {
        Logo,
        TeamAvatar,
        UpgradeDialog
    }
})
export default class DashboardNavigation extends Vue {
    @Prop({ default: true }) readonly showLogo!: boolean;

    showUpgradeDialog: boolean = false;

    get favorites(): File[] {
        return fileStore.favorites;
    }

    get teams(): Team[] {
        return teamStore.teams;
    }

    async fetch() {
        await fileStore.listFavorites();
        await teamStore.list();
    }

    goToTeam(team: Team) {
        teamStore.setTeam(team);
        this.$router.push('/dashboard/teams/' + team.id);
    }

    checkSubscriptionAndNavigate() {
        if (!subscriptionStore.subscribed) {
            this.showUpgradeDialog = true;
        } else {
            this.$router.push('/dashboard/teams/create')
        }
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