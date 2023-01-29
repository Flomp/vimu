<template>
    <v-avatar class="profile-avatar" :size="size" color="grey lighten-3">
        <v-progress-circular width="2" indeterminate v-if="loading"></v-progress-circular>
        <img :src="avatarURL" alt="alt" v-else>
    </v-avatar>

</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class VimuAvatar extends Vue {
    @Prop() readonly seed!: string;
    @Prop() readonly size!: number;
    @Prop() readonly loading!: boolean;

    get avatarURL() {
        return `https://avatars.dicebear.com/api/croodles/:${this.seed}.svg`
    }
}
</script>

<style>

</style>