<template>
    <v-row class="d-flex fill-height align-center  justify-center py-12">
        <v-col cols="6" class="text-center pr-12">
            <h1 class="vimu-title">500</h1>
            <h2 class="vimu-subtitle pt-3 pb-4">Oof! Something went wrong...</h2>
            <p class="vimu-text" style="max-width: 256px; margin: 0 auto 16px auto">That's on us. We are surely already
                trying to fix the issue.
                Please try again later.
            </p>
            <vimu-btn to="/">Home</vimu-btn>
        </v-col>
        <v-col class="pl-12" v-if="$vuetify.breakpoint.mdAndUp" style="position: relative;">
            <bunny-lab class="bunny bunny-lab" :width="300"></bunny-lab>
            <bunny-error class="bunny bunny-error" :width="400"></bunny-error>
            <plume-explosion class="explosion" :width="800"></plume-explosion>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import BunnyError from "./illustrations/bunny_error.vue";
import BunnyLab from "./illustrations/bunny_lab.vue";
import PlumeExplosion from "./illustrations/plume_explosion.vue";
import VimuBtn from "./vimu_button.vue";

@Component({
    components: {
        VimuBtn,
        BunnyError,
        BunnyLab,
        PlumeExplosion
    }
})
export default class Error500 extends Vue {
}
</script>

<style scoped>
@keyframes explosion {

    0% {
        opacity: 1;
        transform: scale(0);
    }

    5% {
        opacity: 1;
        transform: scale(0.85);
    }

    60% {
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}

@keyframes hide {
    to {
        visibility: hidden;
    }
}

@keyframes show {
    to {
        visibility: visible;
    }
}

.bunny {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.bunny-lab {
    animation: hide 0.1s linear 4.8s forwards;
}

.bunny-error {
    left: -38px;

    visibility: hidden;
    animation: show 0.1s linear 4.8s forwards;
}

.explosion {
    position: absolute;
    bottom: -400px;
    left: -90px;
    transform: scale(0);
    animation: explosion 5s cubic-bezier(0.2, 0.5, 0.3, 1) 4s forwards;
}
</style>