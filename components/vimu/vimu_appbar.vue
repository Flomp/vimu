<template>
  <div class="vimu-appbar py-2">
    <div class="d-flex align-center justify-space-between px-12">
      <div>
        <nuxt-link to="/">
          <Logo :width=128 />
        </nuxt-link>
      </div>
      <div class="d-flex align-center justify-space-between" style="flex-basis: 35%" v-if="!$vuetify.breakpoint.mobile">
        <div>
          <span class="font-weight-bold px-5">Documentation</span>
          <span class="font-weight-bold px-5">Pricing</span>
        </div>

        <vimu-btn class="ml-10" to="/login">Login</vimu-btn>
      </div>
      <v-btn color="black" icon @click="showMenu = !showMenu" v-else>
        <v-icon>{{ menuIcon }}</v-icon>
      </v-btn>

    </div>
    <div v-if="showMenu">
      <div class="d-flex flex-column vimu-appbar-menu">
        <span class="font-weight-bold px-5 py-4">Documentation</span>
        <span class="font-weight-bold px-5 pt-4 pb-3">Pricing</span>
        <vimu-btn class="ma-5" to="/login">Login</vimu-btn>
      </div>
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
  showMenu: boolean = false;


  get menuIcon() {
    return this.showMenu ? "mdi-menu-up" : "mdi-menu-down"
  }

}
</script>

<style>
.vimu-appbar {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 2;
}

.vimu-appbar-menu {
  position: absolute;
  width: 100%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
</style>