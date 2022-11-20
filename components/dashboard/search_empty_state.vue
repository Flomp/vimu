<template>
    <div class="d-flex flex-column justify-center align-center">
        <bunny-sherlock :width="175" />
        <span class="vimu-card-title mt-5">We could not find anything</span>
        <span class="vimu-text">But we tried really hard!</span>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import BunnySherlock from "../vimu/bunny_sherlock.vue";

@Component({
    components: {
        BunnySherlock
    }
})
export default class SearchEmptyState extends Vue {
}
</script>

<style>

</style>