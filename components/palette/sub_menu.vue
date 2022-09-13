<template>
  <v-menu
    :close-on-content-click="false"
    :offset-x="isOffsetX"
    :offset-y="isOffsetY"
    :open-on-hover="isOpenOnHover"
    :transition="transition"
    :position-x="positionX"
    :position-y="positionY"
    :absolute="!isSubMenu"
    v-model="menuOpened"
  >
    <template v-slot:activator="{ on }">
      <v-list-item
        class="d-flex justify-space-between"
        v-on="on"
        v-if="isSubMenu"
      >
        {{ name }}
        <div class="flex-grow-1"></div>
        <v-icon> mdi-chevron-right </v-icon>
      </v-list-item>
    </template>
    <v-list>
      <template v-for="(item, index) in items">
        <v-divider :key="index" v-if="item.isDivider" />
        <sub-menu
          :is-offset-x="true"
          :is-offset-y="false"
          :is-open-on-hover="true"
          :is-sub-menu="true"
          :key="index"
          :items="item.children"
          :name="item.name"
          @menu-click="menuClick"
          v-else-if="item.children"
        />
        <v-list-item :key="index" @click="menuClick(item)" v-else>
          <v-list-item-action v-if="item.icon">
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            {{ item.name }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, VModel } from "nuxt-property-decorator";
import { MenuItem } from "./menu_item";

@Component({
  name: "SubMenu",
  components: {
    SubMenu,
  },
})
export default class SubMenu extends Vue {
  @Prop() name!: string;
  @Prop() items!: MenuItem[];
  @Prop({ default: false }) isOffsetX!: boolean;
  @Prop({ default: true }) isOffsetY!: boolean;
  @Prop({ default: false }) isOpenOnHover!: boolean;
  @Prop({ default: false }) isSubMenu!: boolean;
  @Prop({ default: "fade-transition" }) transition!: string;
  @Prop() readonly positionX!: number;
  @Prop() readonly positionY!: number;
  @VModel() menuOpened!: boolean;

  @Emit()
  menuClick(item: MenuItem) {
    this.menuOpened = false;

    return item;
  }
}
</script>

<style>
</style>