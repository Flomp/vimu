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
            <div class="login-form">
                <h3 class="login-form-title pb-5">Login</h3>
                <span class="font-weight-bold">Username</span>
                <vimu-text-field></vimu-text-field>
                <span class="font-weight-bold">Password</span>
                <vimu-text-field type="password"></vimu-text-field>
                <vimu-btn class="fill-width" :primary="true" :large="true">Login</vimu-btn>
                <div class="py-5">
                    <span>Don't have an Account?</span>
                    <nuxt-link to="/">Signup</nuxt-link>
                </div>
                <div class="d-flex align-center">
                    <v-divider></v-divider>
                    <span class="px-4 vimu-text">or</span>
                    <v-divider></v-divider>
                </div>
                <vimu-btn class="fill-width mt-6">Sign in with Google</vimu-btn>
            </div>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import VimuTextField from "~/components/vimu/vimu_text_field.vue"
import VimuBtn from "~/components/vimu/vimu_button.vue";
import BunnyBalloon from "~/components/vimu/bunny_balloon.vue";
import CarrotBalloon from "~/components/vimu/carrot_balloon.vue";
import Cloud1 from "~/components/vimu/cloud1.vue";
import Cloud2 from "~/components/vimu/cloud2.vue";
import Cloud3 from "~/components/vimu/cloud3.vue";

@Component({
    layout: "default_no_footer",
    components: {
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
}
</script>

<style>
.login-form {
    position: relative;
    border: 3px solid currentColor;
    max-width: 500px;
    border-radius: 30px;
    padding: 32px;
    background-color: #fff;
    z-index: 0;
    margin: 0 auto
}

.login-form-title {
    font-size: 2.1rem;
    font-weight: 700;
}

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
</style>