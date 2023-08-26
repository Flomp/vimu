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
            name: "Text Input",
            icon: "mdi-cursor-text",
            key: "text"
        },
        {
            name: "Number Input",
            icon: "mdi-numeric",
            key: "number"
        },
        {
            name: "Checkbox",
            icon: "mdi-checkbox-outline",
            key: "bool"
        },
        {
            name: "Selectbox",
            icon: "mdi-form-select",
            key: "select"
        }
    ]

    @Emit()
    menuClick(item: MenuItem) {
        return item;
    }
}
</script>

<style>
.palette-button {
    padding: 0 !important;
    margin: 0 8px;
    height: auto !important;
}

.palette-button-text {
    text-transform: none;
    letter-spacing: normal;
    font-size: 0.75rem;

}
</style>