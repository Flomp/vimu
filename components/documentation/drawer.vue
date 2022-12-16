<template>
    <v-navigation-drawer permanent app floating style="margin-top: 75px">
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