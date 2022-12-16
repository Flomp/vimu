<template>
    <div class="px-6">
        <p class="pb-4" style="max-width: 400px; font-size:1.1rem">
            <b>vimu</b> is the modern way to analyse your music.
            It provides a rich toolbox for researchers, students and enthusiasts.
        </p>
        <v-row class="pb-4 align-center">
            <v-col cols="auto">
                <vimu-btn :large="true">Documentation</vimu-btn>
            </v-col>
            <v-col>
                <vimu-btn :primary="true" :large="true" @click="action('primary')">Get started</vimu-btn>
            </v-col>
        </v-row>
    </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import VimuBtn from "~/components/vimu/vimu_button.vue";

@Component({
    components: {
        VimuBtn
    }
})
export default class IndexHeroControlComponent extends Vue {
    @Prop() readonly!: boolean;
    @Prop() emitter!: NodeEditor;
    @Prop() ikey!: String;
    @Prop() getData!: Function;
    @Prop() putData!: Function;

    action(trigger: string) {
        this.emitter.trigger("process", {
            trigger: trigger
        });
    }
}
</script>
  
  
  
<style>
.the-visual-musicology-editor .title {
    margin-left: 24px;
    font-size: 3.75rem !important;
    font-weight: 700;
    line-height: 3.75rem;
    letter-spacing: -0.0083333333em !important;
    font-family: Inter !important;
    padding-top: 24px !important;
    max-width: 600px;
}

@media only screen and (max-width: 400px) {
    .the-visual-musicology-editor .title {
        font-size: 3.2rem !important;
    }
}
</style>