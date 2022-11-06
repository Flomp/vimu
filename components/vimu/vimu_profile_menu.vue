<template>
    <v-menu offset-y v-if="loggedIn" nudge-bottom="13" content-class="vimu-menu elevation-0">
        <template v-slot:activator="{ on, attrs }">
            <v-avatar class="profile-avatar" size="48" color="grey lighten-3" v-bind="attrs" v-on="on">
                <img class="pa-1" :src="avatarURL" alt="alt">
            </v-avatar>
        </template>
        <v-list dense>
            <v-list-item to="/dashboard/profile">
                <v-list-item-avatar>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>
                    <span>Profile</span>
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
import { Vue, Component, InjectReactive } from "nuxt-property-decorator";
import { authStore } from "~/store";
import VimuBtn from "./vimu_button.vue";

@Component({
    components: {
        VimuBtn
    }
})
export default class VimuProfileMenu extends Vue {

    @InjectReactive()
    loggedIn!: boolean;

    get avatarURL() {
        return `https://avatars.dicebear.com/api/croodles-neutral/:${this.$pb.authStore.model?.email}.svg`
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