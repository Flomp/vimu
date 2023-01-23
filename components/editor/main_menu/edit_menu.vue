<template>
  <sub-menu v-model="open" :items="items" @menu-click="handleClick" name="Edit" :dense="true">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="text-capitalize rounded-0 menu-item" elevation="0" v-bind="attrs" v-on="on" text>Edit</v-btn>
    </template>
  </sub-menu>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue, Watch } from "nuxt-property-decorator";
import { Node, NodeEditor } from "rete";
import { MenuItem } from "~/components/editor/palette/menu_item";
import SubMenu from "~/components/editor/palette/sub_menu.vue";

@Component({
  components: {
    SubMenu,
  },
})
export default class EditMenu extends Vue {
  @InjectReactive()
  editor!: NodeEditor;

  open: boolean = false;
  copiedNode: Node | undefined;

  nodeCopied = false;

  mounted() {
    this.bindKeys();
  }

  get selectedNode() {
    return this.editor?.selected.list[0];
  }

  get disable() {
    return !this.selectedNode || this.selectedNode?.name == "output"
  }


  get items(): MenuItem[] {
    return [
      {
        name: "Undo",
        key: "edit_undo",
        keybinding: "⌘Z"
      },
      {
        name: "Redo",
        key: "edit_redo",
        keybinding: "⌘⇧Z",
        divider: true,
      },
      {
        name: "Copy",
        key: "edit_copy",
        disabled: this.disable,
        keybinding: "⌘C"
      },
      {
        name: "Paste",
        key: "edit_paste",
        disabled: !this.nodeCopied,
        keybinding: "⌘V"
      },
      {
        name: "Duplicate",
        key: "edit_duplicate",
        disabled: this.disable,
      },
      {
        name: "Delete",
        key: "edit_delete",
        disabled: this.disable,
        keybinding: "⌫"
      },
    ];
  }

  bindKeys() {
    document.addEventListener('keydown', e => {
      const activeElement = document.activeElement as HTMLInputElement;
      if (activeElement?.tagName == "INPUT" && ["number", "text"].includes(activeElement.type)) {
        return;
      }      
      if (e.code == "Backspace") {
        this.delete()
      } else if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.repeat) {
        switch (e.code) {
          case 'KeyY': this.undo(); break;
          case 'KeyC': this.copy(); break;
          case 'KeyV': this.paste(); break;

          default:
        }
      } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && !e.repeat) {
        switch (e.code) {
          case 'KeyY': this.redo(); break;
          default:
        }
      }
    });
  }

  handleClick(item: MenuItem) {
    switch (item.key) {
      case "edit_undo":
        this.undo();
        break;
      case "edit_redo":
        this.redo();
        break;
      case "edit_copy":
        this.copy();
        break;
      case "edit_paste":
        this.paste();
        break;
      case "edit_duplicate":
        this.duplicate();
        break;
      case "edit_delete":
        this.delete();
        break;
    }
  }

  async copy() {
    if (!this.selectedNode) {
      return;
    }
    this.copiedNode = await this.copyNode(this.selectedNode);

    this.nodeCopied = true;
  }

  async paste() {
    if (!this.copiedNode) {
      return;
    }
    const { container } = this.editor!.view.area;
    const [hw, hh] = [container.clientWidth / 2, container.clientHeight / 2];
    const { x, y, k } = this.editor!.view.area.transform;

    const center: [number, number] = [(hw - x) / k, (hh - y) / k];

    const pasteCopy = await this.copyNode(this.copiedNode);
    pasteCopy.position = center;
    this.editor?.addNode(pasteCopy);
  }

  undo() {
    this.editor?.trigger("undo" as any);
  }

  redo() {
    this.editor?.trigger("redo" as any);
  }

  async duplicate() {
    if (!this.selectedNode) {
      return;
    }
    const copiedNode = await this.copyNode(this.selectedNode!);
    const [x, y] = copiedNode.position;
    copiedNode.position = [x + 10, y + 10];
    this.editor?.addNode(copiedNode);
  }

  async copyNode(node: Node): Promise<Node> {
    const { name, ...params } = node;
    const component = this.editor?.components.get(name);
    const copiedNode = await this.createNode(component, params);

    return copiedNode;
  }

  async createNode(component: any, { data = {}, meta = {}, x = 0, y = 0 }) {
    const node = await component.createNode(JSON.parse(JSON.stringify(meta)));

    node.meta = Object.assign(JSON.parse(JSON.stringify(meta)), node.meta);
    node.position[0] = x;
    node.position[1] = y;

    return node;
  }

  delete() {
    if (!this.selectedNode) {
      return;
    }
    this.editor?.removeNode(this.selectedNode!);
    this.editor?.selected.clear();
  }
}
</script>

<style>

</style>