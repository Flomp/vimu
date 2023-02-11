<template>
    <v-container class="fill-height">
        <v-row class="justify-center align-center">
            <v-col style="flex: 0 0 400px">
                <h1 class="vimu-title">Contact us. We'd love to here from you!</h1>
            </v-col>
            <v-col>
                <div class="vimu-card contact-card">
                    <h2>Send us an email</h2>

                    <p class="mt-4 mb-8">Do you have questions, bug reports, feature requests, complaints or just want
                        to
                        have a
                        chat?
                        Send us an email and we will get back to you shortly!
                    </p>

                    <vimu-btn :primary="true" href="mailto:info@vimu.app">info@vimu.app</vimu-btn>
                </div>
            </v-col>
        </v-row>


    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import VimuBtn from "~/components/vimu/vimu_button.vue";

@Component({
    components: {
        VimuBtn
    }
})
export default class ContactPage extends Vue {
}
</script>

<style>
.contact-card {
    max-width: 400px;
    padding: 32px;
    margin: auto
}
</style>