<template>
    <v-sheet class="main">
        <v-container>
            <span class="vimu-title">Account</span>
            <v-row class="pt-10 align-center">
                <v-col cols="12" sm="auto" class="pr-sm-12 d-flex justify-center">
                    <vimu-avatar :seed="avatarSeed" :size="172"></vimu-avatar>
                </v-col>
                <v-col cols="12" sm="6">
                    <div class="py-5" style="max-width: 400px">
                        <span class="font-weight-bold">Name</span>
                        <vimu-text-field v-model="name"></vimu-text-field>
                        <span class="font-weight-bold">Email</span>
                        <vimu-text-field v-model="email"></vimu-text-field>
                    </div>
                    <vimu-btn :disabled="!nameChanged && !emailChanged" :loading="saveLoading" @click="save">Save
                    </vimu-btn>
                </v-col>
            </v-row>


        </v-container>
    </v-sheet>
</template>
  
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import { notificationStore } from "~/store";
@Component({
    layout: 'dashboard',
    components: {
        VimuTextField,
        VimuBtn
    },
})
export default class AccountPage extends Vue {
    email: string = ""
    currentEmail: string = this.email;

    name: string = ""
    currentName: string = this.name

    saveLoading: boolean = false;

    get emailChanged(): boolean {
        return this.email !== this.currentEmail;
    }

    get nameChanged(): boolean {
        return this.name !== this.currentName;
    }

    get avatarSeed() {
        return this.$pb.authStore.model?.email ?? '';
    }
    mounted() {
        this.initValues();
    }


    initValues() {
        this.email = this.$pb.authStore.model?.email
        this.currentEmail = this.email;

        this.name = this.$pb.authStore.model?.name
        this.currentName = this.name
    }

    async save() {
        if (!this.$pb.authStore.model) {
            return;
        }
        this.saveLoading = true;
        try {
            if (this.emailChanged) {
                await this.$pb.collection('users').requestEmailChange(this.email);
            }
            await this.$pb.collection('users').update(this.$pb.authStore.model.id, { name: this.name });
        } catch (error) {
            notificationStore.sendNotification({ title: "An error occurred while saveing the profile", color: 'error' })
            return;
        }
        notificationStore.sendNotification({ title: "Profile saved", color: 'primary' })

        this.initValues();
        this.saveLoading = false;

    }
}
</script>
  
<style>

</style>