<template>
  <div class="d-flex align-center justify-space-between py-2 px-12 vimu-appbar">
    <div>
      <Logo :width=128 />
    </div>
    <div class="d-flex align-center justify-space-between" style="flex-basis: 33%">
      <div>
        <span class="font-weight-bold px-5">Documentation</span>
        <span class="font-weight-bold px-5">Pricing</span>
      </div>

      <vimu-btn class="ml-10">Login</vimu-btn>
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import VimuBtn from "./vimu_button.vue";
import Logo from "./logo.vue";


@Component({
  components: {
    Logo,
    VimuBtn
  }
})
export default class VimuAppBar extends Vue {
}
</script>

<style>
.vimu-appbar {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 2;
}

</style>