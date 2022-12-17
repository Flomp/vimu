<template>
  <div> <doc-nav-link to="/docs/get-started" :main="true">
      <template v-slot:default> Get Started</template>
      <template v-slot:sub-items>
        <doc-nav-link to="/docs/get-started/create">Step 1 - Create File</doc-nav-link>
        <doc-nav-link to="/docs/get-started/analyse">Step 2 - Analyse</doc-nav-link>
        <doc-nav-link to="/docs/get-started/save">Step 3 - Save</doc-nav-link>
      </template>
    </doc-nav-link>
    <doc-nav-link to="/docs/dashboard" :main="true">
      <template v-slot:default> Dashboard</template>
      <template v-slot:sub-items>
        <doc-nav-link to="/docs/dashboard/files">Files</doc-nav-link>
        <doc-nav-link to="/docs/dashboard/shared">Shared Files</doc-nav-link>
        <doc-nav-link to="/docs/dashboard/scores">Scores</doc-nav-link>
        <doc-nav-link to="/docs/dashboard/account">Account</doc-nav-link>
      </template>
    </doc-nav-link>
  </div>

</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import DocNavLink from "./doc_nav_link.vue";

@Component({
  components: {
    DocNavLink
  }
})
export default class DocumentationNavigation extends Vue {
}
</script>

<style>

</style>