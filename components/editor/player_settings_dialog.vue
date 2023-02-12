<template>
    <v-dialog max-width="400" v-model="dialog" scrollable>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
                <v-icon size="20">mdi-cog</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-text class="black--text pa-4">
                <h4>Player Settings</h4>
                <v-subheader>Volume</v-subheader>
                <v-card-text>
                    <v-slider v-model="player_volume" prepend-icon="mdi-volume-high" hide-details
                        thumb-label="always"></v-slider>
                </v-card-text>
                <v-subheader>Tempo</v-subheader>
                <v-card-text>
                    <v-slider v-model="player_tempo" prepend-icon="mdi-metronome" hide-details thumb-label="always"
                        min="20" max="240">
                        <template v-slot:append>
                            <span class="grey--text">bpm</span>
                        </template>
                    </v-slider>
                </v-card-text>
                <h4>Display Settings</h4>
                <v-list subheader flat>
                    <v-list-item-group v-model="display_settings" multiple active-class="">
                        <v-list-item v-for="item, i in display_settings_items" :key="i">
                            <template v-slot:default="{ active }">
                                <v-list-item-action>
                                    <v-checkbox :input-value="active"></v-checkbox>
                                </v-list-item-action>

                                <v-list-item-content>
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </v-list-item>

                    </v-list-item-group>

                </v-list>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <vimu-btn @click="dialog = false">Cancel</vimu-btn>
                <vimu-btn :primary="true" @click="save" :loading="saveLoading">Save</vimu-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Vue, Watch } from "nuxt-property-decorator";
import { EditorSettings } from '~/models/settings';
import { settingsStore } from "~/store";
import VimuBtn from "../vimu/vimu_button.vue";

@Component({
    components: {
        VimuBtn
    }
})
export default class PlayerSettingsDialog extends Vue {
    dialog: boolean = false;

    player_volume: number = 0;
    player_tempo: number = 0;

    display_settings: number[] = []

    display_settings_items = [
        { title: "Show title", subtitle: "Display the title of the score" },
        { title: "Show composer", subtitle: "Display the composer's name" },
        { title: "Show lyrics", subtitle: "Display score lyrics" },
        { title: "Show measure numbers", subtitle: "Display measure numbers in the score" },
        { title: "Follow cursor", subtitle: "Scroll the page as the cursor progresses" },
        { title: "Show part names", subtitle: "Display instrument names" },
    ]

    saveLoading: boolean = false;

    @Watch("dialog")
    onDialogChange(value: boolean) {
        if (value === true) {
            const settings = settingsStore.settings;
            this.player_volume = settings.player_volume;
            this.player_tempo = settings.player_tempo;

            this.display_settings = [
                ...(settings.display_show_title ? [0] : []),
                ...(settings.display_show_composer ? [1] : []),
                ...(settings.display_show_lyrics ? [2] : []),
                ...(settings.display_show_measure_numbers ? [3] : []),
                ...(settings.display_follow_cursor ? [4] : []),
                ...(settings.display_show_part_names ? [5] : []),
            ]
        }
    }

    @Emit()
    async save() {
        this.saveLoading = true;
        const settings: EditorSettings = JSON.parse(JSON.stringify(settingsStore.settings));

        settings.player_volume = this.player_volume;
        settings.player_tempo = this.player_tempo;

        settings.display_show_title = this.display_settings.includes(0);
        settings.display_show_composer = this.display_settings.includes(1);
        settings.display_show_lyrics = this.display_settings.includes(2);
        settings.display_show_measure_numbers = this.display_settings.includes(3);
        settings.display_follow_cursor = this.display_settings.includes(4);
        settings.display_show_part_names = this.display_settings.includes(5);

        await settingsStore.updateEditorSettings(settings);

        this.saveLoading = false;
        this.dialog = false;
    }
}
</script>

<style>

</style>