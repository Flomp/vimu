<template>
    <v-app>
        <notification-center />
        <drawer></drawer>
        <div class="d-flex vimu-appbar dashboard-appbar align-center pr-3 px-md-12">
            <v-spacer></v-spacer>
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
@media only screen and (min-width: 600px) {
    .dashboard-appbar {
        margin-left: 224px
    }
}
</style>
  