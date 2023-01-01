<template>
    <svg :width="width" viewBox="0 0 1826 1733" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="1414" cy="513.5" rx="412" ry="415.5" fill="#6ADC34" />
        <circle cx="421.5" cy="858.5" r="421.5" fill="#86D860" />
        <ellipse cx="851.5" cy="1251.5" rx="483.5" ry="481.5" fill="#7CEA49" />
        <ellipse cx="1485" cy="1095.5" rx="341" ry="325.5" fill="#79EF41" />
        <circle cx="843.5" cy="579.5" r="579.5" fill="#8CF15C" />
        <ellipse cx="1077" cy="1159" rx="258" ry="267" fill="#93F465" />
    </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class PlumeExplosion extends Vue {
    @Prop() readonly width!: number;
}
</script>

<style>

</style>