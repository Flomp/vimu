<template>
  <div class="d-flex flex-row absolute">
    <sub-menu
      v-model="menuModels[i]"
      :items="menu.items"
      @menu-click="contextAction"
      v-for="(menu, i) in menus"
      :name="menu.name"
      :key="i"
      :dense="true"
      :removeForcedOffset="i == 0"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="text-capitalize rounded-0"
          elevation="0"
          v-bind="attrs"
          v-on="on"
          text
          >{{ menu.name }}</v-btn
        >
      </template>
    </sub-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Settings } from "~/models/settings";
import { settingsStore } from "~/store";
import {
  editorMainMenuItems,
  fileMainMenuItems,
  MenuItem,
  viewMainMenuItems,
} from "./palette/menu_item";
import SubMenu from "./palette/sub_menu.vue";

@Component({
  components: {
    SubMenu,
  },
})
export default class MainMenu extends Vue {
  fileMainMenuItemsLocal = JSON.parse(JSON.stringify(fileMainMenuItems));
  viewMainMenuItemsLocal = JSON.parse(JSON.stringify(viewMainMenuItems));
  editorMainMenuItemsLocal = JSON.parse(JSON.stringify(editorMainMenuItems));

  menuModels = [false, false, false];

  get menus() {
    return [
      { name: "File", items: this.fileMainMenuItemsLocal },
      { name: "Editor", items: this.editorMainMenuItemsLocal },
      { name: "View", items: this.viewMainMenuItemsLocal },
    ];
  }

  contextAction(menuItem: MenuItem) {
    switch (menuItem.key) {
      case "view_score":
        this.toggleScoreView();
        break;
      case "view_log":
        this.toggleLogView();
        break;
    }
  }

  toggleScoreView() {
    const settings: Settings = JSON.parse(
      JSON.stringify(settingsStore.settings)
    );

    settings.view.score = !settings.view.score;
    this.viewMainMenuItemsLocal[0].active =
      !this.viewMainMenuItemsLocal[0].active;

    settingsStore.changeSettings(settings);
  }

  toggleLogView() {
    const settings: Settings = JSON.parse(
      JSON.stringify(settingsStore.settings)
    );

    settings.view.log = !settings.view.log;
    this.viewMainMenuItemsLocal[1].active =
      !this.viewMainMenuItemsLocal[1].active;

    settingsStore.changeSettings(settings);
  }
}
</script>

<style scoped>
</style>