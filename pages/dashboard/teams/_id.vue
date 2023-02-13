<template>
    <v-sheet class="page" v-if="team">
        <v-container>
            <div class="d-flex align-center">
                <team-avatar :team="team" :size="128"></team-avatar>
                <h1 class="vimu-title ml-8">{{ team.name }}</h1>
                <v-spacer></v-spacer>
                <vimu-btn class="mr-4" @click="showInviteDialog = true">Invite</vimu-btn>
                <v-menu offset-y content-class="vimu-menu elevation-0">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list dense>
                        <v-list-item @click="showRenameDialog = true">
                            <v-list-item-title>Rename team</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="openFileDialog">
                            <input id="fileInput" type="file" accept="image/png, image/jpeg, image/svg+xml"
                                style="display:none;" @change="uploadAvatar" />
                            <v-list-item-title>Change icon</v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item @click="showTeamConfirmDialog = true">
                            <v-list-item-title>Delete team</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <div class="mt-5">
                <vimu-tabs v-model="activeTab" :tabs="tabs"></vimu-tabs>
            </div>
            <team-member-table :team="team" @remove="handleRemove" v-if="activeTab == 1"></team-member-table>

        </v-container>
        <file-rename-dialog v-model="showRenameDialog" :filename="team.name" renameable="team"
            @save="renameTeam"></file-rename-dialog>
        <confirm-dialog v-model="showTeamConfirmDialog" title="Delete team"
            text="Do you really want to delete this team? You cannot undo this action." action="Delete"
            @confirm="deleteTeam"></confirm-dialog>
        <confirm-dialog v-model="showMemberConfirmDialog" title="Remove member"
            text="Do you really want to remove this member from the team?" action="Remove"
            @confirm="removeMember"></confirm-dialog>
        <team-invite-dialog v-model="showInviteDialog" :team="team"></team-invite-dialog>
    </v-sheet>
</template>

<script lang="ts">
import { Context } from "@nuxt/types";
import { Vue, Component } from "nuxt-property-decorator";
import ConfirmDialog from "~/components/dashboard/confirm_dialog.vue";
import FileRenameDialog from "~/components/dashboard/file/file_rename_dialog.vue";
import TeamAvatar from "~/components/dashboard/team/team_avatar.vue";
import TeamInviteDialog from "~/components/dashboard/team/team_invite_dialog.vue";
import TeamMemberTable from "~/components/dashboard/team/team_member_table.vue";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuTabs from "~/components/vimu/vimu_tabs.vue";
import { TeamMember } from "~/models/team";
import { teamStore } from "~/store";

@Component({
    head: {
        title: "Teams"
    },
    layout: 'dashboard',
    components: {
        TeamAvatar,
        VimuBtn,
        FileRenameDialog,
        ConfirmDialog,
        VimuTabs,
        TeamMemberTable,
        TeamInviteDialog
    }
})
export default class TeamPage extends Vue {

    showRenameDialog: boolean = false;
    showTeamConfirmDialog: boolean = false;
    showMemberConfirmDialog: boolean = false;

    showInviteDialog: boolean = false;

    tabs: string[] = ["Files", "Members"]
    activeTab = 0;

    teamMemberToBeRemoved: TeamMember | null = null;


    get team() {
        return teamStore.team;
    }

    validate({ params }: Context) {
        return params.id !== undefined;
    }

    async fetch() {
        if (!teamStore.team) {
            await teamStore.get(this.$route.params.id);
        }
    }

    async renameTeam(name: string) {
        const team = JSON.parse(JSON.stringify(this.team))
        if (team) {
            team.name = name;
            const updatedTeam = await teamStore.update(team);
            if (updatedTeam) {
                teamStore.setTeam(updatedTeam);
            }
            teamStore.list();
        }
    }

    async deleteTeam() {
        const success = await teamStore.delete(this.team!);
        await teamStore.list();
        if (success) {
            this.$router.push('/dashboard/files/my')
        }
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
            if (updatedTeam) {
                teamStore.setTeam(updatedTeam);
            }
            teamStore.list();

        }
    }

    handleRemove(member: TeamMember) {
        this.teamMemberToBeRemoved = member;
        this.showMemberConfirmDialog = true;
    }

    async removeMember() {
        this.showMemberConfirmDialog = false;
        if (this.teamMemberToBeRemoved === null) {
            return;
        }
        const success = await teamStore.deleteMember(this.teamMemberToBeRemoved);
        if (success) {
            await teamStore.get(this.team!.id);
        }
        this.teamMemberToBeRemoved = null;
    }
}
</script>

<style>

</style>