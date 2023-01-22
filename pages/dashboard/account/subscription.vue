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
                <v-simple-table v-if="invoices && invoices.length">
                    <thead>
                        <tr>
                            <th>
                                Status
                            </th>
                            <th>
                                Invoice No.
                            </th>
                            <th>Date</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in invoices" :key="i.id">
                            <td><v-icon>{{ invoiceIcon(i.status) }}</v-icon></td>
                            <td>{{ i.number }}</td>
                            <td>{{ formatDate(i.created) }}</td>
                            <td>{{ formatNumber(i.total) }}</td>
                            <td><vimu-btn :href="i.hosted_invoice_url">View</vimu-btn></td>
                        </tr>
                    </tbody>
                </v-simple-table>
                <div class="d-flex align-center justify-center" style="height: 100px" v-else>
                    <span class="vimu-text">Nothing here yet</span>
                </div>
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
import VimuBtn from "~/components/vimu/vimu_button.vue";
import { stripeStore, subscriptionStore } from "~/store";

@Component({
    head: {
        title: "Account"
    },
    layout: 'dashboard',
    components: {
        SubscriptionCardDefault,
        SubscriptionCardPro,
        AccountNavigation,
        VimuBtn
    },
    fetchOnServer: false
})
export default class AccountPageSubscription extends Vue {

    async fetch() {
        if (subscriptionStore.subscribed) {
            await stripeStore.listInvoices(subscriptionStore.subscription!.stripe_customer_id);
        }
    }

    get invoices() {
        return stripeStore.invoices;
    }

    get subscribed() {
        return subscriptionStore.subscribed;
    }

    invoiceIcon(status: string) {
        return status === 'paid' ? "mdi-check-circle-outline" : "mdi-close"
    }

    formatDate(timestamp: number) {
        return new Date(timestamp * 1000)?.toLocaleDateString() ?? "?"
    }

    formatNumber(cents: number) {
        return (cents / 100).toLocaleString(undefined, { style: "currency", currency: "EUR" });;
    }

}
</script>

<style>

</style>