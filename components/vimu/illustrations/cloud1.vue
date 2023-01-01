<template>
    <svg :width="width" viewBox="0 0 3158 2104" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="1772.5" cy="701" rx="725.5" ry="701" fill="#e9eaff" />
        <ellipse cx="2465.5" cy="1237" rx="692.5" ry="676" fill="#e9eaff" />
        <ellipse cx="1467.5" cy="1552" rx="618.5" ry="552" fill="#e9eaff" />
        <ellipse cx="849" cy="824.5" rx="849" ry="824.5" fill="#e9eaff" />
    </svg>

</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class Cloud1 extends Vue {
    @Prop() readonly width!: number
}
</script>

<style>

</style>