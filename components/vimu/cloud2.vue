<template>
    <svg :width="width" viewBox="0 0 2481 1558" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="387.5" cy="775.5" r="387.5" fill="#e9eaff" />
        <circle cx="1409.5" cy="486.5" r="486.5" fill="#e9eaff" />
        <circle cx="923" cy="841" r="651" fill="#e9eaff" />
        <circle cx="1896" cy="973" r="585" fill="#e9eaff" />
    </svg>

</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class Cloud2 extends Vue {
    @Prop() readonly width!: number
}
</script>

<style>

</style>