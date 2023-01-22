<template>
    <div class="d-flex align-center justify-center fill-height">
        <div class="vimu-card ma-3 pa-8" style="max-width: 600px">
            <h1 class="vimu-title">Welcome to vimu</h1>
            <v-row class="justify-space-around mt-4">
                <v-col class="d-flex flex-column justify-center">
                    <p>First things first: please verify your email address. We sent you an email with
                        instructions. Click the
                        link in the email and return to this page. You will be redirected automatically after a short
                        while.
                    </p>
                    <div>
                        <v-progress-circular indeterminate width="2" size="24"></v-progress-circular>
                        <span class="vimu-text ml-3">Verification pending</span>
                    </div>
                </v-col>
                <v-col class="text-center" v-if="$vuetify.breakpoint.smAndUp">
                    <happy-bunny :width="150"></happy-bunny>
                </v-col>
            </v-row>
            <v-btn class="mt-5" color="grey" text style="float: right" :disabled="resendLoading"
                :loading="resendLoading" @click="resend">Resend Mail</v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import HappyBunny from "~/components/vimu/illustrations/happy_bunny.vue";
import { authStore } from "~/store";

@Component({
    layout: 'default_no_footer',
    components: {
        HappyBunny
    }
})
export default class VerifyPage extends Vue {

    resendLoading: boolean = false;

    timer!: ReturnType<typeof setInterval>;

    mounted() {
        this.timer = setInterval(async () => {
            const verified = await authStore.checkVerification();
            
            if (verified) {
                window.location.href = "/dashboard/files/my"
            }
        }, 5000)
    }

    beforeDestroy() {
        clearInterval(this.timer);
    }
    async resend() {
        this.resendLoading = true;
        await authStore.resendVerificationEmail();
        this.resendLoading = false;
    }
}
</script>

<style>

</style>