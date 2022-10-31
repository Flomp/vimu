<template>
    <div class="px-6">
        <p class="pb-4" style="max-width: 400px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus viverra maecenas est, lacus, lectus
            viverra.
            Viverra scelerisque nisl id cursus porta ut vel. Adipiscing semper congue.
        </p>
        <div class="d-flex pb-4 align-center">
            <vimu-btn class="mx-2" :large="true">Documentation</vimu-btn>
            <vimu-btn class="mx-2" :primary="true" :large="true" @click="action('primary')">Get started</vimu-btn>
        </div>
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

</style>