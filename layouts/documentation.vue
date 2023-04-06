<template>
    <v-app class="layout">
        <vimu-appbar>
            <vimu-autocomplete v-model="searchResult" style="max-width: 400px" prepend-inner-icon="mdi-magnify"
                :items="items" placeholder="Search documentation..." @update="searchDocs" :loading="searchLoading">
                <template v-slot:item="data">
                    <v-list-item dense two-line style="max-width: 400px" @click="navigate(data.item.value.path)">
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold" v-html="coloredText(data.item.text)"></v-list-item-title>
                            <v-list-item-subtitle v-html="coloredText(data.item.value.description)">
                            </v-list-item-subtitle>
                        </v-list-item-content>

                    </v-list-item>
                </template>
            </vimu-autocomplete>
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
import { FetchReturn } from "@nuxt/content/types/query-builder";
import { Vue, Component } from "nuxt-property-decorator";
import DocsDrawer from "~/components/documentation/drawer.vue";
import VimuAppBar from "~/components/vimu/vimu_appbar.vue";
import VimuAutocomplete from "~/components/vimu/vimu_autocomplete.vue";
import VimuFooter from "~/components/vimu/vimu_footer.vue";

@Component({
    components: {
        VimuAppBar,
        DocsDrawer,
        VimuFooter,
        VimuAutocomplete
    }
})
export default class DocumentationLayout extends Vue {

    items: any[] = []
    searchLoading: boolean = false;
    searchResult: string | null = null

    coloredText(text: string) {
        if (!this.searchResult) {
            return text;
        }
        const regex = new RegExp(this.searchResult, "gi");
        const coloredText = text.replace(regex, `<span style="color: #2962FF;">$&</span>`);

        console.log(coloredText);
        return coloredText
    }

    async searchDocs(q: string) {
        this.searchLoading = true;
        const docs = await this.$content('docs', { deep: true }).where({ slug: { $ne: "index" } }).search(q).fetch()
        this.searchLoading = false;
        this.items = (docs as FetchReturn[]).map(d => ({ value: d, text: d.title }));
        this.searchResult = q
    }

    navigate(path: string) {
        this.items = [];
        this.$nextTick(() => {
            this.searchResult = null;
        });
        this.$router.push(path);
    }
}
</script>

<style></style>