<template>
  <div class="d-flex flex-column fill-height justify-center align-center text-center py-500">
    <h1 class="vimu-title">500</h1>
    <h2 class="vimu-subtitle pt-3 pb-4">Oof! Something went wrong...</h2>
    <p class="vimu-text" style="max-width: 256px">That's on us. We are surely already trying to fix the issue. Please try again later.
    </p>
    <vimu-btn to="/">Home</vimu-btn>
</div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import VimuBtn from "./vimu_button.vue";

@Component({
    components: {
        VimuBtn
    }
})
export default class Error500 extends Vue {
}
</script>

<style>

</style>