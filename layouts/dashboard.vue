<template>
    <v-app class="layout">
        <notification-center />
        <mobile-menu v-if="$vuetify.breakpoint.smAndDown"></mobile-menu>
        <drawer v-else></drawer>

        <div class="dashboard-appbar d-flex align-center" v-if="!$vuetify.breakpoint.smAndDown">
            <vimu-btn class="mr-6" to="/dashboard/account/subscription" v-if="!subscribed">Upgrade now!</vimu-btn>
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
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuProfileMenu from "~/components/vimu/vimu_profile_menu.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import { subscriptionStore } from "~/store";

@Component({
    components: {
        VimuAppBar,
        NotificationCenter,
        Drawer,
        VimuProfileMenu,
        VimuTextField,
        MobileMenu,
        VimuBtn,
    },
})
export default class DashboardLayout extends Vue {
    get subscribed() {
        return subscriptionStore.subscribed
    }
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
