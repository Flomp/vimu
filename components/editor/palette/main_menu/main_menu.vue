<template>
  <v-menu offset-y nudge-bottom="4" content-class="vimu-menu elevation-0 left-menu-offset" eager>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="palette-button" v-bind="attrs" v-on="on" text>
        <div class="ma-1 d-flex">
          <div>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM22.5635 25.2574C24.0279 23.8003 24.1839 22.3524 24.1839 20.1234C24.1839 17.8943 23.1295 15.5159 21.6651 14.0588C21.0653 13.462 20.2567 13.0164 19.3582 12.6988C19.4513 12.5162 19.6146 12.3117 19.7289 12.1719C19.8058 12.0779 19.8801 11.9828 19.9545 11.8877L19.9545 11.8877L19.9545 11.8877L19.9545 11.8876L19.9546 11.8876L19.9547 11.8874L19.9548 11.8873L19.9548 11.8873C20.0888 11.7159 20.2227 11.5446 20.3709 11.3807C20.5481 11.1846 20.7256 10.989 20.903 10.7933C21.4319 10.2103 21.9605 9.62767 22.4802 9.03579C23.1721 8.24779 23.6778 7.39672 23.6778 6.32766C23.6778 5.94269 23.6526 5.57694 23.4476 5.24154C23.2535 4.92386 22.9088 4.69621 22.5755 4.54742C22.0336 4.30553 21.3863 4.30463 20.8042 4.34243C20.2887 4.3759 19.7968 4.56966 19.3477 4.81356C18.9162 5.04789 18.6114 5.34712 18.4342 5.80978C18.2865 6.19533 18.1871 6.64386 18.1447 7.05415C17.9719 8.72385 17.9733 10.3072 17.9747 11.9692L17.9749 12.319C17.0821 12.1356 16.1623 12.0533 15.3117 12.0533C15.0598 12.0533 14.8168 12.0621 14.5819 12.0798C14.5834 11.7242 14.5914 11.3678 14.5993 11.0114C14.6352 9.40144 14.6711 7.79181 14.1129 6.25673C13.8977 5.66504 13.5183 5.00064 12.8651 4.8221C12.0416 4.59701 11.1078 4.90615 10.3918 5.30778C9.49439 5.81122 8.24994 6.87956 8.5425 8.04628C8.84931 9.26984 9.96049 10.0527 10.9611 10.7578C11.1138 10.8653 11.2638 10.971 11.408 11.0762C11.7963 11.3594 12.1159 11.6303 12.4472 11.911L12.4472 11.911L12.4472 11.911C12.6229 12.0599 12.8018 12.2115 12.996 12.3692C11.8509 12.7213 10.9005 13.3715 9.98512 14.3396C8.62208 15.781 7.34591 18.7931 7.34591 20.9336C7.34591 21.1428 7.34798 21.341 7.353 21.5296C7.28199 21.5485 7.20107 21.5818 7.18783 21.5899C7.12986 21.6255 7.07721 21.6849 7.03333 21.7361C6.90233 21.8889 6.91432 22.1021 6.92515 22.2946C6.92645 22.3178 6.92774 22.3406 6.92875 22.363C6.93827 22.5724 6.98833 22.802 7.08146 22.9916C7.15823 23.148 7.25159 23.3142 7.42016 23.385C7.47076 23.4063 7.53766 23.4023 7.59999 23.3983C7.81995 24.1253 8.21875 24.7499 8.92622 25.4981C10.3828 27.0384 13.0593 27.0384 15.3521 27.0383H15.3999C17.6145 27.0383 21.1086 26.7051 22.5635 25.2574Z"
                fill="black" />
            </svg>
            <br>
            <span class="palette-button-text"> Menu </span>
          </div>


          <v-icon small>mdi-chevron-down</v-icon>
        </div>

      </v-btn>
    </template>
    <v-list-item class="my-2" dense @click="back">
      <v-list-item-title>
        Back to files
      </v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>
    <file-menu v-if="!readonly"></file-menu>
    <edit-menu v-if="!readonly"></edit-menu>
    <view-menu></view-menu>


  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { fileStore } from "~/store";
import { } from "../menu_item";
import EditMenu from "./edit_menu.vue";
import FileMenu from "./file_menu.vue";
import ViewMenu from "./view_menu.vue";

@Component({
  components: {
    FileMenu,
    EditMenu,
    ViewMenu,
  },
})
export default class MainMenu extends Vue {
  get readonly() {
    return fileStore.readonly;
  }

  back() {
    this.$router.back();
  }
}
</script>

<style >
.menu-item {
  letter-spacing: inherit;
}

.vimu-editor-header {
  background-color: rgb(245, 245, 245);
}
</style>