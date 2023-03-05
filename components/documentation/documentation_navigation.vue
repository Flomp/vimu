<template>
  <div>
    <doc-nav-link to="/docs" :main="true">
      <template v-slot:default> Introduction</template>
    </doc-nav-link>
    <doc-nav-link to="/docs/tutorials" :main="true">
      <template v-slot:default> Tutorials</template>
      <template v-slot:sub-items>
        <doc-nav-link to="/docs/tutorials/get-started">Get started</doc-nav-link>
        <doc-nav-link to="/docs/tutorials/search-melody">Search for melody</doc-nav-link>
        <doc-nav-link to="/docs/tutorials/roman-numeral">Roman numeral analysis</doc-nav-link>
        <doc-nav-link to="/docs/tutorials/plot-histogram">Plot histogram</doc-nav-link>
      </template>
    </doc-nav-link>
    <doc-nav-link to="/docs/dashboard" :main="true">
      <template v-slot:default> Dashboard</template>
      <template v-slot:sub-items>
        <doc-nav-link to="/docs/dashboard/files">Files</doc-nav-link>
        <doc-nav-link to="/docs/dashboard/shared">Shared Files</doc-nav-link>
        <doc-nav-link to="/docs/dashboard/scores">Scores</doc-nav-link>
        <doc-nav-link to="/docs/dashboard/teams">Teams</doc-nav-link>
      </template>
    </doc-nav-link>
    <doc-nav-link to="/docs/editor" :main="true">
      <template v-slot:default> Editor</template>
      <template v-slot:sub-items>
        <doc-nav-link to="/docs/editor/overview">Overview</doc-nav-link>
        <doc-nav-link to="/docs/editor/node-panel">Node Panel</doc-nav-link>
        <doc-nav-link to="/docs/editor/output-panel">Output Panel</doc-nav-link>
        <doc-nav-link to="/docs/editor/plot-panel">Plot Panel</doc-nav-link>
        <doc-nav-link to="/docs/editor/details-panel">Details Panel</doc-nav-link>
        <doc-nav-link to="/docs/editor/menu">Menu</doc-nav-link>
      </template>
    </doc-nav-link>
    <doc-nav-link to="/docs/account" :main="true">
      <template v-slot:default> Account</template>
      <template v-slot:sub-items>
        <doc-nav-link to="/docs/account/general">General</doc-nav-link>
        <doc-nav-link to="/docs/account/subscription">Subscription</doc-nav-link>
      </template>
    </doc-nav-link>
    <doc-nav-link to="/docs/nodes" :main="true">
      <template v-slot:default> Nodes</template>
      <template v-slot:sub-items>
        <doc-nav-link to="/docs/nodes/source_score">source_score</doc-nav-link>
        <doc-nav-link to="/docs/nodes/source_tinynotation">source_tinynotation</doc-nav-link>
        <doc-nav-link to="/docs/nodes/analysis_ambitus">analysis_ambitus</doc-nav-link>
        <doc-nav-link to="/docs/nodes/analysis_key">analysis_key</doc-nav-link>
        <doc-nav-link to="/docs/nodes/analysis_roman_numeral">analysis_roman_numeral</doc-nav-link>
        <doc-nav-link to="/docs/nodes/figured_bass_realize">figured_bass_realize</doc-nav-link>
        <doc-nav-link to="/docs/nodes/detect_modulation">detect_modulation</doc-nav-link>
        <doc-nav-link to="/docs/nodes/detect_parallels">detect_parallels</doc-nav-link>
        <doc-nav-link to="/docs/nodes/detect_voice_crossings">detect_voice_crossings</doc-nav-link>
        <doc-nav-link to="/docs/nodes/plot_dynamics">plot_dynamics</doc-nav-link>
        <doc-nav-link to="/docs/nodes/plot_histogram">plot_histogram</doc-nav-link>
        <doc-nav-link to="/docs/nodes/plot_piano_roll">plot_piano_roll</doc-nav-link>
        <doc-nav-link to="/docs/nodes/plot_scatter">plot_scatter</doc-nav-link>
        <doc-nav-link to="/docs/nodes/plot_scatter_weighted">plot_scatter_weighted</doc-nav-link>
        <doc-nav-link to="/docs/nodes/search_lyrics">search_lyrics</doc-nav-link>
        <doc-nav-link to="/docs/nodes/search_part">search_part</doc-nav-link>
        <doc-nav-link to="/docs/nodes/select_measures">select_measures</doc-nav-link>
        <doc-nav-link to="/docs/nodes/select_notes">select_notes</doc-nav-link>
        <doc-nav-link to="/docs/nodes/select_parts">select_parts</doc-nav-link>
        <doc-nav-link to="/docs/nodes/transform_append">transform_append</doc-nav-link>
        <doc-nav-link to="/docs/nodes/transform_chordify">transform_chordify</doc-nav-link>
        <doc-nav-link to="/docs/nodes/transform_stack">transform_stack</doc-nav-link>
        <doc-nav-link to="/docs/nodes/transform_transpose">transform_transpose</doc-nav-link>
      </template>
    </doc-nav-link>
    <doc-nav-link to="/docs/self-hosting" :main="true">
      <template v-slot:default> Self-Hosting</template>
      <template v-slot:sub-items>
        <doc-nav-link to="/docs/self-hosting/introduction">Introduction</doc-nav-link>
        <doc-nav-link to="/docs/self-hosting/installation">Installation</doc-nav-link>
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

<style></style>