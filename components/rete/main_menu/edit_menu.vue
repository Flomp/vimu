<template>
  <sub-menu
    v-model="open"
    :items="items"
    @menu-click="handleClick"
    name="Edit"
    :dense="true"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="text-capitalize rounded-0"
        elevation="0"
        v-bind="attrs"
        v-on="on"
        text
        >Edit</v-btn
      >
    </template>
  </sub-menu>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Node } from "rete";
import { MenuItem } from "~/components/palette/menu_item";
import SubMenu from "~/components/palette/sub_menu.vue";
import { reteStore } from "~/store/rete";

@Component({
  components: {
    SubMenu,
  },
})
export default class EditMenu extends Vue {
  open: boolean = false;
  copiedNode: Node | undefined;

  get selectedNode() {
    return reteStore.editor?.selected.list[0];
  }

  get items(): MenuItem[] {
    return [
      {
        name: "Undo",
        key: "edit_undo",
      },
      {
        name: "Redo",
        key: "edit_redo",
        divider: true,
      },
      {
        name: "Copy",
        key: "edit_copy",
        disabled: false,
      },
      {
        name: "Paste",
        key: "edit_paste",
        disabled: false,
      },
      {
        name: "Duplicate",
        key: "edit_duplicate",
        disabled: false,
      },
      {
        name: "Delete",
        key: "edit_delete",
        disabled: false,
      },
    ];
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
    this.copiedNode = await this.copyNode(reteStore.editor?.selected.list[0]!);
  }

  async paste() {
    if (!this.copiedNode) {
      return;
    }
    const { container } = reteStore.editor!.view.area;
    const [hw, hh] = [container.clientWidth / 2, container.clientHeight / 2];
    const { x, y, k } = reteStore.editor!.view.area.transform;

    const center: [number, number] = [(hw - x) / k, (hh - y) / k];
    this.copiedNode.position = center;
    reteStore.editor?.addNode(this.copiedNode);
  }

  undo() {
    reteStore.editor?.trigger("undo" as any);
  }

  redo() {
    reteStore.editor?.trigger("redo" as any);
  }

  async duplicate() {
    const copiedNode = await this.copyNode(this.selectedNode!);
    const [x, y] = copiedNode.position;
    copiedNode.position = [x + 10, y + 10];
    reteStore.editor?.addNode(copiedNode);
  }

  async copyNode(node: Node): Promise<Node> {
    const { name, ...params } = node;
    const component = reteStore.editor?.components.get(name);
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
    reteStore.editor?.removeNode(this.selectedNode!);
    reteStore.editor?.selected.clear();
  }
}
</script>

<style>
</style>