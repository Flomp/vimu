<template>
  <div class="d-flex flex-row absolute">
    <file-menu></file-menu>
    <editor-menu></editor-menu>
    <view-menu></view-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { } from "./palette/menu_item";
import EditorMenu from "./rete/main_menu/editor_menu.vue";
import FileMenu from "./rete/main_menu/file_menu.vue";
import ViewMenu from "./rete/main_menu/view_menu.vue";

@Component({
  components: {
    FileMenu,
    EditorMenu,
    ViewMenu,
  },
})
export default class MainMenu extends Vue {}
</script>

<style scoped>
</style>