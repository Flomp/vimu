<template>
    <div style="max-width: 200px;">
        <span>X Axis</span>
        <vimu-select class="mr-6" v-model="xAxis" :items="items" @change="update"></vimu-select>
        <span>Y Axis</span>
        <vimu-select class="mr-6" v-model="yAxis" :items="items" @change="update"></vimu-select>

    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import VimuSelect from "~/components/vimu/vimu_select.vue";

enum AxisType {
    //GENERIC = 'generic',
    DYNAMIC = 'dynamic',
    OFFSET = 'offset',
    //OFFSET_END = 'offsetEnd',
    PITCH_CLASS = 'pitchClass',
    PITCH_SPACE = 'pitchSpace',
    PITCH_OCTAVE = 'octave',
    //POSITION = 'position',
    QUARTER_LENGTH = 'quarterLength'
}

export {AxisType}

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

    xAxis: AxisType = AxisType.PITCH_CLASS;
    yAxis: AxisType = AxisType.QUARTER_LENGTH;

    get items() {
        return Object.values(AxisType).map(o => {
            return {
                text: o.charAt(0).toUpperCase() + o.slice(1, o.length), 
                value: o
            }
        })
    }

    mounted() {
        if (this.getData("xAxis") !== undefined) {
            this.xAxis = this.getData("xAxis")
        }
        if (this.getData("yAxis") !== undefined) {
            this.yAxis = this.getData("yAxis")
        }
        this.putData("xAxis", this.xAxis);
        this.putData("yAxis", this.yAxis);
    }

    update() {
        if (this.ikey) {
            this.putData("xAxis", this.xAxis);
            this.putData("yAxis", this.yAxis);
        }
        this.emitter.trigger("process");
    }
}
</script>

<style>

</style>