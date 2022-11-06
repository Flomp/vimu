<template>
    <v-row class="fill-height fill-width justify-center align-center ma-0" style="overflow: hidden;">
        <v-col class="fill-height sky" v-if="!$vuetify.breakpoint.mobile">
            <cloud-1 class="cloud cloud-1" :width="200"></cloud-1>
            <cloud-2 class="cloud cloud-2" :width="250"></cloud-2>
            <cloud-3 class="cloud cloud-3" :width="300"></cloud-3>
            <bunny-balloon class="balloon bunny-balloon" :width="400"></bunny-balloon>
            <carrot-balloon class="balloon carrot-balloon" :width="400"></carrot-balloon>
        </v-col>
        <v-col>
            <transition name="bounce" mode="out-in">
                <login-form @toggle="showSignup = true" :loading="loginLoading" @submit="loginSubmit"
                    v-if="!showSignup"></login-form>
                <signup-form @toggle="showSignup = false" :loading="signupLoading" @submit="signupSubmit" v-else>
                </signup-form>
            </transition>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import BunnyBalloon from "~/components/vimu/bunny_balloon.vue";
import CarrotBalloon from "~/components/vimu/carrot_balloon.vue";
import Cloud1 from "~/components/vimu/cloud1.vue";
import Cloud2 from "~/components/vimu/cloud2.vue";
import Cloud3 from "~/components/vimu/cloud3.vue";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import LoginForm from "~/components/forms/login_form.vue";
import SignupForm from "~/components/forms/signup_form.vue";
import { authStore } from "~/store";

@Component({
    layout: "default_no_footer",
    components: {
        LoginForm,
        SignupForm,
        VimuTextField,
        VimuBtn,
        BunnyBalloon,
        CarrotBalloon,
        Cloud1,
        Cloud2,
        Cloud3
    }
})
export default class LoginPage extends Vue {
    showSignup: boolean = false;

    signupLoading: boolean = false;
    loginLoading: boolean = false;

    async signupSubmit(data: { email: string, password: string, passwordConfirm: string }) {
        this.signupLoading = true;
        const success = await authStore.signup(data);

        if (success) {
            this.$router.push('/')
        }
        this.signupLoading = false;
    }

    async loginSubmit(data: { email: string, password: string }) {
        this.loginLoading = true;

        const success: boolean = await authStore.login(data)
        if (success) {
            this.$router.push('/dashboard/files')
        }
        this.loginLoading = false;
    }
}
</script>

<style>
@keyframes up {
    0% {
        transform: translateY(100%);
    }

    100% {
        transform: translateY(-25px);
    }
}

@keyframes updown {

    0%,
    100% {
        transform: translateY(-25px);
    }

    50% {
        transform: translateY(0);
    }
}

.sky {
    position: relative;
}

.balloon {
    position: absolute;
}

.carrot-balloon {
    top: 37px;
    right: 0;
    animation: up 12s ease, updown 7s ease 12s infinite;
}

.bunny-balloon {
    bottom: 32px;
    left: 0;
    animation: up 7s ease, updown 5s ease 7s infinite;

}

.cloud {
    position: absolute;
}

.cloud-1 {
    left: 96px;
    top: 64px
}

.cloud-2 {
    right: 96px;
    bottom: 128px
}

.cloud-3 {
    left: 128px;
    bottom: 312px
}

.bounce-enter-active {
    animation: bounce-in .5s;
}

.bounce-leave-active {
    animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}
</style>