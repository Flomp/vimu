<template>
    <div class="vimu-card pa-7 mb-9">
        <h2 class="mt-0 mb-6">Quickstart</h2>
        <p style="font-size: 1.2rem; margin-bottom: 36px; max-width: 450px">A short guide on how to analyse your first score and save the results</p>
        <vimu-btn :primary="true" :large="true" to="/docs/get-started">Get started</vimu-btn>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import VimuBtn from "../vimu/vimu_button.vue";

@Component({
    components: {
        VimuBtn
    }
})
export default class QuickstartHero extends Vue {
}
</script>

<style>

</style>