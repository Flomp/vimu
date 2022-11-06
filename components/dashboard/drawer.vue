<template>
    <v-navigation-drawer v-model="drawer" :permanent="!$vuetify.breakpoint.xsOnly" app width="224">
        <v-list>
            <v-list-item class="px-12">
                <nuxt-link to="/">
                    <Logo :width=128 />
                </nuxt-link>
            </v-list-item>

            <v-list-item to="/dashboard/files/recent">
                <v-list-item-avatar>
                    <v-icon>mdi-history</v-icon>
                </v-list-item-avatar>
                <v-list-item-title class="drawer-title">
                    Recent
                </v-list-item-title>
            </v-list-item>
            <v-list-item to="/dashboard/files/all">
                <v-list-item-avatar>
                    <v-icon>mdi-file</v-icon>
                </v-list-item-avatar>
                <v-list-item-title class="drawer-title">
                    Files
                </v-list-item-title>
            </v-list-item>
            <v-list-item to="/dashboard/files/favorites">
                <v-list-item-avatar>
                    <v-icon>mdi-star</v-icon>
                </v-list-item-avatar>
                <v-list-item-title class="drawer-title">
                    Favorites
                </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>

        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import Logo from "../vimu/logo.vue";
@Component({
    components: {
        Logo
    }
})
export default class Drawer extends Vue {
    drawer: boolean = false;
}
</script>

<style>
.drawer-title {
    font-size: 0.8rem;
    font-weight: 600;
}
</style>