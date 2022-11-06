<template>
  <div class="d-flex flex-row align-center grey lighten-2">
    <file-menu></file-menu>
    <edit-menu></edit-menu>
    <view-menu></view-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { } from "./palette/menu_item";
import EditMenu from "./rete/main_menu/edit_menu.vue";
import FileMenu from "./rete/main_menu/file_menu.vue";
import ViewMenu from "./rete/main_menu/view_menu.vue";

@Component({
  components: {
    FileMenu,
    EditMenu,
    ViewMenu,
  },
})
export default class MainMenu extends Vue { }
</script>

<style >
.menu-item {
  letter-spacing: inherit;
}
</style>