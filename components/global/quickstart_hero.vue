<template>
    <div class="vimu-card pa-7 mb-9 d-flex">
        <div style="flex-basis: 100%">
            <h2 class="mt-0 mb-12">Quickstart</h2>
            <p style="font-size: 1.2rem; margin-bottom: 36px; max-width: 450px">A short guide on how to analyse your
                first score and save the results</p>
            <vimu-btn :primary="true" :large="true" to="/docs/get-started">Get started</vimu-btn>
        </div>
        <bunny-teacher width="100%" v-if="$vuetify.breakpoint.smAndUp" style="max-height: 250px"></bunny-teacher>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import BunnyTeacher from "../vimu/bunny_teacher.vue";
import VimuBtn from "../vimu/vimu_button.vue";

@Component({
    components: {
        VimuBtn,
        BunnyTeacher
    }
})
export default class QuickstartHero extends Vue {
}
</script>

<style>

</style>