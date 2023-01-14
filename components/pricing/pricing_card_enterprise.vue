<template>
  <div class="vimu-card pricing-card pa-5">
    <p class="vimu-card-title">
      Enterprise
    </p>
    <p class="pricing-description">For companies and research institutions</p>
    <p><span class="price">Contact us</span></p>
    <v-divider class="mb-4"></v-divider>
    <p>If you wish to provide <b>vimu</b> for a large user base within your company or research institution, feel free
      to contact us.</p>
    <vimu-btn>Contact us</vimu-btn>
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
export default class PricingCardEnterprise extends Vue {
}
</script>

<style>

</style>