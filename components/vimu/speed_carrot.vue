<template>
    <svg :width="width" viewBox="0 0 1206 953" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="1043.49" cy="263.309" rx="46.174" ry="121.051" transform="rotate(55.7265 1043.49 263.309)"
            fill="#469B46" />
        <ellipse rx="46.174" ry="121.051" transform="matrix(-0.953925 0.300045 0.300045 0.953925 879.023 206.249)"
            fill="#50A650" />
        <path
            d="M1064.77 220.568C1036.15 280.988 968.199 366.768 940.67 353.73C913.141 340.691 936.457 233.771 965.074 173.351C993.691 112.931 1039.21 74.5205 1066.74 87.5591C1094.26 100.598 1093.38 160.148 1064.77 220.568Z"
            fill="#4EA54E" />
        <path
            d="M888.791 159.517C873.84 224.678 874.066 334.11 903.755 340.923C933.444 347.735 981.354 249.348 996.306 184.186C1011.26 119.025 999.309 60.6793 969.62 53.867C939.931 47.0548 903.742 94.356 888.791 159.517Z"
            fill="#329532" />
        <path
            d="M1029.71 531.377C995.821 629.05 819.137 918.003 734.977 888.805C650.816 859.607 691.048 523.315 724.933 425.643C758.818 327.97 854.513 272.461 938.674 301.659C1022.84 330.857 1063.59 433.705 1029.71 531.377Z"
            fill="#FD8B2B" />
        <path d="M847.327 510.707C855.576 525.664 866.795 530.086 880.32 520.5" stroke="black" stroke-width="15"
            stroke-linecap="round" />
        <circle cx="753.915" cy="476.316" r="22.775" transform="rotate(19.1331 753.915 476.316)" fill="#FE572A" />
        <circle cx="971.442" cy="551.782" r="22.775" transform="rotate(19.1331 971.442 551.782)" fill="#FE572A" />
        <circle cx="851.628" cy="441.197" r="11.2315" transform="rotate(19.1331 851.628 441.197)" fill="black" />
        <circle cx="920.6" cy="465.126" r="11.2315" transform="rotate(19.1331 920.6 465.126)" fill="black" />
        <path d="M705.301 615.618C727.079 623.174 748.166 632.918 770.593 638.27" stroke="#FE572A" stroke-width="15"
            stroke-linecap="round" />
        <path d="M778.769 757.65L854.021 783.757" stroke="#FE572A" stroke-width="15" stroke-linecap="round" />
        <path d="M825.376 328.398L919.44 361.032" stroke="#FE572A" stroke-width="15" stroke-linecap="round" />
        <path d="M875.881 631.403L940.066 653.671" stroke="#FE572A" stroke-width="15" stroke-linecap="round" />
        <line x1="380" y1="632" x2="574" y2="632" stroke="black" stroke-width="10" />
        <line x1="298" y1="549" x2="656" y2="549" stroke="black" stroke-width="10" />
        <line x1="437" y1="425" x2="690" y2="425" stroke="black" stroke-width="10" />
        <line x1="327" y1="748" x2="656" y2="748" stroke="black" stroke-width="10" />
        <circle cx="466.5" cy="89.5" r="88.5" fill="#DDE0FF" />
        <circle cx="368.5" cy="125.5" r="97.5" fill="#DDE0FF" />
        <circle cx="483.5" cy="210.5" r="103.5" fill="#DDE0FF" />
        <circle cx="144" cy="419" r="80" fill="#DDE0FF" />
        <circle cx="97.5" cy="516.5" r="97.5" fill="#DDE0FF" />
        <circle cx="207.5" cy="498.5" r="63.5" fill="#DDE0FF" />
    </svg>

</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class SpeedCarrot extends Vue {
    @Prop({default: 1206}) readonly width!: number;
}
</script>

<style>

</style>