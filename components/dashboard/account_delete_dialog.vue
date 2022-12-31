<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                Delete account
            </v-card-title>
            <v-card-text class="black--text">
                <p>Are you sure? You will lose all your files and scores. This action cannot be undone.</p>
                <p>Type <b>I understand the consequences of my action</b> to confirm.</p>
                <vimu-text-field :hideDetails="true" v-model="confirmStr"></vimu-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <vimu-btn :disabled="deleteDisabled" :danger="true" @click="confirm">Yes, delete my account</vimu-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop, Emit } from "nuxt-property-decorator";
import VimuBtn from "../vimu/vimu_button.vue";
import VimuTextField from "../vimu/vimu_text_field.vue";

@Component({
    components: {
        VimuBtn,
        VimuTextField
    }
})
export default class AccountDeleteDialog extends Vue {
    @VModel() dialog!: boolean;

    confirmStr: string = "";

    get deleteDisabled() {
        return this.confirmStr !== "I understand the consequences of my action" 
    }

    @Emit()
    confirm() {
        this.dialog = false;
        return true;
    }

}
</script>

<style>

</style>