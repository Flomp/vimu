<template>
  <v-menu :close-on-content-click="closeOnContentClick" :offset-x="isOffsetX" :offset-y="isOffsetY" :open-on-hover="isOpenOnHover"
    :transition="transition" :position-x="positionX" :position-y="positionY" :absolute="absolute" :nudge-bottom="nudgeBottom" v-model="menuOpened"
    :content-class="removeForcedOffset ? 'left-menu-offset vimu-menu elevation-0' : 'vimu-menu elevation-0'">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item class="d-flex justify-space-between" v-on="on" v-if="isSubMenu" :dense="dense" link>
        <v-list-item-title>
          {{ name }}
        </v-list-item-title>
        <div class="flex-grow-1"></div>
        <v-icon> mdi-chevron-right </v-icon>
      </v-list-item>

      <slot name="activator" :on="on" :attrs="attrs" v-else></slot>
    </template>
    <v-list :dense="dense">
      <template v-for="(item, index) in items">
        <sub-menu :is-offset-x="true" :is-offset-y="false" :is-open-on-hover="true" :is-sub-menu="true" :key="'m'+index"
          :items="item.children" :name="item.name" :dense="dense" @menu-click="menuClick" v-if="item.children" />
        <template v-else>
          <v-list-item :key="index" @click="menuClick(item)" :disabled="item.disabled === true">
            <v-list-item-action v-if="item.icon">
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-icon class="mr-4" size="16" v-if="item.selected">mdi-check</v-icon>
            <v-list-item-content>
              <v-list-item-title :class="{ 'ml-8': item.selected === false }">
                <span>{{ item.name }}</span>
              </v-list-item-title>
            </v-list-item-content>
            <kbd class="ml-8" v-if="item.keybinding">{{item.keybinding}}</kbd>
          </v-list-item>
          <v-divider v-if="item.divider" :key="'d' + index"></v-divider>
        </template>
      </template>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import {
Component, Emit, Prop, VModel, Vue
} from "nuxt-property-decorator";
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
  @Prop({ default: false }) closeOnContentClick!: boolean;
  @Prop({ default: false }) isSubMenu!: boolean;
  @Prop({ default: "fade-transition" }) transition!: string;
  @Prop() readonly positionX!: number;
  @Prop() readonly positionY!: number;
  @Prop() readonly absolute!: boolean;
  @Prop() readonly dense!: boolean;
  @Prop() readonly removeForcedOffset!: boolean;
  @Prop() readonly nudgeBottom!: number | string;

  @VModel({ default: () => false }) menuOpened!: boolean;

  @Emit()
  menuClick(item: MenuItem) {
    this.menuOpened = false;

    return item;
  }
}
</script>

<style>

</style>