<template>
    <v-navigation-drawer permanent app width="224">
        <dashboard-navigation></dashboard-navigation>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import Logo from "../vimu/logo.vue";
import DashboardNavigation from "./navigation.vue";

@Component({
    components: {
        Logo,
        DashboardNavigation
    }
})
export default class Drawer extends Vue {
}
</script>

<style>
</style>