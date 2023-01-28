<template>
  <sub-menu v-model="open" :items="items" @menu-click="handleClick" name="View" :is-sub-menu="true" :is-offset-x="true"
    :is-offset-y="false" :is-open-on-hover="true" :dense="true">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="text-capitalize rounded-0 menu-item" elevation="0" v-bind="attrs" v-on="on" text>View</v-btn>
    </template>
  </sub-menu>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import { settingsStore } from "~/store";
import { MenuItem } from "../menu_item";
import SubMenu from "../sub_menu.vue";
// @ts-ignore
import { zoomAt } from "rete-area-plugin/src/zoom-at";
import { EditorSettings } from "~/models/settings";
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
        keybinding: "+"
      },
      {
        name: "Zoom out",
        key: "view_zoom_out",
        keybinding: "-"
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
        selected: settingsStore.settings.pixel_grid,
      },
      {
        name: "Minimap",
        key: "view_minimap",
        selected: settingsStore.settings.minimap,
        divider: true,
      },
      {
        name: "Output",
        key: "view_score",
        selected: settingsStore.settings.score,
      },
      {
        name: "Plots",
        key: "view_plot",
        selected: settingsStore.settings.plot,
      },
    ];
  }

  mounted() {
    this.bindKeys();
  }

  bindKeys() {
    document.addEventListener('keydown', e => {
      const activeElement = document.activeElement as HTMLInputElement;
      if (activeElement?.tagName == "INPUT" && activeElement.type == "text") {
        return;
      }
      if (e.key == "+") {
        this.zoom(1)
      } else if (e.key == "-") {
        this.zoom(-1)
      }
    });
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
      case "view_plot":
        this.toggleView("plot");
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
    var delta = 0.2 * direction;
    var ox = (rect.left - w / 2) * delta;
    var oy = (rect.top - h / 2) * delta;

    area.zoom(area.transform.k * (1 + delta), ox, oy, "wheel");
  }

  zoomToFit() {
    zoomAt(this.editor)
  }

  togglePixelGrid() {
    const settings: EditorSettings = JSON.parse(
      JSON.stringify(settingsStore.settings)
    );

    const editor = document.getElementsByClassName(
      "rete-background"
    )[0] as HTMLElement;
    if (settings.pixel_grid === true) {
      editor.classList.remove("pixel-grid");
    } else {
      editor.classList.add("pixel-grid");
    }

    settings.pixel_grid = !settings.pixel_grid

    settingsStore.updateEditorSettings(settings);
  }

  toggleMinimap() {
    const settings: EditorSettings = JSON.parse(
      JSON.stringify(settingsStore.settings)
    );

    const minimap = document.getElementsByClassName(
      "minimap"
    )[0] as HTMLElement;
    if (settings.minimap === false) {
      minimap.style.display = "block";
    } else {
      minimap.style.display = "none";
    }

    settings.minimap = !settings.minimap

    settingsStore.updateEditorSettings(settings);
  }

  toggleView(key: "score" | "plot") {
    const settings: EditorSettings = JSON.parse(
      JSON.stringify(settingsStore.settings)
    );

    settings[key] = !settings[key];
    settingsStore.updateEditorSettings(settings);
  }

  arrangeNodes() {
    if (this.editor.nodes.length) {
      this.editor.trigger('arrange' as any);

    }
  }
}
</script>

<style>

</style>