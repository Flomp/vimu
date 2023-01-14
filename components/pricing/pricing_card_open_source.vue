<template>
  <div class="vimu-card pricing-card pa-5">
    <p class="vimu-card-title">
      Open source
    </p>
    <p class="pricing-description">
      Get the code and adapt it to your needs
    </p>
    <p><span class="price">0€</span><span class="vimu-subtitle">/month</span></p>
    <v-divider class="mb-4"></v-divider>
    <p><b>vimu</b> is open source and available for free on <a href="https://github.com/flomp">GitHub</a>. If you want to install it on your own system,
      follow our guide in the documentation.</p>
    <vimu-btn>Read the Docs</vimu-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import VimuBtn from "../vimu/vimu_button.vue";

@Component({
  components: {
    VimuBtn
  }
})
export default class PricingCardOpenSource extends Vue {
}
</script>

<style>
.pricing-card .price {
  font-weight: 700;
  font-size: 2rem;
}
</style>