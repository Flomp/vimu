<template>
    <v-container>
        <nuxt-content :document="page" />
    </v-container>
</template>
<script lang="ts">
import { IContentDocument } from "@nuxt/content/types/content";
import { Context } from "@nuxt/types";
import { Component, Vue } from "nuxt-property-decorator";
import { VContainer } from "vuetify/lib";

@Component({
    head: {
        title: "Privacy policy"
    },
})
export default class PrivacyPage extends Vue {
    page!: IContentDocument;

    async asyncData({ $content }: Context) {
        const page = await $content("privacy/index").fetch<IContentDocument>();

        return { page }
    }
}
</script>

<style>

</style>
