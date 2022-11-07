<template>
    <v-avatar class="profile-avatar" :size="size" color="grey lighten-3">
        <img class="pa-1" :src="avatarURL" alt="alt">
    </v-avatar>

</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class VimuAvatar extends Vue {
    @Prop() readonly seed!: string;
    @Prop() readonly size!: number;

    get avatarURL() {
        return `https://avatars.dicebear.com/api/croodles/:${this.seed}.svg`
    }
}
</script>

<style>

</style>