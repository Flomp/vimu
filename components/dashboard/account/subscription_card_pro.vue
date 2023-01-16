<template>
    <div class="vimu-card pricing-card pa-6" style="max-width: 600px;">
        <h5 class="vimu-card-title">vimu Pro</h5>
        <v-row>
            <v-col>
                <p><span class="price">4.99€</span><span class="vimu-subtitle">/month</span></p>
                <p>You are subscribed to <b>vimu</b> Pro.</p>
            </v-col>
            <v-col>
                <div class="d-flex my-3" v-for="perk, i in ['<b>vimu</b> editor', 'Unlimited files', 'Unlimited scores', 'Collaboration features']"
                    :key="i">
                    <v-icon class="mr-4" color="success">mdi-check</v-icon>
                    <span v-html="perk"></span>
                </div>
            </v-col>
        </v-row>

        <vimu-btn :primary="true" :loading="redirectLoading" :disabled="redirectLoading"
            @click="manageSubscription">Manage</vimu-btn>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import { $pb, stripeStore } from "~/store";

@Component({
    components: {
        VimuBtn
    }
})
export default class SubscriptionCardPro extends Vue {
    redirectLoading: boolean = false;


    async manageSubscription() {
        window.location.href = 'https://billing.stripe.com/p/login/test_3cs5lc0mM6eGbT24gg'
    }

}
</script>

<style>

</style>