<template>
    <v-sheet class="page">
        <h1 class="vimu-title ml-8 mt-2">Account</h1>
        <account-navigation v-if="$vuetify.breakpoint.smAndDown" :sticky="false"></account-navigation>
        <div class="d-flex">
            <v-container class="px-12">
                <div class="d-flex justify-space-between align-center mt-4">
                    <h2>Profile information</h2>
                    <vimu-btn :disabled="(!usernameChanged && !emailChanged) || !username.length || !email.length"
                        :loading="saveLoading" @click="save">
                        Save
                    </vimu-btn>
                </div>

                <v-form ref="account-form">
                    <v-row class="mt-4 align-center">
                        <v-col cols="12" sm="auto" class="pr-sm-12 d-flex justify-center" style="position: relative">
                            <vimu-avatar :seed="avatarSeed" :size="172"></vimu-avatar>
                            <v-btn color="primary" :loading="seedLoading" :disabled="seedLoading" absolute icon bottom
                                right @click="regenSeed">
                                <v-icon>mdi-cached</v-icon>
                            </v-btn>

                        </v-col>
                        <v-col cols="12" sm="auto"> <span class="font-weight-bold">Email</span>
                            <vimu-text-field class="mb-4" v-model="email" :disabled="true || oauthProvider !== ''"
                                :hideDetails="true">
                                <v-tooltip bottom v-if="verified">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon color="success" v-bind="attrs" v-on="on">
                                            mdi-email-check-outline
                                        </v-icon>
                                    </template>
                                    <span v-if="oauthProvider === ''">Verified</span>
                                    <span v-else>Managed by {{ oauthProvider }}</span>
                                </v-tooltip>
                                <v-tooltip bottom v-else>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon color="error" v-bind="attrs" v-on="on">
                                            mdi-email-remove-outline
                                        </v-icon>
                                    </template>
                                    <span>Not verified</span>
                                </v-tooltip></vimu-text-field>
                            <span class="font-weight-bold">Username</span>
                            <vimu-text-field v-model="username" :hideDetails="true">
                            </vimu-text-field>
                        </v-col>
                    </v-row>
                </v-form>
                <v-divider class="my-10"></v-divider>
                <h2>Email preferences <v-progress-circular indeterminate v-if="$fetchState.pending"></v-progress-circular></h2>
                <v-row v-if="!$fetchState.pending">
                    <v-col cols="12" sm="6">
                        <v-checkbox color="accent" v-model="localEmailSettings.share" @change="updateEmailSettings">
                            <template v-slot:label>
                                <div>
                                    <p class="black--text mb-1">New shared file</p>
                                    <span style="font-size: 15px">Get notified when somone shares a file with you</span>
                                </div>
                            </template>
                        </v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-checkbox color="accent" v-model="localEmailSettings.team" @change="updateEmailSettings">
                            <template v-slot:label>
                                <div>
                                    <p class="black--text mb-1">New Team</p>
                                    <span style="font-size: 15px">Get notified when you are added to a team</span>
                                </div>
                            </template>
                        </v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-checkbox color="accent" v-model="localEmailSettings.changelog" @change="updateEmailSettings">
                            <template v-slot:label>
                                <div>
                                    <p class="black--text mb-1">Changelog</p>
                                    <span style="font-size: 15px">Get updated on new features</span>
                                </div>
                            </template>
                        </v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-checkbox color="accent" v-model="localEmailSettings.marketing" @change="updateEmailSettings">
                            <template v-slot:label>
                                <div>
                                    <p class="black--text mb-1">Marketing</p>
                                    <span style="font-size: 15px">Recieve our newsletter</span>
                                </div>
                            </template>
                        </v-checkbox>
                    </v-col>
                </v-row>
                <v-divider class="my-10"></v-divider>
                <h2>Danger zone</h2>
                <div class="py-8">
                    <vimu-btn :danger="true" @click="deleteConfirmDialog = true">Delete account</vimu-btn>
                </div>
            </v-container>
            <account-navigation v-if="$vuetify.breakpoint.mdAndUp"></account-navigation>

        </div>
        <account-delete-dialog v-model="deleteConfirmDialog" title="Are you sure?"
            text="You are about to permanently delete this score" action="Delete" @confirm="deleteAccount">
        </account-delete-dialog>
    </v-sheet>
</template>
  
<script lang="ts">
import { Component, Ref, Vue } from "nuxt-property-decorator";
import { ClientResponseError } from "pocketbase";
import AccountDeleteDialog from "~/components/dashboard/account/account_delete_dialog.vue";
import AccountNavigation from "~/components/dashboard/account/account_navigation.vue";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import { default_email_settings, EmailSettings } from "~/models/settings";
import { $pb, authStore, notificationStore, settingsStore } from "~/store";
import { generateSeed } from "~/utils/string";


@Component({
    head: {
        title: "Account"
    },
    layout: 'dashboard',
    components: {
        VimuTextField,
        VimuBtn,
        AccountDeleteDialog,
        AccountNavigation
    },
    fetchOnServer: false
})
export default class AccountPageGeneral extends Vue {

    @Ref("account-form")
    form!: HTMLFormElement;
    email: string = ""
    currentEmail: string = this.email;

    username: string = ""
    currentUsername: string = this.username

    saveLoading: boolean = false;
    seedLoading: boolean = false;

    avatarSeed = $pb.authStore.model?.avatar ?? '';

    oauthProvider: string = "";

    deleteConfirmDialog: boolean = false;

    localEmailSettings: EmailSettings = default_email_settings;

    async fetch() {
        const result = await $pb.collection('users').listExternalAuths($pb.authStore.model?.id ?? "", { '$autoCancel': false });
        if (result.length) {
            this.oauthProvider = result[0].provider;
        }
        await settingsStore.getEmailSettings();        

        this.localEmailSettings = JSON.parse(JSON.stringify(settingsStore.emailSettings));

    }

    get emailChanged(): boolean {
        return this.email !== this.currentEmail;
    }

    get usernameChanged(): boolean {
        return this.username !== this.currentUsername;
    }

    get verified() {
        if (this.emailChanged) {
            return false;
        }
        return $pb.authStore.model?.verified ?? false
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
            }

            if (this.emailChanged) {
                notificationStore.sendNotification({ title: "Email changed", subtitle: "A confirmation email has been sent to the new email address", color: 'primary', duration: 7500 })
            } else {
                notificationStore.sendNotification({ title: "Profile saved", color: 'primary' })
            }
            this.initValues();
        } catch (error: any) {
            if (error instanceof ClientResponseError && error.data.data?.username?.message == "The username is invalid or already in use.") {
                notificationStore.sendNotification({ title: "Username already in use", color: 'error' })
            } else if (error instanceof ClientResponseError && error.data.data?.newEmail?.message == "User email already exists.") {
                notificationStore.sendNotification({ title: "Email already in use", color: 'error' })
            } else {
                notificationStore.sendNotification({ title: "An error occurred while saving the profile", color: 'error' })
            }

            return;
        } finally {
            this.saveLoading = false;
        }
    }

    async updateEmailSettings() {
        const updatedEmailSettings = await settingsStore.updateEmailSettings(this.localEmailSettings);

        if(updatedEmailSettings !== null) {
            this.localEmailSettings = updatedEmailSettings;
        }
    }

    async deleteAccount() {
        if (!$pb.authStore.model) {
            return;
        }
        try {
            await $pb.collection('users').delete($pb.authStore.model.id);
            authStore.logout();
            window.location.href = '/';
        } catch {

        }
    }
}
</script>
  
<style>

</style>