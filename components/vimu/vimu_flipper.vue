<template>
    <div :class="['Flipper', { 'Flipper--flipped': flipped }]"
        :style="styles.wrapper">
        <div class="Flipper__face Flipper__face--front" :style="styles.face">
            <slot name="front" />
        </div>
        <div class="Flipper__face Flipper__face--back" :style="styles.face">
            <slot name="back" />
        </div>
    </div>
</template>
  
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class VimuFlipper extends Vue {
    @Prop() flipped!: boolean;
    @Prop({ default: '100%' }) width!: string;
    @Prop({ default: '100%' }) height!: string;
    @Prop({ default: '0.5s' }) duration!: string;
    @Prop({ default: 'ease-in' }) transition!: string;

    styles = {
        wrapper: { width: this.width, height: this.height },
        face: {
            transitionDuration: this.duration,
            transitionTimingFunction: this.transition
        }
    };

}
</script>
  
<style lang="scss">
.Flipper {
    position: relative;
    perspective: 1000px;
    top: 50%;
    transform: translateY(calc(-587.4px / 2))
}

.Flipper__face {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    transform-style: preserve-3d;
    backface-visibility: hidden;
}

.Flipper__face--back,
.Flipper--flipped .Flipper__face--front {
    transform: rotateY(-180deg);
    visibility: hidden;
}

.Flipper--flipped {
    .Flipper__face--back {
        transform: rotateY(-360deg);
        visibility: visible;
    }
}
</style>