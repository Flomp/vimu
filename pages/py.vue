<template>
  <div>
    <v-btn color="success" @click="clicked">Click me</v-btn>
    <span>{{ key }}</span>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js"></script>
    <script type="text/javascript">
</script>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component({})
export default class PyPage extends Vue {
  pyodide!: any;
  loading: boolean = true;
  start: number = new Date().getTime();
  key = "";

  async clicked() {
    const choral = "bach/bwv65.2.xml";
    this.$pyodide.registerJsModule("choral_namespace", { choral: choral });
    this.key = await this.$pyodide.runPython(`
  from music21 import *
  from choral_namespace import choral
  s = corpus.parse(choral)
  s.analyze('key')
`);
    this.loading = false;
  }
}
</script>

<style>
</style>