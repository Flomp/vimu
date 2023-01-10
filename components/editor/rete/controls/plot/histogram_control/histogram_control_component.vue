<template>
    <div style="max-width: 200px;">
        <span>X Axis</span>
        <vimu-select class="mr-6" v-model="xAxis" :items="items" @change="update"></vimu-select>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import VimuSelect from "~/components/vimu/vimu_select.vue";
import { AxisType } from "../plot_control/plot_control_component.vue";

@Component({
    components: {
        VimuSelect
    }
})
export default class PlotControlComponent extends Vue {
    @Prop() readonly!: boolean;
    @Prop() emitter!: NodeEditor;
    @Prop() ikey!: String;
    @Prop() getData!: Function;
    @Prop() putData!: Function;

    xAxis: AxisType = AxisType.GENERIC;

    get items() {
        return Object.values(AxisType)
    }

    mounted() {
        if (this.getData("xAxis") !== undefined) {
            this.xAxis = this.getData("xAxis")
        }
        this.putData("xAxis", this.xAxis);
    }

    update() {
        if (this.ikey) {
            this.putData("xAxis", this.xAxis);
        }
        this.emitter.trigger("process");
    }
}
</script>

<style>

</style>