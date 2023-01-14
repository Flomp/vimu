<template>
    <div class="vimu-card pa-5">
        <p class="vimu-card-title">
            {{ title }}
        </p>
        <p class="vimu-text pb-2">
            <slot></slot>
        </p>
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
export default class VimuCard extends Vue {
    @Prop() readonly title!: string;
    @Prop() readonly callToAction!: string;
    @Prop() readonly to!: string;

}
</script>

<style>
.vimu-card {
    outline: 2px solid currentColor;
    border-radius: 10px;
}

.vimu-card-title {
    font-size: 1.4rem;
    font-weight: 700;
}
</style>