<template>
    <div class="d-flex">

        <v-btn v-for="item, i  in items" :key="i" class="palette-button" text @click="menuClick(item)">
            <div class="pa-1 d-flex">
                <div>
                    <v-icon color="primary">{{ item.icon }}</v-icon>
                    <br>
                    <span class="palette-button-text"> {{
                        item.name
                    }} </span>
                </div>
            </div>
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "nuxt-property-decorator";
import { MenuItem } from "~/components/editor/palette/menu_item";

@Component({})
export default class ComponentPalette extends Vue {
    items: MenuItem[] = [
        {
            name: "Text Field",
            icon: "mdi-cursor-text",
            key: "text_field"
        }
    ]

    @Emit()
    menuClick(item: MenuItem) {       
        return item;
    }
}
</script>

<style></style>