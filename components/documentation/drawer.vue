<template>
    <aside class="docs-drawer">
        <documentation-navigation></documentation-navigation>
    </aside>
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
.docs-drawer {
    z-index: 1;
    position: sticky;
    position: -webkit-sticky;
    top: 75px;
    align-self: flex-start;
    width: 256px;
    padding: 20px;
    min-width: 0;
    flex: 0 0 256px;

}
</style>