<template>
  <div class="vimu-card pricing-card pricing-card-pro pa-5">
    <div class="d-flex vimu-card-title mb-4">
      <span>Pro</span>
      <v-spacer></v-spacer>
      <v-chip color="primary" v-if="active">Current plan</v-chip>
    </div>
    <p class="pricing-description">For professional use and collaboration</p>
    <p><span class="price">3.99€</span><span class="vimu-subtitle">/month</span></p>
    <v-divider class="mb-4"></v-divider>
    <div class="pb-4">
      <div class="d-flex my-3" v-for="perk, i in perks" :key="i">
        <v-icon class="mr-4" color="success">mdi-check</v-icon>
        <span v-html="perk"></span>
      </div>
    </div>
    <vimu-btn :primary="true" to="/dashboard/account/subscription">Get started</vimu-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { subscriptionStore } from "~/utils/store-accessor";
import VimuBtn from "../vimu/vimu_button.vue";

@Component({
  components: {
    VimuBtn
  }
})
export default class PricingCardPro extends Vue {
  perks = [
    "<b>vimu</b> editor", "All library scores", "Unlimited files", "Unlimited personal scores", "File sharing", "Realtime collaboration", "Teams", "Daily backups", "Priority support"
  ]

  get active() {
    return this.$pb.authStore.isValid && subscriptionStore.subscribed
  }
}
</script>

<style class="sass">
.pricing-card-pro {
  outline: 3px solid #2962FF !important;
  border-radius: 10px;
}
</style>