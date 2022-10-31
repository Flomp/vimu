<template>
    <div>
        <Bunny :width="200" :showCarrot="value"></Bunny>

    </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import Bunny from "~/components/vimu/bunny.vue";

@Component({
    components: {
        Bunny,
    }
})
export default class IndexEasterEggControlComponent extends Vue {
    @Prop() readonly!: boolean;
    @Prop() emitter!: NodeEditor;
    @Prop() ikey!: String;
    @Prop() getData!: Function;
    @Prop() putData!: Function;

    value: boolean = false;

}
</script>
  
  
  
<style>

</style>