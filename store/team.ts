import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { Team, TeamMember } from '~/models/team';
import { User } from '~/models/user';
import { $pb, notificationStore, teamStore } from '.';

@Module({
    name: 'team',
    stateFactory: true,
    namespaced: true,
})
export default class TeamStore extends VuexModule {
    teams: Team[] = []
    team: Team | null = null;

    @Mutation
    addTeam(team: Team) {
        this.teams.push(team)
    }

    @Mutation
    setTeam(team: Team) {
        this.team = team
    }

    @MutationAction({ mutate: ["teams"] })
    async list() {
        try {
            const response = await $pb.collection('teams').getFullList<Team>(undefined, { sort: 'name', expand: 'owner,team_members(team).user' })
            return { teams: response }
        } catch {
            notificationStore.sendNotification({ title: 'Error listing teams', color: 'error' })
            return { teams: this.teams }
        }
    }

    @MutationAction({ mutate: ["team"] })
    async get(id: string) {
        try {
            const response = await $pb.collection('teams').getOne<Team>(id, { expand: 'owner,team_members(team).user' })
            return { team: response }
        } catch {
            notificationStore.sendNotification({ title: 'Error getting team', color: 'error' })
            return { team: this.team }
        }
    }

    @Action
    async create(teamName: string): Promise<Team | null> {
        try {

            const newTeam: Team = await $pb.collection('teams').create<Team>({ name: teamName, owner: $pb.authStore.model!.id, members: [] }, { expand: "owner,team_members(team).user" })

            return newTeam;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error creating team', color: 'error' })
            return null;
        }
    }

    @Action
    async update(team: Team): Promise<Team | null> {
        try {
            const updatedTeam: Team = await $pb.collection('teams').update(team.id, team, { expand: "owner,team_members(team).user" })

            return updatedTeam
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error updating team', color: 'error' })
            return null
        }
    }

    @Action
    async delete(team: Team): Promise<boolean> {
        try {
            const success: boolean = await $pb.collection('teams').delete(team.id)

            return success
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error deleting team', color: 'error' })
            return false
        }
    }

    @Action
    async updateAvatar(data: { team: Team, avatar: File | Blob }): Promise<Team | null> {
        try {
            const formData = new FormData();
            formData.append("icon", data.avatar);
            const updatedTeam: Team = await $pb.collection('teams').update(data.team.id, formData, { expand: "owner,team_members(team).user" })

            return updatedTeam
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error updating team', color: 'error' })
            return null
        }
    }

    @Action
    async addMember(data: { user: User, team: Team, permission: "view" | "edit" }): Promise<TeamMember | null> {
        try {

            const teamMember: TeamMember = await $pb.collection('team_members').create<TeamMember>({ user: data.user.id, team: data.team.id, permission: data.permission, status: "pending" }, { expand: "user" })

            return teamMember;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error creating team member', color: 'error' })
            return null;
        }
    }

    @Action
    async deleteMember(member: TeamMember): Promise<boolean> {
        try {
            const success = await $pb.collection('team_members').delete(member.id)
            return success;
        } catch (error) {
            notificationStore.sendNotification({ title: 'Error deleting team member', color: 'error' })
            return false;
        }
    }
}
