<template>
    <div class="d-flex grey lighten-5 fill-height">
        <v-container>
            <nuxt-content :document="page" />
        </v-container>
        <client-only> <docs-table-of-contents :toc="page.toc"
                v-if="$vuetify.breakpoint.mdAndUp"></docs-table-of-contents>
        </client-only>
    </div>
</template>

<script lang="ts">
import { IContentDocument } from "@nuxt/content/types/content";
import { Context } from "@nuxt/types";
import { Vue, Component } from "nuxt-property-decorator";
import DocsTableOfContents from "~/components/documentation/documentation_table_of_contents.vue";
import QuickstartHero from "~/components/global/quickstart_hero.vue";

@Component({
    layout: "documentation",
    components: {
        DocsTableOfContents,
        QuickstartHero
    }
})
export default class DocumentationPage extends Vue {
    page!: IContentDocument;

    async asyncData({ $content, route }: Context) {
        const page = await $content("docs/index").fetch<IContentDocument>();
        return { page }
    }
}
</script>

<style>
.nuxt-content {
    max-width: 840px;
    margin: 0 auto;
}
</style>