<template>
  <div class="d-flex flex-column fill-height justify-center align-center text-center">
    <h1 class="vimu-title">404</h1>
    <h2 class="vimu-subtitle pt-3 pb-4">Uh, oh! How did you get here?</h2>
    <p class="vimu-text" style="max-width: 256px">Looks like you have ventured too far into the unkown.
        You should return home. There are cookies waiting...
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
export default class Error404 extends Vue {
}
</script>

<style>

</style>