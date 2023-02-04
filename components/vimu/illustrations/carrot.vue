<template>
    <svg :width="width" viewBox="0 0 393 872" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="283.323" cy="179.625" rx="46.174" ry="121.051" transform="rotate(36.5934 283.323 179.625)"
            fill="#469B46" />
        <ellipse cx="46.174" cy="121.051" rx="46.174" ry="121.051"
            transform="matrix(-0.802886 0.596133 0.596133 0.802886 74.1449 54.9097)" fill="#50A650" />
        <path
            d="M289.411 132.273C282.179 198.735 246.098 302.048 215.815 298.753C185.533 295.458 172.518 186.802 179.75 120.34C186.982 53.8782 217.393 2.67129 247.676 5.96649C277.958 9.2617 296.643 65.8112 289.411 132.273Z"
            fill="#4EA54E" />
        <path
            d="M103.146 132.273C110.379 198.735 146.46 302.048 176.742 298.753C207.024 295.458 220.04 186.802 212.808 120.34C205.575 53.8782 175.164 2.67129 144.882 5.96649C114.6 9.2617 95.9142 65.8112 103.146 132.273Z"
            fill="#329532" />
        <path
            d="M358.16 437.405C358.16 540.788 285.945 871.69 196.863 871.69C107.781 871.69 35.5664 540.788 35.5664 437.405C35.5664 334.022 107.781 250.213 196.863 250.213C285.945 250.213 358.16 334.022 358.16 437.405Z"
            fill="#FD8B2B" />
        <path d="M179.08 477.654C191.776 489.08 203.825 489.581 213.461 476.091" stroke="black" stroke-width="15"
            stroke-linecap="round" />
        <circle cx="79.5565" cy="475.779" r="22.775" fill="#FE572A" />
        <circle cx="309.802" cy="475.779" r="22.775" fill="#FE572A" />
        <circle cx="160.361" cy="410.574" r="11.2315" fill="black" />
        <circle cx="233.366" cy="410.574" r="11.2315" fill="black" />
        <path d="M79.2861 623.32C102.337 623.32 125.454 625.614 148.395 623.32" stroke="#FE572A" stroke-width="15"
            stroke-linecap="round" />
        <path d="M195.249 733.427H274.9" stroke="#FE572A" stroke-width="15" stroke-linecap="round" />
        <path d="M98.5878 312.61H198.152" stroke="#FE572A" stroke-width="15" stroke-linecap="round" />
        <path d="M245.617 582.324H313.555" stroke="#FE572A" stroke-width="15" stroke-linecap="round" />
    </svg>




</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class Carrot extends Vue {
    @Prop() readonly width!: number;
}
</script>

<style>

</style>