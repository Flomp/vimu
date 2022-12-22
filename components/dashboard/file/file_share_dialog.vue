<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                Share file
            </v-card-title>
            <v-card-text class="black--text pb-0">
                <div class="file-share-link d-flex align-center justify-space-around pa-3" v-if="file">
                    <span>https://vimu.app/editor/{{ file.id }}</span>
                    <v-btn color="primary" icon @click="copy">
                        <v-icon>mdi-content-copy</v-icon>
                    </v-btn>
                </div>
                <div class="d-flex align-center">
                    <span class="mr-4">Anyone with the link can view</span>
                    <v-switch v-model="publicFile" inset></v-switch>
                </div>
                <v-row>
                    <v-col cols="12" sm="8">
                        <user-search @add="addShare" :loading="addLoading"></user-search>

                    </v-col>
                    <v-col cols="12" sm="4">
                        <vimu-select :items="shareOptions" :hide-details="true" v-model="selectedShareOption">
                        </vimu-select>
                    </v-col>
                </v-row>
                <v-list v-if="file && file.expand && file.expand.collaborators">
                    <file-share-card :fileShare="s" :loading="removeLoading(s.id)" v-for="s in file.expand.collaborators"
                        :key="s.id" @remove="removeShare">

                    </file-share-card>
                </v-list>
                <div class="pb-3" v-else></div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <vimu-btn @click="dialog = false">Close</vimu-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "nuxt-property-decorator";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuSelect from "~/components/vimu/vimu_select.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import { File, FileShare } from "~/models/file";
import { User } from "~/models/user";
import { $pb, fileStore, notificationStore } from "~/store";
import UserSearch from "../user_search.vue";
import FileShareCard from "./file_share_card.vue";

@Component({
    components: {
        VimuBtn,
        UserSearch,
        VimuSelect,
        VimuTextField,
        FileShareCard
    }
})
export default class FileShareDialog extends Vue {
    @VModel() dialog!: boolean;

    @Prop() file!: File;

    addLoading: boolean = false;
    removing: string = "";

    get publicFile() {
        return this.file?.public ?? false;
    }

    set publicFile(value: boolean) {
        fileStore.update({ id: this.file.id, public: value });
    }

    shareOptions = [
        { text: "can view", value: "view" },
        { text: "can edit", value: "edit" },
    ]

    selectedShareOption = this.shareOptions[0].value;

    
    removeLoading(shareId : string) {
        return shareId == this.removing;
    }

    async addShare(query?: string) {
        try {
            this.addLoading = true;

            const users = (await $pb.collection('users').getList<User>(1, 1, { filter: `username="${query}"` })).items;
            if (users.length != 1) {
                notificationStore.sendNotification({ title: 'User could not be found', color: 'error' })
                return;
            }

            const user = users[0];
            const collaborators_ = JSON.parse(JSON.stringify(this.file.collaborators))
            if(this.file.expand.collaborators?.some(f => f.expand?.user.id === user.id)) {
                notificationStore.sendNotification({ title: 'File already shared', color: 'error' })
                return;
            }
            if(this.file.owner == user.id) {
                notificationStore.sendNotification({ title: 'You own this file', color: 'error' })
                return;
            }
            const share = await $pb.collection('file_share').create<FileShare>({ permission: this.selectedShareOption, user: user.id })
            collaborators_.push(share.id);
            await fileStore.update({ id: this.file.id, collaborators: collaborators_ })
        } catch {
            notificationStore.sendNotification({ title: 'Error sharing file', color: 'error' })
        } finally {
            this.addLoading = false;
        }
    }

    async removeShare(fileShare: FileShare) {
        try {
            this.removing = fileShare.id;
            const success = await $pb.collection('file_share').delete(fileShare.id)
            if (success) {
                await fileStore.get(this.file.id);
            }
        } catch {

        } finally {
            this.removing = "";
        }
    }

    copy() {
        const shareLink = `https://vimu.app/editor/${ this.file.id }`
        navigator.clipboard.writeText(shareLink);
        notificationStore.sendNotification({title: "Link copied to clipboard", color: "primary"})
    }
}
</script>

<style>
.file-share-link {
    border: 2px dashed currentColor;
    border-radius: 8px;
    font-size: 1rem
}
</style>