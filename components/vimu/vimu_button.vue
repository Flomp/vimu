<template>
    <v-btn class="vimuBtn" :class="{ 'vimuBtn--secondary': !primary }" :outlined="!primary"
        :color="color" :dark="primary && !disabled" elevation="0" :x-large="xLarge" :large="large" :to="to"
        :loading="loading" :disabled="disabled" :text="text" @click="click">
        <span class="font-weight-bold">
            <slot></slot>
        </span>
    </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "nuxt-property-decorator";

@Component({})
export default class VimuBtn extends Vue {
    @Prop() readonly primary!: boolean;
    @Prop() readonly danger!: boolean;
    @Prop() readonly large!: boolean;
    @Prop() readonly xLarge!: boolean;
    @Prop() readonly to!: string;
    @Prop() readonly loading!: boolean;
    @Prop() readonly disabled!: boolean;
    @Prop() readonly text!: boolean;

    get color() {
        if(this.primary) {
            return "accent"
        }else if(this.danger) {
            
            return "error"
        }
        return null
    }

    @Emit()
    click() {
        return;
    }

}
</script>

<style scoped>
.vimuBtn {
    border-radius: 8px !important;
}

.v-btn::before {
    border-radius: initial !important;
}

.vimuBtn--secondary {
    border: 2px solid !important
}
</style>