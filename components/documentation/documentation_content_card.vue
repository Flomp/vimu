<template>
    <v-card :to="to" class="vimu-card content-card" elevation="0">
        <v-card-title>
            {{ title }}
        </v-card-title>
        <v-card-text class="ellipsis-text">
            {{ text }}
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class DocumentationContentCard extends Vue {
    @Prop() title!: string;
    @Prop() text!: string;
    @Prop() to!: string;

}
</script>

<style>
.content-card:hover, .content-card:active {
    outline: 2px solid currentColor;
}
.ellipsis-text {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>