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
}
</script>

<style>

</style>