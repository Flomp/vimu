<template>
    <v-app>
        <docs-drawer></docs-drawer>

        <vimu-appbar />
        <v-main>
            <nuxt />
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import DocsDrawer from "~/components/documentation/drawer.vue";
import VimuAppBar from "~/components/vimu/vimu_appbar.vue";

@Component({
    components: {
        VimuAppBar,
        DocsDrawer
    }
})
export default class DocumentationLayout extends Vue {
}
</script>

<style>

</style>