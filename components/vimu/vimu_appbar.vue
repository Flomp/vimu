<template>
  <div class="vimu-appbar pt-2 pb-md-2">
    <div class="d-flex align-center justify-space-between px-8 px-md-12">
      <div>
        <nuxt-link to="/">
          <Logo :width=128 />
        </nuxt-link>
      </div>
      <div class="d-flex align-center justify-space-between" v-if="$vuetify.breakpoint.mdAndUp">
        <div class="d-flex align-center" style="margin-right: 64px">
          <v-list-item class="font-weight-bold mx-5 vimu-appbar-menu-item" to="/docs">Documentation</v-list-item>
          <v-list-item class="font-weight-bold vimu-appbar-menu-item" to="/pricing">Pricing</v-list-item>
        </div>

        <div>
          <vimu-btn class="mr-4" :primary="true" to="/dashboard/files/my" v-if="loggedIn">Dashboard</vimu-btn>
          <vimu-profile-menu :logged-in="loggedIn"></vimu-profile-menu>
        </div>
      </div>

      <div v-else>
        <vimu-profile-menu :logged-in="loggedIn"></vimu-profile-menu>
      </div>


    </div>
    <div v-if="$vuetify.breakpoint.smAndDown">
      <div class="d-flex justify-center">
        <v-btn color="black" icon @click="showMenu = !showMenu">
          <v-icon>{{ menuIcon }}</v-icon>
        </v-btn>
      </div>

      <div v-if="showMenu">
        <div class="d-flex flex-column vimu-appbar-menu">
          <v-list-item class="font-weight-bold px-5 vimu-appbar-menu-item" to="/docs">Documentation</v-list-item>
          <documentation-navigation class="ml-10" v-if="showDocNav"></documentation-navigation>
          <span class="font-weight-bold px-5 pt-4 pb-3">Pricing</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
import { Vue, Component, ProvideReactive } from "nuxt-property-decorator";
import VimuBtn from "./vimu_button.vue";
import Logo from "./illustrations/logo.vue";
import VimuProfileMenu from "./vimu_profile_menu.vue";
import { $pb } from "~/store";
import DocumentationNavigation from "../documentation/documentation_navigation.vue";

@Component({
  components: {
    Logo,
    VimuBtn,
    VimuProfileMenu,
    DocumentationNavigation
  }
})
export default class VimuAppBar extends Vue {
  showMenu: boolean = false;

  loggedIn: boolean = $pb.authStore.model !== null;

  get showDocNav() {
    return this.$route.path.startsWith('/docs');
  }

  mounted() {
    $pb.authStore.onChange((token, model) => {
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
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 10;
}

.vimu-appbar-menu {
  width: 100%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.vimu-appbar-menu-item {
  border-radius: 8px;
}

.vimu-appbar-menu-item::before {
  border-radius: 8px;
}
</style>