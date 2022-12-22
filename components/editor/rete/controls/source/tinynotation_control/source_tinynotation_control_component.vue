<template>
  <div>
    <vimu-text-field class="mr-6" v-model="value" :timer="true" @update="update" style="max-width: 200px"></vimu-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import VimuTextField from "~/components/vimu/vimu_text_field.vue";

@Component({
  components: {
    VimuTextField
  },
})
export default class SourceTinynotationControlComponent extends Vue {
  @Prop() readonly!: boolean;
  @Prop() emitter!: NodeEditor;
  @Prop() ikey!: String;
  @Prop() getData!: Function;
  @Prop() putData!: Function;

  value: string = "";

  mounted() {
    this.value = this.getData(this.ikey);
  }

  update() {
    if (this.ikey) {
      this.putData(this.ikey, this.value);
    }
    this.emitter.trigger("process");
  }
}
</script>



<style scoped>
</style>