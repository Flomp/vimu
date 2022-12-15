<template>
  <div>
    <v-form ref="form">
      <v-switch class="mr-2" v-model="autoDetect" label="Auto-Detect key" inset @change="update"></v-switch>
      <vimu-text-field class="mr-6" v-model="key" label="Key" placeholder="(e.g. f-)" :disabled="autoDetect" :rules="[keyRule]"
        :validate-on-blur="false" :timer="true" @update="update" style="max-width: 112px"
        ></vimu-text-field>
    </v-form>

  </div>

</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import VimuSelect from "~/components/vimu/vimu_select.vue";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";

@Component({
  components: {
    VimuSelect,
    VimuTextField
  }
})
export default class AnalysisRomanNumeralControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  @Ref() readonly form!: HTMLFormElement;

  autoDetect: boolean = true;

  key: string = "";

  keyRule = (value: string | undefined) => {
    return (value?.match('^[A-Ha-h][#-]?$')?.length ?? 0) > 0 || 'Not a valid key'
  }

  mounted() {
    this.key = this.getData(this.ikey)

    if (this.getData("auto") !== undefined) {
      this.autoDetect = this.getData("auto");
    }
  }

  update() {
    if (this.ikey) {
      if(!this.form.validate() && !this.autoDetect) {
        return
      }
      this.putData(this.ikey, this.autoDetect ? null : this.key);
    }
    this.putData("auto", this.autoDetect);
    this.emitter.trigger("process");
  }
}
</script>



<style scoped>

</style>