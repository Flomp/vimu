<template>
    <v-sheet class="page">
        <v-container class="pt-0">
            <h1 class="vimu-title ml-8 mt-2 mb-12">Create Team</h1>

            <div class="d-flex justify-center mx-12 mb-12 align-center grey--text" style="gap: 48px"
                v-if="$vuetify.breakpoint.smAndUp">
                <span class="pa-4" :class="{ 'active-step': currentStep == 0 }">Name your team</span>
                <v-divider></v-divider>
                <span class="pa-4" :class="{ 'active-step': currentStep == 1 }">Invite members</span>
                <v-divider></v-divider>
                <span class="pa-4" :class="{ 'active-step': currentStep == 2 }">Finish setup</span>
            </div>
            <div class="text-center" style="max-width: 400px; margin: auto;" v-if="currentStep == 0">
                <h2 class="mb-4">Team name</h2>
                <vimu-text-field v-model="teamName"></vimu-text-field>
                <vimu-btn :primary="true" :x-large="true" :loading="createLoading" :disabled="teamName.length == 0"
                    @click="createTeam">Create Team</vimu-btn>
            </div>
            <div v-else-if="currentStep == 1 && team != null">
                <div class="d-flex my-8 align-center flex-wrap" style="gap: 16px">
                    <user-search @add="addMember" :loading="addLoading" style="max-width: 400px"></user-search>
                    <vimu-select :items="inviteOptions" :hide-details="true" v-model="selectedInviteOption"
                        style="flex: 0 1 172px">
                    </vimu-select>
                    <v-spacer></v-spacer>
                    <vimu-btn @click="currentStep = 2" :x-large="true">Continue</vimu-btn>
                </div>
                <team-member-table :team="team" @remove="handleRemove" @update="updateMember"></team-member-table>
            </div>
            <div v-else-if="currentStep == 2 && team != null">
                <v-row>
                    <v-col class="mr-12" cols="auto" style="max-width: 256px">
                        <v-hover>
                            <template v-slot:default="{ hover }">
                                <div style="position:relative; border-radius: 10%;">
                                    <team-avatar :team="team" :size="128"></team-avatar>
                                    <input id="fileInput" type="file" accept="image/png, image/jpeg, image/svg+xml"
                                        style="display:none;" @change="uploadAvatar" />
                                    <v-fade-transition>
                                        <v-overlay v-if="hover" absolute color="#000000">
                                            <vimu-btn @click="openFileDialog">Edit</vimu-btn>
                                        </v-overlay>
                                    </v-fade-transition>
                                </div>
                            </template>
                        </v-hover>
                        <h1 style="word-wrap:break-word">{{ team.name }}</h1>

                    </v-col>
                    <v-col>
                        <div class="d-flex">
                            <vimu-btn class="mr-4" :x-large="true" @click="currentStep = 1">Back</vimu-btn>
                            <vimu-btn :to="`/dashboard/teams/${team.id}`" :x-large="true" :primary="true">Finish</vimu-btn>
                        </div>
                        <team-member-table :team="team" :readonly="true"></team-member-table>
                    </v-col>

                </v-row>
            </div>
        </v-container>
        <confirm-dialog v-model="showConfirmDialog" title="Remove member"
            text="Do you really want to remove this member from the team?" action="Remove"
            @confirm="removeMember"></confirm-dialog>
    </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import { Team, TeamMember } from "~/models/team";
import { $pb, notificationStore, teamStore } from "~/store";
import TeamMemberTable from "~/components/dashboard/team/team_member_table.vue";
import UserSearch from "~/components/dashboard/user_search.vue";
import { User } from "~/models/user";
import TeamAvatar from "~/components/dashboard/team/team_avatar.vue";
import ConfirmDialog from "~/components/dashboard/confirm_dialog.vue";

@Component({
    head: {
        title: "Teams"
    },
    layout: 'dashboard',
    components: {
        VimuTextField,
        VimuBtn,
        TeamMemberTable,
        UserSearch,
        TeamAvatar,
        ConfirmDialog
    }
})
export default class CreateTeamPage extends Vue {

    currentStep: number = 0;
    teamName = "";
    createLoading: boolean = false;

    team: Team | null = null;

    inviteOptions = [
        { text: "can view", value: "view" },
        { text: "can edit", value: "edit" },
    ]

    selectedInviteOption = this.inviteOptions[0].value;
    addLoading = false;
    showConfirmDialog = false;

    teamMemberToBeRemoved: TeamMember | null = null;

    async createTeam() {
        if (!this.teamName.length) {
            return;
        }
        this.createLoading = true;
        const team = await teamStore.create(this.teamName)
        await teamStore.list();
        this.createLoading = false;
        if (team != null) {
            this.team = team;
            this.team.expand['team_members(team)'] = [];
            this.currentStep = 1
        }
    }

    async addMember(query: string) {
        try {
            this.addLoading = true;

            const users = (await $pb.collection('users').getList<User>(1, 1, { filter: `username="${query}"` })).items;
            if (users.length != 1) {
                notificationStore.sendNotification({ title: 'User could not be found', color: 'error' })
                return;
            }
            const user = users[0];

            if (this.team?.expand["team_members(team)"]?.some(m => m.user === user.id)) {
                notificationStore.sendNotification({ title: 'Already a team member', color: 'error' })
                return;
            }

            const teamMember = await teamStore.addMember({ user: user, team: this.team!, permission: this.selectedInviteOption as ("view" | "edit") });
            if (teamMember != null) {
                const members: TeamMember[] = JSON.parse(JSON.stringify(this.team?.expand['team_members(team)']));

                members.push(teamMember);
                Vue.set(this.team!, "expand", { owner: this.team?.expand.owner, 'team_members(team)': members });
            }

        } catch {
            notificationStore.sendNotification({ title: 'Error inviting member', color: 'error' })
        } finally {
            this.addLoading = false;
        }
    }

    async updateMember(data: { permission: "view" | "edit", member: TeamMember }) {
        const memberClone = JSON.parse(JSON.stringify(data.member));
        memberClone.permission = data.permission
        const success = await teamStore.updateMember(memberClone);
        if (success) {
            await teamStore.get(this.team!.id);
        }
        this.teamMemberToBeRemoved = null;
    }

    handleRemove(member: TeamMember) {
        this.teamMemberToBeRemoved = member;
        this.showConfirmDialog = true;
    }

    async removeMember() {
        this.showConfirmDialog = false;
        if (this.teamMemberToBeRemoved === null) {
            return;
        }
        const success = await teamStore.deleteMember(this.teamMemberToBeRemoved);
        if (success) {
            let members: TeamMember[] = JSON.parse(JSON.stringify(this.team?.expand['team_members(team)']));
            members = members.filter(m => m.id != this.teamMemberToBeRemoved!.id)
            Vue.set(this.team!, "expand", { owner: this.team?.expand.owner, 'team_members(team)': members });
        }
        this.teamMemberToBeRemoved = null;
    }

    openFileDialog() {
        document.getElementById('fileInput')?.click()
    }

    async uploadAvatar(e: Event) {
        if (!this.team) {
            return;
        }
        const files = (e.target as HTMLInputElement).files;
        if (files && files.length) {
            const updatedTeam = await teamStore.updateAvatar({ team: this.team, avatar: files[0] })
            if (updatedTeam !== null) {
                this.team.icon = updatedTeam.icon;
            }
        }
    }
}
</script>

<style>
.active-step {
    background: #e2e2e2;
    border-radius: 10px;
    color: black !important;
}

.upload-avatar {
    cursor: pointer;
}
</style>