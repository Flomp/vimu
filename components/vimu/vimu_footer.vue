<template>
    <footer class="vimu-footer">
        <v-container class="fill-height">
            <v-row class="fill-height justify-sm-space-around ma-0" style="width: 100%">
                <v-col cols="12" lg="3" style="margin: auto 0">
                    <Logo :light="true" :width="212"></Logo>

                </v-col>
                <v-col cols="6" sm="3" class="d-flex flex-column mt-4">
                    <span class="vimu-footer-title pb-3">Product</span>
                    <span class="vimu-footer-text py-1">Editor</span>
                    <span class="vimu-footer-text py-1">Installation</span>
                    <span class="vimu-footer-text py-1">Pricing</span>
                </v-col>
                <v-col cols="6" sm="3" class="d-flex flex-column mt-4">
                    <span class="vimu-footer-title pb-3">Resources</span>
                    <span class="vimu-footer-text py-1">Documentation</span>
                    <span class="vimu-footer-text py-1">Examples</span>
                    <span class="vimu-footer-text py-1">Contact us</span>
                    <span class="vimu-footer-text py-1">Terms of service</span>
                    <span class="vimu-footer-text py-1">Privacy policy</span>
                </v-col>
                <v-col cols="6" sm="3" class="d-flex flex-column mt-4">
                    <span class="vimu-footer-title pb-3">Developers</span>
                    <span class="vimu-footer-text py-1">GitHub</span>
                    <span class="vimu-footer-text py-1">Contribute</span>
                    <span class="vimu-footer-text py-1">Changelog</span>
                </v-col>
            </v-row>
        </v-container>

    </footer>
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
    min-height: 256px;

    background-color: #161414;
    border-radius: 20px 20px 0 0;
    z-index: 10;
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