<template>
    <div class="d-flex fill-height fill-width justify-center align-center" style="background: #e9f3ff">
        <bunny-balloon class="balloon bunny-balloon" :width="400"></bunny-balloon>
        <carrot-balloon class="balloon carrot-balloon" :width="400"></carrot-balloon>
        <div class="login-form">
            <h3 class="vimu-card-title pb-5">Login</h3>
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

    </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import VimuTextField from "~/components/vimu/vimu_text_field.vue"
import VimuBtn from "~/components/vimu/vimu_button.vue";
import BunnyBalloon from "~/components/vimu/bunny_balloon.vue";
import CarrotBalloon from "~/components/vimu/carrot_balloon.vue";
@Component({
    layout: "default_no_footer",
    components: {
        VimuTextField,
        VimuBtn,
        BunnyBalloon,
        CarrotBalloon
    }
})
export default class LoginPage extends Vue {
}
</script>

<style>
.login-form {
    position: relative;
    border: 3px solid currentColor;
    width: 500px;
    border-radius: 30px;
    padding: 32px;
    background-color: #fff;
    z-index: 0
}

@keyframes updown {
    0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25px);
  }
}

.balloon {
    position: absolute;
}

.carrot-balloon {
    top: 12px;
    right: 0;
    animation: updown 5s ease infinite;
}

.bunny-balloon {
    bottom: 12px;
    left: 0;
    animation: updown 6s ease infinite;

}
</style>