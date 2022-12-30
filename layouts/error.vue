<template>
    <error404 v-if="error.statusCode == 404"></error404>
    <error500 v-else></error500>

</template>

<script lang="ts">
import { NuxtError } from "@nuxt/types";
import { Vue, Component, Prop } from "nuxt-property-decorator";
import Error404 from "~/components/vimu/error404.vue";
import Error500 from "~/components/vimu/error500.vue";

@Component({
    components: {
        Error404,
        Error500
    }
})
export default class ErrorLayout extends Vue {
    @Prop() error!: NuxtError;

    errorPage() {
        if (this.error.statusCode === 404) {
            return Error404;
        }
        return Error500;
    }
}
</script>

<style>

</style>