<template>
    <v-sheet class="main">
        <v-container>
            <span class="vimu-title">Account</span>
            <v-form ref="account-form">
                <v-row class="pt-10 align-center">
                    <v-col cols="12" sm="auto" class="pr-sm-12 d-flex justify-center" style="position: relative">
                        <vimu-avatar :seed="avatarSeed" :size="172"></vimu-avatar>
                        <v-btn color="primary" :loading="seedLoading" :disabled="seedLoading" absolute icon bottom right
                            @click="regenSeed">
                            <v-icon>mdi-cached</v-icon>
                        </v-btn>

                    </v-col>
                    <v-col cols="12" sm="6">
                        <div class="py-5" style="max-width: 400px">
                            <span class="font-weight-bold">Username</span>
                            <vimu-text-field v-model="username" :rules="usernameRules">
                            </vimu-text-field>
                            <span class="font-weight-bold">Email</span>
                            <vimu-text-field v-model="email"></vimu-text-field>
                        </div>
                        <vimu-btn :disabled="(!usernameChanged && !emailChanged) || !username.length || !email.length"
                            :loading="saveLoading" @click="save">
                            Save
                        </vimu-btn>
                    </v-col>
                </v-row>
            </v-form>

        </v-container>
    </v-sheet>
</template>
  
<script lang="ts">
import { Vue, Component, Ref, Watch } from "nuxt-property-decorator";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import { $pb, authStore, notificationStore } from "~/store";
import { ClientResponseError } from "pocketbase";
import { required } from "~/utils/verification_rules";
import { generateSeed } from "~/utils/string";
@Component({
    layout: 'dashboard',
    components: {
        VimuTextField,
        VimuBtn
    },
})
export default class AccountPage extends Vue {

    @Ref("account-form")
    form!: HTMLFormElement;
    email: string = ""
    currentEmail: string = this.email;

    username: string = ""
    currentUsername: string = this.username

    saveLoading: boolean = false;
    seedLoading: boolean = false;

    avatarSeed = $pb.authStore.model?.avatar ?? '';

    usernameRules = [
        required,
    ]

    get emailChanged(): boolean {
        return this.email !== this.currentEmail;
    }

    get usernameChanged(): boolean {
        return this.username !== this.currentUsername;
    }



    mounted() {
        this.initValues();
    }


    initValues() {
        this.email = $pb.authStore.model?.email
        this.currentEmail = this.email;

        this.username = $pb.authStore.model?.username
        this.currentUsername = this.username
    }

    async regenSeed() {
        if (!$pb.authStore.model) {
            return;
        }
        this.seedLoading = true;
        const newSeed = generateSeed();
        await $pb.collection('users').update($pb.authStore.model.id, { avatar: newSeed });
        this.avatarSeed = $pb.authStore.model.avatar
        authStore.setAvatar(this.avatarSeed);

        this.seedLoading = false;
    }

    async save() {
        if (!$pb.authStore.model) {
            return;
        }
        this.saveLoading = true;
        try {
            if (this.emailChanged && this.email.length) {
                await $pb.collection('users').requestEmailChange(this.email);
            }
            if (this.usernameChanged && this.username.length) {
                await $pb.collection('users').update($pb.authStore.model.id, { username: this.username });
                authStore.setUsername(this.username);
            }
            notificationStore.sendNotification({ title: "Profile saved", color: 'primary' })
            this.initValues();
        } catch (error) {
            if (error instanceof ClientResponseError && error.data.data?.username?.message == "The username is invalid or already in use.") {
                notificationStore.sendNotification({ title: "Username already in use", color: 'error' })
            } else {
                notificationStore.sendNotification({ title: "An error occurred while saveing the profile", color: 'error' })
            }

            return;
        } finally {
            this.saveLoading = false;
        }


    }
}
</script>
  
<style>

</style>