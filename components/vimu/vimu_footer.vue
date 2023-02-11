<template>
    <footer class="vimu-footer">
        <v-container class="fill-height">
            <v-row class="fill-height justify-sm-space-around ma-0" style="width: 100%">
                <v-col cols="12" lg="3" style="margin: auto 0">
                    <Logo :light="true" :width="212"></Logo>

                </v-col>
                <v-col cols="6" sm="3" class="d-flex flex-column mt-4">
                    <span class="vimu-footer-title pb-3">Product</span>
                    <nuxt-link to="/dashboard/files/my" class="vimu-footer-text py-1">Editor</nuxt-link>
                    <span class="vimu-footer-text py-1">Installation</span>
                    <nuxt-link to="/pricing" class="vimu-footer-text py-1">Pricing</nuxt-link>
                </v-col>
                <v-col cols="6" sm="3" class="d-flex flex-column mt-4">
                    <span class="vimu-footer-title pb-3">Resources</span>
                    <nuxt-link to="/docs" class="vimu-footer-text py-1">Documentation</nuxt-link>
                    <nuxt-link to="/docs/tutorials" class="vimu-footer-text py-1">Examples</nuxt-link>
                    <nuxt-link to="/contact" class="vimu-footer-text py-1">Contact us</nuxt-link>
                    <nuxt-link to="/tos" class="vimu-footer-text py-1">Terms of service</nuxt-link>
                    <nuxt-link to="/privacy" class="vimu-footer-text py-1">Privacy policy</nuxt-link>
                </v-col>
                <v-col cols="6" sm="3" class="d-flex flex-column mt-4">
                    <span class="vimu-footer-title pb-3">Developers</span>
                    <a href="https://github.com/flomp/vimu" class="vimu-footer-text py-1">GitHub</a>
                    <a href="https://github.com/flomp" class="vimu-footer-text py-1">Contribute</a>
                    <a href="https://github.com/flomp/vimu/CHANGELOG.md" class="vimu-footer-text py-1">Changelog</a>
                </v-col>
            </v-row>
        </v-container>

    </footer>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import Logo from "./illustrations/logo.vue";
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
    color: #d4d4d4 !important;
    font-size: 1rem !important;
    text-decoration: none;
}
</style>