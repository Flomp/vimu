<template>
  <div>
    <div class="d-flex align-center justify-space-between vimu-editor-header" style="height: 36px">
      <h5 class="px-3">Details</h5>
    </div>

    <div v-if="selectedNode">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="mb-2 text-caption"> Type </v-list-item-title>
          <div class="d-flex align-center justify-space-between"> <span class="font-weight-bold">{{ selectedNode.name
}}</span>
            <v-btn icon :to="'/docs/nodes/'+selectedNode.name" target="_blank"><v-icon>mdi-help-circle</v-icon></v-btn>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mb-4"></v-divider>
      <span class="mx-4 text-caption">Data</span>
      <v-expansion-panels accordion flat v-if="Object.keys(selectedNode.data).length > 0">
        <v-expansion-panel v-for="[key, value] in Object.entries(selectedNode.data)" :key="key">
          <v-expansion-panel-header> {{ key }} </v-expansion-panel-header>
          <v-expansion-panel-content style="max-height: 300px">
            <v-btn icon style="position: absolute; right: 16px" @click="copyToClipboard(value)">
              <v-icon size="20">mdi-content-copy</v-icon>
            </v-btn>
            <div style="height: 100%; overflow: scroll">
              <pre>{{ value }}</pre>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <code class="mx-4 d-block text-center" v-else> No data </code>

      <template v-if="selectedNode.inputs.size">
        <v-divider class="mt-4 mb-2"></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-caption">Inputs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="(o, i) in inputs" :key="o.key">
          <v-list-item-avatar> {{ i + 1 }}. </v-list-item-avatar>
          <v-text-field label="Name" v-model="o.name" outlined dense hide-details @input="updateSelected()">
          </v-text-field>
        </v-list-item>
      </template>

      <template v-if="selectedNode.outputs.size">
        <v-divider class="mt-4 mb-2"></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-caption">Outputs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="(o, i) in outputs" :key="o.key">
          <v-list-item-avatar> {{ i + 1 }}. </v-list-item-avatar>
          <v-text-field label="Name" v-model="o.name" outlined dense hide-details @input="updateSelected()">
          </v-text-field>
        </v-list-item>
      </template>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue } from "nuxt-property-decorator";
import { Node, NodeEditor } from "rete";
import { LogLevel } from "~/models/log";
import { fileStore, logStore } from "~/store";

@Component({})
export default class DetailsPanel extends Vue {
  @InjectReactive()
  editor!: NodeEditor;

  get selectedNode(): Node | undefined {
    return this.editor?.selected.list[0];
  }

  get nodeData(): any | undefined {
    return this.selectedNode?.data.data ?? "No data";
  }

  get inputs() {   
    return this.selectedNode?.inputs.values();
  }

  get outputs() {
    return this.selectedNode?.outputs.values();
  }

  updateSelected() {
    this.selectedNode?.update();
    if (this.selectedNode) {
      this.editor!.selectNode(this.selectedNode);
    }
  }

  copyToClipboard(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      logStore.log({
        level: LogLevel.info,
        text: "Copied value to clipboard!",
      });
    });
  }
}
</script>

<style>

</style>