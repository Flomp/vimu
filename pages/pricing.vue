<template>
    <v-container class="mb-12">
        <h1 class="vimu-title pb-5">Pricing</h1>
        <h3 class="vimu-subtitle pb-8">Fair pricing for every use case</h3>
        <v-row>
            <v-col cols="12" sm="6" md="3">
                <pricing-card-open-source></pricing-card-open-source>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <pricing-card-default></pricing-card-default>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <pricing-card-pro></pricing-card-pro>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <pricing-card-enterprise></pricing-card-enterprise>
            </v-col>

        </v-row>

        <v-row style="margin-top: 72px">
            <v-col cols="auto" class="mr-12 mb-6">
                <h1>Frequently<br />Asked<br />Questions</h1>
            </v-col>
            <v-col>
                <v-expansion-panels class="faq-panels flex-shrink" flat multiple>
                    <v-expansion-panel class="faq-panel" v-for="item, i in faqItems" :key="i">
                        <v-expansion-panel-header>
                            <h3>{{ item.title }}</h3>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            {{ item.text }}
                        </v-expansion-panel-content>
                        <v-divider class="mx-6"></v-divider>

                    </v-expansion-panel>
                </v-expansion-panels></v-col>

        </v-row>
    </v-container>

</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import PricingCardDefault from "~/components/pricing/pricing_card_default.vue";
import PricingCardEnterprise from "~/components/pricing/pricing_card_enterprise.vue";
import PricingCardOpenSource from "~/components/pricing/pricing_card_open_source.vue";
import PricingCardPro from "~/components/pricing/pricing_card_pro.vue";

@Component({
    head: {
        title: "Pricing"
    },
    components: {
        PricingCardOpenSource,
        PricingCardDefault,
        PricingCardPro,
        PricingCardEnterprise
    }
})
export default class PricingPage extends Vue {

    faqItems = [
        {
            "title": "Which plan is right for me?",
            "text": "If you are just trying out vimu, the free plan will be enough. You will have access to all features of the editor, but there will be some limits to the number of files and scores you can create. If you want to get more serious, consider purchasing a subscription to gain access to all vimu features."
        },
        {
            "title": "It's open source, why should I pay?",
            "text": "You are more than welcome to install vimu on your own server. We provide extensive documentation to help you with the process. However, it costs money every month to provide our hosted version of vimu for free. By subscribing, you help us further develop the editor to create the best possible experience for all users and keep the service running."
        },
        {
            "title": "Can I upgrade my plan later on?",
            "text": "Yes, you can upgrade your plan anytime. You just need to log in to your account, click “Upgrade Now” on the top bar and upgrade to a plan of your choosing."
        },
        {
            "title": "How do I cancel my subscription?",
            "text": "You can cancel your subscription in your account settings under \"Subscription\". Please feel free to contact us if you have any questions regarding your subscription."
        },
        {
            "title": "What payment options are available?",
            "text": "We accept payments from every major credit card company."
        }
    ]
}
</script>

<style>
.faq-panels {
    outline: 2px solid currentColor;
    border-radius: 10px;
}

.faq-panel {
    border-radius: 10px !important;
}
</style>