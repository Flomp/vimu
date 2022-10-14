<template>
  <sub-menu
    v-model="open"
    :items="items"
    @menu-click="handleClick"
    name="Editor"
    :dense="true"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="text-capitalize rounded-0"
        elevation="0"
        v-bind="attrs"
        v-on="on"
        text
        >Editor</v-btn
      >
    </template>
  </sub-menu>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { MenuItem } from "~/components/palette/menu_item";
import SubMenu from "~/components/palette/sub_menu.vue";

@Component({
  components: {
    SubMenu,
  },
})
export default class EditorMenu extends Vue {
  open: boolean = false;

  items: MenuItem[] = [
    {
      name: "Center Layout",
      key: "editor_center_layout",
    },
    {
      name: "Zoom in",
      key: "editor_zoom_in",
    },
    {
      name: "Zoom out",
      key: "editor_zoom_out",
      divider: true,
    },
    {
      name: "Pixel Grid",
      key: "editor_pixel_grid",
      active: true,
    },
    {
      name: "Minimap",
      key: "editor_minimap",
      active: true,
    },
  ];

  handleClick(item: MenuItem) {}
}
</script>

<style>
</style>