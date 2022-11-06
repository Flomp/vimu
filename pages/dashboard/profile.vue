<template>
    <v-sheet class="main">
        <v-container>
            <span class="vimu-title">Profile</span>
            <div class="py-5" style="max-width: 400px">
                <span class="font-weight-bold">Email</span>
                <vimu-text-field v-model="email"></vimu-text-field>
                <span class="font-weight-bold">Name</span>
                <vimu-text-field v-model="name"></vimu-text-field>
            </div>
            <vimu-btn :disabled="!nameChanged && !emailChanged" :loading="saveLoading" @click="save">Save</vimu-btn>

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
export default class ProfilePage extends Vue {
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