<template>
  <div class="d-flex flex-row align-center vimu-editor-header">
    <file-menu></file-menu>
    <edit-menu v-if="!readonly"></edit-menu>
    <view-menu></view-menu>
    <div class="text-center" style="flex-basis: 100%;">
      <span class="font-weight-bold">{{ title }}</span>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { fileStore } from "~/store";
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
export default class MainMenu extends Vue {
  get title() {
    return fileStore.file?.name ?? ""
  }

  get readonly() {
    return fileStore.readonly;
  }
}
</script>

<style >
.menu-item {
  letter-spacing: inherit;
}

.vimu-editor-header {
  background-color: rgb(245, 245, 245);
}
</style>