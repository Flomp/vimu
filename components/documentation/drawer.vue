<template>
    <v-navigation-drawer width="256" permanent app floating style="margin-top: 75px; padding-left: 72px; padding-top: 24px">
        <documentation-navigation></documentation-navigation>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import DocumentationNavigation from "./documentation_navigation.vue";

@Component({
    components: {
        DocumentationNavigation
    }
})
export default class DocsDrawer extends Vue {
}
</script>

<style>

</style>