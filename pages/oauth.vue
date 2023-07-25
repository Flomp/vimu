<template>
    <v-container class="d-flex flex-column align-center justify-center fill-height" style="padding: 92px">
        <bunny class="pb-4 bunny bounce" :width="200"></bunny>
        <h1 class="vimu-subtitle">Authenticating...</h1>

    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Bunny from "~/components/vimu/illustrations/bunny.vue";
import { authStore } from "~/store";

@Component({
    head: {
        title: "OAuth"
    },
    components: { Bunny },

    fetchOnServer: false
})
export default class OAuthPage extends Vue {
    async fetch() {
        const params = this.$route.query;

        const provider = JSON.parse(localStorage.getItem('provider') ?? "")

        if (!provider || provider.state !== params.state) {
            throw "State parameters don't match.";
        }

        const success: boolean = await authStore.oauth(provider);
        if (success) {
            this.$router.push(authStore.redirectPath)
        }
    }
}
</script>

<style scoped>
.bunny {
    animation-duration: 2s;
    animation-iteration-count: infinite;
    transform-origin: bottom;
}

.bounce {
    animation-name: bounce;
    animation-timing-function: ease;
}

@keyframes bounce {
    0% {
        transform: scale(1, 1) translateY(0);
    }

    10% {
        transform: scale(1.1, .9) translateY(0);
    }

    30% {
        transform: scale(.9, 1.1) translateY(-100px);
    }

    50% {
        transform: scale(1, 1) translateY(0);
    }

    100% {
        transform: scale(1, 1) translateY(0);
    }
}
</style>