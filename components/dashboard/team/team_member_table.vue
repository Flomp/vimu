<template>
    <v-simple-table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Permissions</th>
                <th v-if="!readonly"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <vimu-avatar :seed="team.expand.owner.avatar" :size="32" class="mr-4"></vimu-avatar>
                    {{ team.expand.owner.username }} (You)
                </td>
                <td>
                    active
                </td>
                <td>
                    owner
                </td>
                <td></td>
            </tr>
            <tr v-for="member in team.expand['team_members(team)']" :key="member.id">
                <td>
                    <vimu-avatar :seed="member.expand.user.avatar" :size="32" class="mr-4"></vimu-avatar>
                    {{ member.expand.user.username }}
                </td>
                <td>
                    {{ member.status }}
                </td>
                <td>
                    can {{ member.permission }}
                </td>
                <td v-if="!readonly">
                    <v-btn icon @click="remove(member)"><v-icon>mdi-close</v-icon></v-btn>
                </td>
            </tr>
        </tbody>
    </v-simple-table>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "nuxt-property-decorator";
import VimuAvatar from "~/components/vimu/vimu_avatar.vue";
import { Team, TeamMember } from "~/models/team";

@Component({
    components: {
        VimuAvatar,
    }
})
export default class TeamMemberTable extends Vue {
    @Prop() team!: Team;
    @Prop() readonly!: boolean;

    @Emit()
    remove(member: TeamMember) {
        return member;
    }
}
</script>

<style>

</style>