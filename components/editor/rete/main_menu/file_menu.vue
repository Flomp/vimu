<template>
  <sub-menu v-model="open" :items="items" @menu-click="handleClick" name="File" :dense="true"
    :removeForcedOffset="true">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="text-capitalize rounded-0 menu-item" elevation="0" v-bind="attrs" v-on="on" text>File</v-btn>
    </template>
  </sub-menu>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { MenuItem } from "~/components/editor/palette/menu_item";
import SubMenu from "~/components/editor/palette/sub_menu.vue";

@Component({
  components: {
    SubMenu,
  },
})
export default class FileMenu extends Vue {
  open: boolean = false;

  items: MenuItem[] = [
    { name: "Back to files", key: "back_to_files", divider: true },
    { name: "Open..." },
    { name: "Open Recent" },
    { name: "Open from URL", divider: true },
    {
      name: "Export",
      divider: true,
      children: [
        {
          name: "PNG",
          key: "file_export_png",
        },
        {
          name: "JSON",
          key: "file_export_json",
        },
      ],
    },
    { name: "Close" },
  ];
  handleClick(item: MenuItem) {
    switch (item.key) {
      case "back_to_files":
        this.backToFiles();
    }
  }

  backToFiles() {
    this.$router.push('/dashboard/files');
  }
}
</script>

<style>

</style>