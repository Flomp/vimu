<template>
    <div class="team-avatar" :style="`height: ${size}px; width: ${size}px`">
        <img :src="src" :width="size" :height="size" style="object-fit: contain;"/>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Team } from "~/models/team";
import { $pb } from "~/store";

@Component({})
export default class TeamAvatar extends Vue {
    @Prop() team!: Team;

    @Prop({default: 48}) readonly size!: number;

    get src() {
        if(this.team.icon && this.team.icon.length) {
            return $pb.getFileUrl(this.team as any, this.team.icon)
        }
        return `https://api.dicebear.com/7.x/initials/svg?seed=${this.team.name}`
    }
}
</script>

<style>
.team-avatar {
    border-radius: 10%;
    overflow: hidden;
    flex-shrink: 0;
}
</style>