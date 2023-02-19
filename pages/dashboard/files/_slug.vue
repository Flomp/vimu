<template>
    <v-sheet class="page">
        <v-container class="pt-0">
            <div class="header-section pt-4">
                <vimu-searchbar class="mb-8" v-model="query" :hide-details="true" @update="search"
                    style="max-width: 400px;">
                </vimu-searchbar>
                <span class="vimu-title">{{ title }}</span>
            </div>
            <file-explorer :query="query" :filters="filters" :searching="query.length > 0" :shared="$route.params.slug == 'shared'"></file-explorer>
        </v-container>

    </v-sheet>
</template>
  
<script lang="ts">
import { Context } from "@nuxt/types";
import { Component, Vue } from "nuxt-property-decorator";
import FileExplorer from "~/components/dashboard/file/file_explorer.vue";
import VimuSearchbar from "~/components/vimu/vimu_searchbar.vue";

import { $pb } from "~/store";


@Component({
    head: {
        title: "Files"
    },
    layout: 'dashboard',
    fetchOnServer: false,
    components: {
        FileExplorer,
        VimuSearchbar
    },
})
export default class FilesPage extends Vue {

    filters: string[] = [];
    query: string = "";

    get title() {
        const slug = this.$route.params.slug;

        switch (slug) {
            case 'shared':
                return 'Shared Files'
        }
        return 'My Files'

    }

    validate({ params }: Context) {
        return ['my', 'shared'].includes(params.slug)
    }

    created() {
        const slug = this.$route.params.slug;

        switch (slug) {
            case 'shared':
                this.filters.push(`collaborators.user.id?="${$pb.authStore.model?.id}"`)
                break;
            default:
                this.filters.push(`team=""`)
                this.filters.push(`owner="${$pb.authStore.model?.id}"`)
        }
    }

    async search(value?: string) {
        if (!value) {
            this.query = ""
        } else {
            this.query = `name~"${value}"`
        }
    }


}
</script>
  
<style></style>