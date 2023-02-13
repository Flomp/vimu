import { User } from "./user";

interface Team {
    id: string;
    name: string;
    owner: string;
    icon?: string;
    expand: {
        owner: User,
        'team_members(team)': TeamMember[]
    }
}

interface TeamMember {
    id: string,
    team: string,
    user: string,
    permission: "view" | "edit"
    status: "pending" | "active"
    expand: {
        user: User
    }
}

export { Team, TeamMember }