<template>
  <div>
    <timer-text-field v-model="value" @update="update"></timer-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { NodeEditor } from "rete";
import TimerTextField from "~/components/timer_text_field.vue";

@Component({
  components: {
    TimerTextField,
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