<template>
    <v-container class="d-flex flex-column align-center justify-center fill-height" style="padding: 92px">
        <bunny class="pb-4 bunny bounce" :width="200"></bunny>
        <h1 class="vimu-subtitle">Checking invitation...</h1>

    </v-container>
</template>

<script lang="ts">
import { Context } from "@nuxt/types";
import { Vue, Component } from "nuxt-property-decorator";
import Bunny from "~/components/vimu/illustrations/bunny.vue";
import { TeamMember } from "~/models/team";
import { notificationStore, teamStore } from "~/store";

@Component({
    fetchOnServer: false,
    components: {
        Bunny
    }
})
export default class TeamAcceptPage extends Vue {


    validate({ query }: Context) {
        return query.team_id !== undefined;
    }

    async fetch() {
        const teamId = this.$route.query.team_id;
        if (!teamId || Array.isArray(teamId)) {
            return;
        }
        const member: TeamMember | null = await teamStore.acceptInvite(teamId);

        if (member) {
            this.$router.push('/dashboard/teams/' + member.team);
        } else {
            notificationStore.sendNotification({ title: "Invition invalid or already accepted", color: "error" })
            setTimeout(() => this.$router.push('/dashboard/files/my'), 4000)
            
        }
    }
}
</script>

<style>
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
