<template>
    <div class="mobile-menu">
        <div class="d-flex justify-space-between align-center px-8 pt-2">
            <nuxt-link to="/">
                <Logo :width=128 />
            </nuxt-link>
            <vimu-profile-menu :logged-in="true"></vimu-profile-menu>
        </div>
        <div class="d-flex justify-center">
            <v-btn color="primary" icon @click="showNavigation = !showNavigation">
                <v-icon>{{ menuIcon }}</v-icon>
            </v-btn>
        </div>
        <div v-if="showNavigation">
            <div class="d-flex flex-column">
                <dashboard-navigation :show-logo="false"></dashboard-navigation>
            </div>
        </div>
    </div>


</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import Logo from "../vimu/logo.vue";
import VimuProfileMenu from "../vimu/vimu_profile_menu.vue";
import DashboardNavigation from "./navigation.vue";
@Component({
    components: {
        Logo,
        VimuProfileMenu,
        DashboardNavigation
    }
})
export default class MobileMenu extends Vue {
    showNavigation: boolean = false;

    get menuIcon() {
        return this.showNavigation ? "mdi-menu-up" : "mdi-menu-down"
    }
}
</script>

<style>
.mobile-menu {
    position: sticky;
    top: 0;
    background: white;
    z-index: 2;
}
</style>