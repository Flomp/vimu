<template>
    <div>
        <h5 class="pb-4">Properties</h5>

        <template v-if="activeElement === null">
            <vimu-text-field class="mt-1" v-model="plugin.name" label="Name"></vimu-text-field>
            <vimu-textarea v-model="plugin.description" label="Description"></vimu-textarea>
        </template>
        <template v-else>
            <vimu-text-field class="mt-1" v-model="activeElement.name" label="Name"></vimu-text-field>
            <template v-for="attribute in activeElement.atrributes">
                <vimu-text-field v-model="attribute.value" :label="attribute.name"
                    v-if="attribute.type = 'string'"></vimu-text-field>
            </template>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";
import VimuTextarea from "~/components/vimu/vimu_textarea.vue";
import { Plugin, PluginControl } from "~/models/plugin";

@Component({
    components: {
        VimuTextField,
        VimuTextarea
    }
})
export default class PluginProperties extends Vue {
    @Prop()
    plugin!: Plugin
    @Prop()
    activeElement!: PluginControl | null
}
</script>

<style></style>