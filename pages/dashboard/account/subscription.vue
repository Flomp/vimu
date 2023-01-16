<template>
    <v-sheet class="page">
        <h1 class="vimu-title ml-8 mt-2">Account</h1>
        <account-navigation v-if="$vuetify.breakpoint.smAndDown" :sticky="false"></account-navigation>
        <div class="d-flex">
            <v-container class="px-12">
                <h2 class="vimu-subtitle mt-6">Active plan</h2>
                <client-only>
                    <div class="my-8">
                        <subscription-card-pro v-if="subscribed"></subscription-card-pro>
                        <subscription-card-default v-else></subscription-card-default>
                    </div>
                </client-only>
                <h2 class="vimu-subtitle my-6">Invoices</h2>
            </v-container>
            <account-navigation v-if="$vuetify.breakpoint.mdAndUp"></account-navigation>
        </div>
    </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AccountNavigation from "~/components/dashboard/account/account_navigation.vue";
import SubscriptionCardDefault from "~/components/dashboard/account/subscription_card_default.vue";
import SubscriptionCardPro from "~/components/dashboard/account/subscription_card_pro.vue";
import { subscriptionStore } from "~/store";

@Component({
    head: {
        title: "Account"
    },
    layout: 'dashboard',
    components: {
        SubscriptionCardDefault,
        SubscriptionCardPro,
        AccountNavigation
    },
})
export default class AccountPageSubscription extends Vue {

    get subscribed() {
        return subscriptionStore.subscribed;
    }

}
</script>

<style>

</style>