<template>
  <div>
    <sub-menu v-model="open" :items="items" @menu-click="handleClick" name="File" :dense="true"
      :removeForcedOffset="true">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="text-capitalize rounded-0 menu-item" elevation="0" v-bind="attrs" v-on="on" text>File</v-btn>
      </template>
    </sub-menu>
    <file-share-dialog v-model="shareDialog" :file="file"></file-share-dialog>
    <file-rename-dialog v-model="renameDialog" :filename="filename" @save="renameFile"></file-rename-dialog>
  </div>

</template>

<script lang="ts">
import { Component, InjectReactive, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import FileRenameDialog from "~/components/dashboard/file/file_rename_dialog.vue";
import FileShareDialog from "~/components/dashboard/file/file_share_dialog.vue";
import { MenuItem } from "~/components/editor/palette/menu_item";
import SubMenu from "~/components/editor/palette/sub_menu.vue";
import { engineStore, fileStore, notificationStore } from "~/store";

@Component({
  components: {
    SubMenu,
    FileShareDialog,
    FileRenameDialog,
  },
})
export default class FileMenu extends Vue {

  @InjectReactive()
  editor!: NodeEditor;

  open: boolean = false;

  shareDialog: boolean = false;
  renameDialog: boolean = false;

  get items(): MenuItem[] {
    return [
      ...this.readonly ? [] : [{ name: "Open...", divider: true },
      { name: "Share", key: "file_share" },
      { name: "Rename", divider: true, key: "file_rename" },
      {
        name: "Import", key: "file_import",
      },
      {
        name: "Export",
        divider: true,
        key: "file_export",
      },],
      { name: "Close", key: "file_close" },
    ];
  }

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
      case "file_share":
        this.shareDialog = true;
        break;
      case "file_rename":
        this.renameDialog = true;
        break;
      case "file_import":
        this.importFile();
        break;
      case "file_export":
        this.exportJSON();
        break;
    }
  }

  async renameFile(newFilename: string) {
    if (this.file) {
      await fileStore.update({ id: this.file.id, name: newFilename })
    }
  }

  async importFile() {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
      const file = (e.target as HTMLInputElement)?.files![0];

      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = async readerEvent => {
        var content = readerEvent.target?.result;
        if (!content || content instanceof ArrayBuffer) {
          notificationStore.sendNotification({ title: 'Unable to import file', color: 'error' })
          return;
        }
        try {
          const data = JSON.parse(content);
          if (data.id !== "vimu@0.1.0" ||
            !(data.nodes instanceof Object) || data.nodes instanceof Array) {
            throw new Error()
          }

          fileStore.setData(data);
          await this.editor.fromJSON(data);
          this.editor.trigger('process');
        } catch (e) {
          notificationStore.sendNotification({ title: 'Not a valid vimu file', color: 'error' })
          return;
        }

      }

    }

    input.click();
  }

  download(blob: Blob, extension: string, filename?: string) {
    var url = URL.createObjectURL(blob);
    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    if (filename) {
      downloadLink.download = `${filename}.${extension}`
    } else {
      const timestamp = new Date().getTime();
      downloadLink.download = `vimu_export_${timestamp}.${extension}`;
    }
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  exportJSON() {
    const jsonData = JSON.stringify(fileStore.file?.expand.data.json);
    var jsonBlob = new Blob([jsonData], {
      type: "text/xml;charset=utf-8",
    });
    this.download(jsonBlob, "json", fileStore.file?.name)
  }

}
</script>

<style>

</style>