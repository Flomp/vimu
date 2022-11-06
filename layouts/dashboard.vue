<template>
    <v-app>
        <notification-center />
        <drawer></drawer>

        <div class="dashboard-appbar">
            <vimu-profile-menu></vimu-profile-menu>

        </div>
        <v-main>
            <nuxt />
        </v-main>
    </v-app>
</template>
  
<script lang="ts">
import { Component, ProvideReactive, Vue } from "nuxt-property-decorator";
import VimuAppBar from "~/components/vimu/vimu_appbar.vue";
import NotificationCenter from "~/components/vimu/notification-center.vue";
import Drawer from "~/components/dashboard/drawer.vue";
import VimuProfileMenu from "~/components/vimu/vimu_profile_menu.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
@Component({
    components: {
        VimuAppBar,
        NotificationCenter,
        Drawer,
        VimuProfileMenu,
        VimuTextField
    },
})
export default class DashboardLayout extends Vue {
    @ProvideReactive()
    loggedIn: boolean = true
}
</script>

<style>
.dashboard-appbar {
    position: absolute;
    right: 48px;
    top: 13.5px;
    z-index: 1;
}

@media only screen and (max-width: 536px) {
    .dashboard-appbar {
        display:none
    }
}
</style>
  