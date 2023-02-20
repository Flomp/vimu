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
            <tr v-for="member in localTeam.expand['team_members(team)']" :key="member.id">
                <td :class="{ 'inactive-row': member.status == 'pending' }">
                    <vimu-avatar :seed="member.expand.user.avatar" :size="32" class="mr-4"></vimu-avatar>
                    {{ member.expand.user.username }}
                </td>
                <td :class="{ 'inactive-row': member.status == 'pending' }">
                    {{ member.status }}
                </td>
                <td>
                    <span v-if="readonly">can {{ member.permission }}</span>
                    <vimu-select :items="inviteOptions" :hide-details="true" :dense="true" v-model="member.permission"
                        style="max-width: 140px" @change="update($event, member)" v-else>
                    </vimu-select>
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
import VimuSelect from "~/components/vimu/vimu_select.vue";
import { Team, TeamMember } from "~/models/team";

@Component({
    components: {
        VimuAvatar,
        VimuSelect
    }
})
export default class TeamMemberTable extends Vue {
    @Prop() team!: Team;
    @Prop() readonly!: boolean;

    localTeam: Team = JSON.parse(JSON.stringify(this.team));

    inviteOptions = [
        { text: "can view", value: "view" },
        { text: "can edit", value: "edit" },
    ]

    selectedInviteOption = this.inviteOptions[0].value;


    @Watch("team")
    onTeamChange(value: Team) {
        this.localTeam = JSON.parse(JSON.stringify(value));
    }

    @Emit()
    remove(member: TeamMember) {
        return member;
    }

    @Emit()
    update(value: "view" | "edit", member: TeamMember) {        
        return {permission: value, member: member}
    }
}
</script>

<style>
.inactive-row {
    opacity: 0.5;
}
</style>