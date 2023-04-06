<template>
    <v-app class="layout">
        <vimu-appbar>
            <template v-slot:search>
                <documentation-search></documentation-search>
            </template>
        </vimu-appbar>
        <div class="d-flex">
            <docs-drawer v-if="$vuetify.breakpoint.mdAndUp"></docs-drawer>

            <v-main class="main" style="flex: 1 1 auto; min-height:100vh">
                <nuxt />
            </v-main>
        </div>

        <vimu-footer />
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import DocsDrawer from "~/components/documentation/drawer.vue";
import VimuAppBar from "~/components/vimu/vimu_appbar.vue";
import VimuFooter from "~/components/vimu/vimu_footer.vue";
import DocumentationSearch from "~/components/documentation/documentation_search.vue";
@Component({
    components: {
        VimuAppBar,
        DocsDrawer,
        VimuFooter,
        DocumentationSearch
    }
})
export default class DocumentationLayout extends Vue {
}
</script>

<style></style>