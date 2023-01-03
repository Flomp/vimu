<template>
    <v-menu offset-y content-class="score-filter-menu vimu-menu elevation-0" :close-on-content-click="false"
        activator="#score-searchbar" nudge-bottom="12">
        <v-list class="ma-4">
            <h5>Filter scores:</h5>
            <vimu-combobox @change="change" class="score-filter-input my-4" v-model="filter.composer" :chips="true" :multiple="true"
                placeholder="Composer" prepend-icon="mdi-account"></vimu-combobox>
            <vimu-combobox @change="change" class="score-filter-input my-4" v-model="filter.opus" :chips="true" :multiple="true"
                placeholder="Opus" prepend-icon="mdi-folder">
            </vimu-combobox>
            <vimu-combobox @change="change" class="score-filter-input my-4" v-model="filter.date" :chips="true" :multiple="true"
                placeholder="Date" prepend-icon="mdi-calendar-today"></vimu-combobox>
            <vimu-combobox @change="change" class="score-filter-input my-4" v-model="filter.instruments" :chips="true" :multiple="true"
                placeholder="Instruments" prepend-icon="mdi-piano"></vimu-combobox>
            <vimu-combobox @change="change" class="score-filter-input my-4" v-model="filter.keys" :chips="true" :multiple="true"
                placeholder="Key Signatures" prepend-icon="mdi-language-csharp">
            </vimu-combobox>
            <vimu-combobox @change="change" class="score-filter-input my-4" v-model="filter.times" :chips="true" :multiple="true"
                placeholder="Time Signatures" prepend-icon="mdi-fraction-one-half">
            </vimu-combobox>
            <vimu-combobox @change="change" class="score-filter-input my-4" v-model="filter.language" :chips="true" :multiple="true"
                placeholder="Language" prepend-icon="mdi-translate"></vimu-combobox>
        </v-list>
    </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Emit, VModel } from "nuxt-property-decorator";
import VimuCombobox from "~/components/vimu/vimu_combobox.vue";
import { ScoreFilter } from "~/models/score"
@Component({
    components: {
        VimuCombobox
    }
})
export default class ScoreFilterMenu extends Vue {
    @VModel() filter!: ScoreFilter;

    @Emit()
    change() {
        return;
    }
}
</script>

<style>
.score-filter-input {
    max-width: 364px;
}

.score-filter-menu {
    max-height: calc(-100px + 100vh)
}

@media only screen and (max-width: 959px) {
    .score-filter-menu {
        max-height: calc(-200px + 100vh)
    }
}
</style>