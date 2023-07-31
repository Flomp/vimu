<template>
  <v-textarea class="vimu-text-area" v-model="model" :label="label" :type="type" :rules="rules"
    :hide-details="hideDetails" :prepend-inner-icon="prependInnerIcon" :prepend-icon="prependIcon"
    :placeholder="placeholder" :disabled="disabled" :validate-on-blur="validateOnBlur" outlined :clearable="clearable"
    @input="input" @blur="blur"><template v-slot:append>
      <slot></slot>
    </template></v-textarea>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Emit } from "nuxt-property-decorator";

@Component({})
export default class VimuTextarea extends Vue {
  @VModel() model!: string;
  @Prop() readonly label!: string;
  @Prop() readonly type!: string;
  @Prop() readonly rules!: Function[];
  @Prop({ default: false }) readonly hideDetails!: boolean;
  @Prop() readonly prependInnerIcon!: string;
  @Prop() readonly prependIcon!: string;
  @Prop() readonly placeholder!: string;
  @Prop({ default: false }) readonly clearable!: boolean;
  @Prop({ default: false }) readonly disabled!: boolean;
  @Prop({ default: true }) readonly validateOnBlur!: boolean;
  @Prop({ default: false }) readonly timer!: boolean;

  typingTimer!: NodeJS.Timeout;

  input(q: string) {
    return this.timer ? this.onType(q) : this.update(q)
  }

  onType(q: string) {
    clearTimeout(this.typingTimer);
    if (q) {
      this.typingTimer = setTimeout(() => {
        this.update(q);
      }, 1000);
    }
  }

  @Emit()
  update(q: string) {
    return q;
  }

  @Emit()
  blur(event: Event) {
    return event;
  }

}
</script>

<style>
.vimu-text-area fieldset {
  border: 2px solid currentColor !important;
}

</style>