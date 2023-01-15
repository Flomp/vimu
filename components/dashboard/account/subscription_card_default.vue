<template>
    <div class="vimu-card pricing-card pa-6" style="max-width: 600px; margin: 16px auto">
        <h5 class="vimu-card-title">vimu Basic</h5>
        <v-row>
            <v-col>
                <p><span class="price">0€</span><span class="vimu-subtitle">/month</span></p>
                <p>You are currently using the free version of <b>vimu</b>.</p>
            </v-col>
            <v-col>
                <div class="d-flex my-3" v-for="perk, i in ['<b>vimu</b> editor', 'Up to 2 files', 'Up to 2 scores']"
                    :key="i">
                    <v-icon class="mr-4" color="success">mdi-check</v-icon>
                    <span v-html="perk"></span>
                </div>
            </v-col>
        </v-row>

        <vimu-btn :primary="true" :loading="redirectLoading" :disabled="redirectLoading"
            @click="purchaseSubscription">Upgrade</vimu-btn>
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
export default class SubscriptionCardDefault extends Vue {
    redirectLoading: boolean = false;


    async purchaseSubscription() {
        if (!$pb.authStore.model) {
            return;
        }
        this.redirectLoading = true;
        const redirectURL = await stripeStore.createSession({
            price_id: 'price_1MQV9PBYGSbYZu0OTzlNGR1W',
            email: $pb.authStore.model?.email,
            user_id: $pb.authStore.model?.id
        })
        this.redirectLoading = false;

        if (redirectURL) {
            window.location.href = redirectURL;
        }
    }

}
</script>

<style>

</style>