<template>
    <v-dialog v-model="dialog" persistent max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title>
                Invite to {{ team.name }}
            </v-card-title>
            <v-card-text>
                <div class="d-flex">
                    <vimu-text-field class="mr-4" v-model="user" placeholder="Username" :hide-details="true">
                    </vimu-text-field>
                    <vimu-select :items="inviteOptions" :hide-details="true" v-model="selectedInviteOption"
                        style="flex: 0 1 172px">
                    </vimu-select>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <vimu-btn :primary="true" @click="invite" :loading="inviteLoading">Invite</vimu-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "nuxt-property-decorator";
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VSpacer } from "vuetify/lib";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuSelect from "~/components/vimu/vimu_select.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import { Team, TeamMember } from "~/models/team";
import { User } from "~/models/user";
import { $pb, notificationStore, teamStore } from "~/store";
import team from "~/store/team";

@Component({
    components: {
        VimuSelect,
        VimuTextField,
        VimuBtn
    }
})
export default class TeamInviteDialog extends Vue {
    @VModel() dialog!: boolean;

    @Prop() team!: Team;

    user = "";

    inviteOptions = [
        { text: "can view", value: "view" },
        { text: "can edit", value: "edit" },
    ]

    selectedInviteOption = this.inviteOptions[0].value;

    inviteLoading = false;

    async invite() {
        this.inviteLoading = true;
        const users = (await $pb.collection('users').getList<User>(1, 1, { filter: `username="${this.user}"` })).items;
        if (users.length != 1) {
            notificationStore.sendNotification({ title: 'User could not be found', color: 'error' })
            this.inviteLoading = false;
            return;
        }

        const user = users[0];

        const teamMember = await teamStore.addMember({ user: user, team: this.team!, permission: this.selectedInviteOption as ("view" | "edit") });
        if(teamMember) {
            await teamStore.get(this.team.id);
        }
        this.inviteLoading = false;
        this.dialog = false;
    }
}
</script>

<style>

</style>