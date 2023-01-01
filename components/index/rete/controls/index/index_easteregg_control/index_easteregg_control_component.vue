<template>
    <div>
        <Bunny :width="200" v-if="!value"></Bunny>
        <HappyBunny :width="200" v-else></HappyBunny>

    </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import Bunny from "~/components/vimu/illustrations/bunny.vue";
import HappyBunny from "~/components/vimu/illustrations/happy_bunny.vue";

@Component({
    components: {
        Bunny,
        HappyBunny
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