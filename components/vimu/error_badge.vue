<template>
    <v-tooltip bottom color="error" max-width="200">
        <template v-slot:activator="{ on, attrs }">
            <i v-bind="attrs" v-on="on" class="v-icon notranslate mdi mdi-alert-octagon theme--light error--text"
                style="float:right"></i>
        </template>
        <p class="ma-0">{{ error }}</p>
    </v-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class ErrorBadge extends Vue {
    @Prop() error!: string;

    mounted() {
        console.log(this.error);

    }
}
</script>

<style>

</style>