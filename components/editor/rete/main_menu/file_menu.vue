<template>
  <div>
    <sub-menu v-model="open" :items="items" @menu-click="handleClick" name="File" :dense="true"
      :removeForcedOffset="true">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="text-capitalize rounded-0 menu-item" elevation="0" v-bind="attrs" v-on="on" text>File</v-btn>
      </template>
    </sub-menu>
    <file-rename-dialog v-model="dialog" :filename="filename" @save="renameFile"></file-rename-dialog>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import FileRenameDialog from "~/components/dashboard/file/file_rename_dialog.vue";
import { MenuItem } from "~/components/editor/palette/menu_item";
import SubMenu from "~/components/editor/palette/sub_menu.vue";
import { fileStore } from "~/store";

@Component({
  components: {
    SubMenu,
    FileRenameDialog
  },
})
export default class FileMenu extends Vue {
  open: boolean = false;

  dialog: boolean = false;

  items: MenuItem[] = [
    ...this.readonly ? [] : [{ name: "Open...", divider: true },
    { name: "Share" },
    { name: "Rename", divider: true, key: "file_rename" },
    { name: "Import" },
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
    },],
    { name: "Close", key: "file_close"},
  ];

  get file() {
    return fileStore.file
  }

  get filename() {
    return this.file?.name ?? ""
  }

  get readonly() {
    return fileStore.readonly;
  }

  handleClick(item: MenuItem) {
    switch (item.key) {
      case "file_close":
        this.$router.back();
        break;
      case "file_rename":
        this.dialog = true;
        break;
    }
  }

  async renameFile(newFilename: string) {
    if(this.file) {
      await fileStore.update({ id: this.file.id, name: newFilename })
    }
  }
}
</script>

<style>

</style>