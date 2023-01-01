<template>
    <div class="d-flex flex-column fill-height justify-center align-center text-center py-12 space">
        <bunny-space class="astronaut" :width="200" v-if="$vuetify.breakpoint.mdAndUp"></bunny-space>
        <carrot-rocket class="rocket" :width="100" v-if="$vuetify.breakpoint.mdAndUp"></carrot-rocket>
        <cookie-planet class="planet" :width="300" v-if="$vuetify.breakpoint.mdAndUp"></cookie-planet>
        <h1 class="vimu-title">404</h1>
        <h2 class="vimu-subtitle pt-3 pb-4">Uh, oh? How did you get here?</h2>
        <p class="vimu-text" style="max-width: 256px">Looks like you have ventured too far into the unknown.
            You should return home. There are cookies waiting...
        </p>
        <vimu-btn to="/">Home</vimu-btn>

    </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import BunnySpace from "./illustrations/bunny_space.vue";
import CarrotRocket from "./illustrations/carrot_rocket.vue";
import CookiePlanet from "./illustrations/cookie_planet.vue";
import VimuBtn from "./vimu_button.vue";

@Component({
    components: {
        VimuBtn,
        BunnySpace,
        CarrotRocket,
        CookiePlanet
    }
})
export default class Error404 extends Vue {
}
</script>

<style>
@keyframes float {

    0% {
        bottom: calc(100% - 256px);
    }

    50% {
        bottom: 0%
    }

    100% {
        transform: rotate(360deg);
        bottom: calc(100% - 256px);
    }
}

@keyframes rocket {

    0%, 40% {
        top: 100%;
        left: 20%;
    }

    60%, 100% {
        left: 70%;
        top: -300px
    }
}

.space {
    /* background-color: #161414; */
} 

.astronaut {
    position: absolute;
    right: 15%;
    animation: float 10s linear 0s infinite;
}

.rocket {
    position: absolute;
    transform: rotate(45deg);
    animation: rocket 8s ease-in 0s infinite;
}

.planet {
    position: absolute;
    left: 10%;
    top:10%
}
</style>