<template>
    <div class="fill-height">
        <div class="grey lighten-5 fill-height"> <v-container>
                <nuxt-content :document="page" />
            </v-container></div>
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

@Component({
    layout: "documentation",
    components: {
        DocsTableOfContents
    }
})
export default class DocumentationPage extends Vue {
    page!: IContentDocument;

    async asyncData({ $content, route }: Context) {        
        const page = await $content(route.path).fetch<IContentDocument>();
        console.log(page);
        
        return { page }
    }
}
</script>

<style>

</style>