<template>
  <div class="vimu-card pricing-card pa-5">
    <div class="d-flex vimu-card-title mb-4">
      <span>Basic</span>
      <v-spacer></v-spacer>
      <v-chip color="primary" v-if="active">Current plan</v-chip>
    </div>
    <p class="pricing-description">For occasional users with simple use cases</p>
    <p><span class="price">0€</span><span class="vimu-subtitle">/month</span></p>
    <v-divider class="mb-4"></v-divider>
    <div class="pb-4">
      <div class="d-flex my-3" v-for="perk, i in perks" :key="i">
        <v-icon class="mr-4" color="success">mdi-check</v-icon>
        <span v-html="perk"></span>
      </div>
    </div>
    <vimu-btn to="/dashboard/files/my">Get started</vimu-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { subscriptionStore } from "~/store";
import VimuBtn from "../vimu/vimu_button.vue";

@Component({
  components: {
    VimuBtn
  }
})
export default class PricingCardDefault extends Vue {
  perks = [
    "<b>vimu</b> editor", "All library scores", "Up to 2 files", "Up to 2 personal scores", "Community support"
  ]

  get active() {
    return this.$pb.authStore.isValid && !subscriptionStore.subscribed
  }
}
</script>

<style>
.pricing-description {
  font-size: 0.85rem;
  color: #141616
}
</style>