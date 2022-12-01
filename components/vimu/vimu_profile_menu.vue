<template>
    <v-menu offset-y v-if="loggedIn" nudge-bottom="24" content-class="vimu-menu elevation-0">
        <template v-slot:activator="{ on, attrs }">
            <div class="d-inline" v-bind="attrs" v-on="on">
                <vimu-avatar :seed="avatarSeed" :size="48"></vimu-avatar>
            </div>
        </template>
        <v-list dense>
            <v-list-item>
                <v-list-item-title>
                    <span class="grey--text">User: </span><span>{{username}}</span>
                </v-list-item-title>
            </v-list-item>
            <v-list-item to="/dashboard/account">
                <v-list-item-avatar>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>
                    <span>Account</span>
                </v-list-item-title>
            </v-list-item>
            <v-list-item to="/dashboard/files/my">
                <v-list-item-avatar>
                    <v-icon>mdi-file</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>
                    <span>Files</span>
                </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item @click="logout">
                <v-list-item-avatar>
                    <v-icon>mdi-logout-variant</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>
                    Logout
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
    <vimu-btn class="ml-10" to="/login" v-else>Login</vimu-btn>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
import { $pb, authStore } from "~/store";
import VimuAvatar from "./vimu_avatar.vue";
import VimuBtn from "./vimu_button.vue";

@Component({
    components: {
        VimuBtn,
        VimuAvatar
    }
})
export default class VimuProfileMenu extends Vue {

    @Prop()
    loggedIn!: boolean;

    get avatarSeed() {
        return authStore.avatar
    }

    get username() {
        return authStore.username
    }

    logout() {
        authStore.logout();
        this.$router.push('/')
    }
}
</script>

<style>
.profile-avatar {
    box-shadow: 0 0 0 2px currentColor;
}
</style>