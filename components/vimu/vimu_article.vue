<template>
    <div class="vimu-article">
        <h1 class="vimu-title">{{ title }}</h1>
        <div class="vimu-text py-6">
            <slot></slot>
        </div>
        <vimu-btn :to="to">{{ callToAction }}</vimu-btn>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import VimuBtn from "./vimu_button.vue";
@Component({
    components: {
        VimuBtn
    }
})
export default class VimuArticle extends Vue {
    @Prop() readonly title!: string;
    @Prop() readonly callToAction!: string;
    @Prop() readonly to!: string;


}
</script>

<style>

</style>