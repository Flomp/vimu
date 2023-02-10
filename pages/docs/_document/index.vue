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
import DocumentationContentCard from "~/components/documentation/documentation_content_card.vue";
import DocsTableOfContents from "~/components/documentation/documentation_table_of_contents.vue";

@Component({
    head: {
        title: "Docs"
    },
    layout: "documentation",
    components: {
        DocsTableOfContents,
        DocumentationContentCard
    }
})
export default class DocumentationPage extends Vue {
    page!: IContentDocument;

    async asyncData({ $content, route, error }: Context) {
        try {
            const page = await $content(route.path + "/index").fetch<IContentDocument>();
                return { page }
        } catch (e) {
            error({ statusCode: 404, message: 'Not found' })
        }
    }
}
</script>

<style>

</style>