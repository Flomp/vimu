<template>
    <div class="vimu-article">
        <h1 class="vimu-title">{{ title }}</h1>
        <div class="vimu-text py-6">
            <slot></slot>
        </div>
        <vimu-btn>{{ callToAction }}</vimu-btn>
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

}
</script>

<style>
.vimu-article {
    padding-top: 64px;
    padding-bottom: 64px;
}
</style>