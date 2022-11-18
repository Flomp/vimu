<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                {{ title }}
            </v-card-title>
            <v-card-text class="black--text">
                {{ text }}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <vimu-btn :danger="true" @click="confirm">{{ action }}</vimu-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop, Emit } from "nuxt-property-decorator";
import VimuBtn from "../vimu/vimu_button.vue";

@Component({
    components: {
        VimuBtn
    }
})
export default class ConfirmDialog extends Vue {
    @VModel() dialog!: boolean;

    @Prop() title!: string;
    @Prop() text!: string;
    @Prop() action!: string;

    @Emit()
    confirm() {
        this.dialog = false;
        return true;
    }

}
</script>

<style>

</style>