<template>
    <div class="vimu-footer">
        <v-container class="fill-height">
            <div class="d-flex fill-height justify-space-around" style="width: 100%">
                <div style="margin: auto 0">
                    <Logo :light="true" :width="256"></Logo>

                </div>
                <div class="d-flex flex-column mt-4">
                    <span class="vimu-footer-title pb-3">Product</span>
                    <span class="vimu-footer-text py-1">Editor</span>
                    <span class="vimu-footer-text py-1">Installation</span>
                    <span class="vimu-footer-text py-1">Pricing</span>
                </div>
                <div class="d-flex flex-column mt-4">
                    <span class="vimu-footer-title pb-3">Resources</span>
                    <span class="vimu-footer-text py-1">Documentation</span>
                    <span class="vimu-footer-text py-1">Examples</span>
                    <span class="vimu-footer-text py-1">Contact us</span>
                    <span class="vimu-footer-text py-1">Terms of service</span>
                    <span class="vimu-footer-text py-1">Privacy policy</span>
                </div>
                <div class="d-flex flex-column mt-4">
                    <span class="vimu-footer-title pb-3">Developers</span>
                    <span class="vimu-footer-text py-1">GitHub</span>
                    <span class="vimu-footer-text py-1">Contribute</span>
                    <span class="vimu-footer-text py-1">Changelog</span>
                </div>
            </div>
        </v-container>

    </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import Logo from "./logo.vue";
@Component({
    components: {
        Logo
    }
})
export default class VimuFooter extends Vue {
}
</script>

<style>
.vimu-footer {
    height: 256px;

    background-color: #161414;
    border-radius: 20px 20px 0 0;
}

.vimu-footer-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #ffffff
}

.vimu-footer-text {
    color: #d4d4d4;
    font-size: 1rem !important;
}
</style>