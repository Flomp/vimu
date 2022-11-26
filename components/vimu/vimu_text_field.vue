<template>
  <v-text-field
    class="vimu-text-field"
    v-model="model"
    :label="label"
    :type="type"
    :rules="rules"
    :hide-details="hideDetails"
    :prepend-inner-icon="prependInnerIcon"
    :prepend-icon="prependIcon"
    :placeholder="placeholder"
    :disabled="disabled"
    validate-on-blur
    outlined
    :clearable="clearable"
  ><template v-slot:append>
    <slot></slot>
  </template></v-text-field>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Emit } from "nuxt-property-decorator";

@Component({})
export default class VimuTextField extends Vue {
    @VModel() model!: string;
    @Prop() readonly label!: string;
    @Prop() readonly type!: string;
    @Prop() readonly rules!: Function[];
    @Prop({default: false}) readonly hideDetails!: boolean;
    @Prop() readonly prependInnerIcon!: string;
    @Prop() readonly prependIcon!: string;
    @Prop() readonly placeholder!: string;
    @Prop({default: false}) readonly clearable!: boolean;
    @Prop({default: false}) readonly disabled!: boolean;

}
</script>

<style>
.vimu-text-field fieldset{
    border: 2px solid currentColor !important;
}

.vimu-text-field .v-input__append-inner {
  margin-top: 19px !important
}
</style>