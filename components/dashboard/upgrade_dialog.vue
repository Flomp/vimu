<template>
    <v-dialog v-model="dialog" persistent max-width="700px">
        <v-card>
            <v-card-title>
                Upgrade now!
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col class="d-flex flex-column justify-center upgrade-dialog-text">
                        <div v-if="limitReached">
                            <p>You have reached your {{ item }} limit. With your current subscription you can create a
                                maximum of 2 {{ item }}s.</p>
                            <p>With <b>vimu Pro</b> you can create an unlimited number of {{ item }}s and have
                                access to various other features. Check out our <nuxt-link to="/pricing">pricing
                                    page</nuxt-link> to learn more.</p>
                        </div>
                        <div v-else>
                            <p>
                                File sharing is not included in your current subscription.
                            </p>
                            <p>With <b>vimu Pro</b> you have access to all collaboration features and many more
                                advantages. Check out our <nuxt-link to="/pricing">pricing
                                    page</nuxt-link> to learn more.</p>
                        </div>
                    </v-col>
                    <v-col class="text-center">
                        <bunny-money :width="200"></bunny-money>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mr-4" color="grey" @click="dialog = false" text>Close</v-btn>
                <vimu-btn :primary="true" to="/dashboard/account/subscription">Upgrade</vimu-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from "nuxt-property-decorator";
import BunnyMoney from "../vimu/illustrations/bunny_money.vue";
import VimuBtn from "../vimu/vimu_button.vue";

@Component({
    components: {
        BunnyMoney,
        VimuBtn
    }
})
export default class UpgradeDialog extends Vue {
    @VModel() dialog!: boolean;

    @Prop() item!: string;
    @Prop({ default: true }) limitReached!: boolean;
}
</script>

<style>
.upgrade-dialog-text {
    font-size: 0.9rem;
    color: black;
}
</style>