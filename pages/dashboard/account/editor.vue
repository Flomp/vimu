<template>
    <v-sheet class="page">
        <h1 class="vimu-title ml-8 mt-2">Account</h1>
        <account-navigation v-if="$vuetify.breakpoint.smAndDown" :sticky="false"></account-navigation>
        <div class="d-flex">
            <v-container>
                <div class="text-center" style="max-width: 400px; margin: auto">
                    <bunny-engineer :width="200"></bunny-engineer>
                    <h2 class="my-5 grey--text text--darken-2">This page is currently under construction</h2>
                </div>

            </v-container>
            <account-navigation v-if="$vuetify.breakpoint.mdAndUp"></account-navigation>

        </div>

    </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import AccountNavigation from "~/components/dashboard/account/account_navigation.vue";
import BunnyEngineer from "~/components/vimu/illustrations/bunny_engineer.vue";

@Component({
    components: {
        AccountNavigation,
        BunnyEngineer,
    },
    head: {
        title: "Account"
    },
    layout: 'dashboard',
})
export default class AccountEditorPage extends Vue {
}
</script>

<style>

</style>