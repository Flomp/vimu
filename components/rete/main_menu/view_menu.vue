<template>
  <sub-menu
    v-model="open"
    :items="items"
    @menu-click="handleClick"
    name="View"
    :dense="true"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="text-capitalize rounded-0"
        elevation="0"
        v-bind="attrs"
        v-on="on"
        text
        >View</v-btn
      >
    </template>
  </sub-menu>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { MenuItem } from "~/components/palette/menu_item";
import SubMenu from "~/components/palette/sub_menu.vue";
import { Settings } from "~/models/settings";
import { settingsStore } from "~/store";

@Component({
  components: {
    SubMenu,
  },
})
export default class ViewMenu extends Vue {
  open: boolean = false;

  get items(): MenuItem[] {
    return [
      {
        name: "Score",
        key: "view_score",
        active: settingsStore.settings.view.score,
      },
      {
        name: "Log",
        key: "view_log",
        active: settingsStore.settings.view.log,
      },
    ];
  }
  
  handleClick(item: MenuItem) {
    switch (item.key) {
      case "view_score":
        this.toggleView("score");
        break;
      case "view_log":
        this.toggleView("log");
        break;
    }
  }

  toggleView(key: "score" | "log") {
    const settings: Settings = JSON.parse(
      JSON.stringify(settingsStore.settings)
    );
    settings.view[key] = !settings.view[key];

    settingsStore.changeSettings(settings);

    console.log(this.items[0]);
  }
}
</script>

<style>
</style>