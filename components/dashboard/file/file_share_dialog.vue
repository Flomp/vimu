<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                Share file
            </v-card-title>
            <v-card-text class="black--text">
                <div class="file-share-link d-flex align-center justify-space-around pa-3" v-if="file">
                    <span>https://vimu.app/editor/{{ file.id }}</span>
                    <v-btn color="primary" icon>
                        <v-icon>mdi-content-copy</v-icon>
                    </v-btn>
                </div>
                <div class="d-flex align-center">
                    <span class="mr-4">Anyone with the link can view</span>
                    <v-switch v-model="publicFile" inset></v-switch>
                </div>
                <v-row>
                    <v-col cols="12" sm="auto">
                        <user-search :hide-details="true" placeholder="User-IDs, comma separated"></user-search>

                    </v-col>
                    <v-col>
                        <vimu-select :items="shareOptions" :hide-details="true" v-model="selectedShareOption"></vimu-select>
                    </v-col>
                </v-row>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <vimu-btn @click="share">Close</vimu-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, VModel, Emit, Prop } from "nuxt-property-decorator";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import VimuSelect from "~/components/vimu/vimu_select.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import File from "~/models/file";
import UserSearch from "../user_search.vue";

@Component({
    components: {
        VimuBtn,
        UserSearch,
        VimuSelect,
        VimuTextField
    }
})
export default class FileShareDialog extends Vue {
    @VModel() dialog!: boolean;

    @Prop() file!: File;

    publicFile: boolean = false;

    shareOptions = [
        "can view",
        "can edit"
    ]

    selectedShareOption = this.shareOptions[0];

    @Emit()
    share() {
        this.file.public = this.publicFile;
        return this.file;
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