<template>
    <vimu-text-field v-model="query" placeholder="Username" :hide-details="true">
        <vimu-btn :primary="true" @click="add" :loading="loading" :disabled="loading" style="margin-top: -7px">Add</vimu-btn>

    </vimu-text-field>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "nuxt-property-decorator";
import VimuBtn from "../vimu/vimu_button.vue";
import VimuTextField from "../vimu/vimu_text_field.vue";


@Component({
    components: {
        VimuTextField,
        VimuBtn
    }
})
export default class UserSearch extends Vue {

    @Prop() loading!: boolean;

    query: string = ""

    @Emit()
    add(): string | null {
        if (!this.query.length) {
            return null;
        }
        const query_ = this.query;
        this.query = "";
        return query_;
    }


}
</script>

<style>

</style>