<template>
    <v-app>
        <notification-center />
        <mobile-menu v-if="$vuetify.breakpoint.smAndDown"></mobile-menu>
        <drawer v-else></drawer>

        <div class="dashboard-appbar" v-if="!$vuetify.breakpoint.smAndDown">
            <vimu-profile-menu :logged-in="true"></vimu-profile-menu>
        </div>
        <v-main>
            <nuxt />
        </v-main>
    </v-app>
</template>
  
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Drawer from "~/components/dashboard/drawer.vue";
import MobileMenu from "~/components/dashboard/mobile_menu.vue";
import NotificationCenter from "~/components/vimu/notification-center.vue";
import VimuAppBar from "~/components/vimu/vimu_appbar.vue";
import VimuProfileMenu from "~/components/vimu/vimu_profile_menu.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
@Component({
    components: {
        VimuAppBar,
        NotificationCenter,
        Drawer,
        VimuProfileMenu,
        VimuTextField,
        MobileMenu
    },
})
export default class DashboardLayout extends Vue {
}
</script>

<style>
.dashboard-appbar {
    position: fixed;
    right: 48px;
    top: 13.5px;
    z-index: 3;
}
</style>
  