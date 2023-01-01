<template>
    <svg :width="width" viewBox="0 0 2951 2400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="804" cy="1379.5" rx="804" ry="794.5" fill="#e9eaff" />
        <ellipse cx="1251" cy="888.5" rx="868" ry="888.5" fill="#e9eaff" />
        <ellipse cx="1894" cy="811.5" rx="643" ry="621.5" fill="#e9eaff" />
        <ellipse cx="2422.5" cy="1280" rx="528.5" ry="497" fill="#e9eaff" />
        <ellipse cx="1773.5" cy="1644.5" rx="763.5" ry="755.5" fill="#e9eaff" />
        <ellipse cx="2551.5" cy="1777" rx="399.5" ry="397" fill="#e9eaff" />
    </svg>

</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class Cloud3 extends Vue {
    @Prop() readonly width!: number
}
</script>

<style>

</style>