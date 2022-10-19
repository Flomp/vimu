<template>
  <sub-menu v-model="open" :items="items" @menu-click="handleClick" name="View" :dense="true">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="text-capitalize rounded-0" elevation="0" v-bind="attrs" v-on="on" text>View</v-btn>
    </template>
  </sub-menu>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import { MenuItem } from "~/components/palette/menu_item";
import SubMenu from "~/components/palette/sub_menu.vue";
import { Settings } from "~/models/settings";
import { settingsStore } from "~/store";
// @ts-ignore
import { zoomAt } from "rete-area-plugin/src/zoom-at";
@Component({
  components: {
    SubMenu,
  },
})
export default class ViewMenu extends Vue {
  @InjectReactive()
  editor!: NodeEditor;

  open: boolean = false;

  get items(): MenuItem[] {
    return [
      {
        name: "Zoom in",
        key: "view_zoom_in",
      },
      {
        name: "Zoom out",
        key: "view_zoom_out",
      },
      {
        name: "Zoom to fit",
        key: "view_zoom_to_fit",
        divider: true,
      },
      {
        name: "Arrange Nodes",
        key: "view_arrange_nodes",
      },
      {
        name: "Pixel Grid",
        key: "view_pixel_grid",
        selected: settingsStore.settings.view.pixelGrid,
      },
      {
        name: "Minimap",
        key: "view_minimap",
        selected: settingsStore.settings.view.minimap,
        divider: true,
      },
      {
        name: "Score",
        key: "view_score",
        selected: settingsStore.settings.view.score,
      },
      {
        name: "Log",
        key: "view_log",
        selected: settingsStore.settings.view.log,
      },
    ];
  }

  handleClick(item: MenuItem) {
    switch (item.key) {
      case "view_zoom_in":
        this.zoom(1);
        break;
      case "view_zoom_out":
        this.zoom(-1);
        break;
      case "view_zoom_to_fit":
        this.zoomToFit();
        break;
      case "view_arrange_nodes":
        this.arrangeNodes();
        break;
      case "view_pixel_grid":
        this.togglePixelGrid();
        break;
      case "view_minimap":
        this.toggleMinimap();
        break;
      case "view_score":
        this.toggleView("score");
        break;
      case "view_log":
        this.toggleView("log");
        break;
    }
  }

  zoom(direction: 1 | -1) {
    if (!this.editor) {
      return;
    }
    const { area } = this.editor.view;
    const [w, h] = [
      this.editor.view.container.clientWidth,
      this.editor.view.container.clientHeight,
    ];
    var rect = area.el.getBoundingClientRect();
    var delta = 0.3 * direction;
    var ox = (rect.left - w / 2) * delta;
    var oy = (rect.top - h / 2) * delta;

    area.zoom(area.transform.k * (1 + delta), ox, oy, "wheel");
  }

  zoomToFit() {
    zoomAt(this.editor)
  }

  togglePixelGrid() {
    const settings: Settings = JSON.parse(
      JSON.stringify(settingsStore.settings)
    );

    const editor = document.getElementsByClassName(
      "rete-background"
    )[0] as HTMLElement;
    if (editor.classList.contains("pixel-grid")) {
      editor.classList.remove("pixel-grid");
      settings.view.pixelGrid = false;
    } else {
      editor.classList.add("pixel-grid");
      settings.view.pixelGrid = true;
    }

    settingsStore.changeSettings(settings);
  }

  toggleMinimap() {
    const settings: Settings = JSON.parse(
      JSON.stringify(settingsStore.settings)
    );

    const minimap = document.getElementsByClassName(
      "minimap"
    )[0] as HTMLElement;
    if (minimap.style.display == "none") {
      minimap.style.display = "block";
      settings.view.minimap = true;
    } else {
      minimap.style.display = "none";
      settings.view.minimap = false;
    }

    settingsStore.changeSettings(settings);
  }

  toggleView(key: "score" | "log") {
    const settings: Settings = JSON.parse(
      JSON.stringify(settingsStore.settings)
    );
    settings.view[key] = !settings.view[key];

    settingsStore.changeSettings(settings);
  }

  arrangeNodes() {
    this.editor.trigger('arrange' as any);
  }
}
</script>

<style>

</style>