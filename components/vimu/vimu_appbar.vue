<template>
  <div class="vimu-appbar py-2">
    <div class="d-flex align-center justify-space-between px-12">
      <div>
        <nuxt-link to="/">
          <Logo :width=128 />
        </nuxt-link>
      </div>
      <div class="d-flex align-center justify-space-between" v-if="!$vuetify.breakpoint.mobile">
        <div style="margin-right: 64px">
          <span class="font-weight-bold px-5">Documentation</span>
          <span class="font-weight-bold px-5">Pricing</span>
        </div>

        <div>
          <vimu-btn class="mr-4" :primary="true" to="/dashboard/files/all" v-if="loggedIn">Dashboard</vimu-btn>
          <vimu-profile-menu></vimu-profile-menu>
        </div>
      </div>
      <v-btn color="black" icon @click="showMenu = !showMenu" v-else-if="!loggedIn">
        <v-icon>{{ menuIcon }}</v-icon>
      </v-btn>
      <div v-else>
          <vimu-profile-menu></vimu-profile-menu>
        </div>


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
import { Vue, Component, ProvideReactive } from "nuxt-property-decorator";
import VimuBtn from "./vimu_button.vue";
import Logo from "./logo.vue";
import VimuProfileMenu from "./vimu_profile_menu.vue";

@Component({
  components: {
    Logo,
    VimuBtn,
    VimuProfileMenu
  }
})
export default class VimuAppBar extends Vue {
  showMenu: boolean = false;

  @ProvideReactive()
  loggedIn: boolean = this.$pb.authStore.model !== null;

  mounted() {
    this.$pb.authStore.onChange((token, model) => {
      this.loggedIn = token !== null && model !== null;
    });
  }



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
  height: 75px;
}

.vimu-appbar-menu {
  position: absolute;
  width: 100%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
</style>