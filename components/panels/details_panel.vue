<template>
  <div>
    <v-list-item style="height: 64px">
      <v-list-item-content>
        <v-list-item-title class="text-h5"> Details </v-list-item-title>
      </v-list-item-content>
      <v-btn icon @click="removeNode()" v-if="selectedNode">
        <v-icon>mdi-delete-circle</v-icon>
      </v-btn>
    </v-list-item>

    <div v-if="selectedNode">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 mb-2"> Name </v-list-item-title>
          <v-text-field
            v-model="selectedNode.name"
            solo
            hide-details
            @input="updateSelected()"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 mb-2"> Value </v-list-item-title>
          <code>{{ nodeData }}</code>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Outputs</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="addOutput"
            ><v-icon>mdi-plus-circle</v-icon></v-btn
          >
        </v-list-item-action>
      </v-list-item>

      <v-list-item v-for="(o, i) in outputs" :key="o.key">
        <v-list-item-avatar> {{ i + 1 }}. </v-list-item-avatar>
        <v-text-field
          label="Name"
          v-model="o.name"
          solo
          dense
          hide-details
          @input="updateSelected()"
        ></v-text-field>
        <v-list-item-action>
          <v-btn icon @click="removeOutput(o)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-list-item-action>
      </v-list-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import Rete, { Node, Output } from "rete";
import { reteStore } from "~/store/rete";
import { sockets } from "../rete/sockets/sockets";

@Component({})
export default class DetailsPanel extends Vue {
  reteStore = reteStore;
  
  get selectedNode(): Node | undefined {
    return reteStore.editor?.selected.list[0];
  }

  get nodeData(): any | undefined {
    return this.selectedNode?.data.data;
  }

  get outputs() {
    return this.selectedNode?.outputs.values();
  }

  updateSelected() {
    this.selectedNode?.update();
    if (this.selectedNode) {
      reteStore.editor!.selectNode(this.selectedNode);
    }
  }

  addOutput() {
    const outputIndex = (this.selectedNode?.outputs.size ?? 0) + 1;

    this.selectedNode?.addOutput(
      new Rete.Output("out_" + outputIndex, "Output", sockets.number)
    );
    this.selectedNode?.update();
    this.updateSelected();
  }

  removeOutput(output: Output) {
    for (let index = output.connections.length - 1; index >= 0; index--) {
      const element = output.connections[index];
      reteStore.editor?.removeConnection(element);
    }

    this.selectedNode?.removeOutput(output);
    this.updateSelected();
  }

  removeNode() {
    if (this.selectedNode && reteStore.editor) {
      reteStore.editor?.removeNode(this.selectedNode);
      reteStore.editor.selected.clear();
    }
  }
}
</script>

<style>
</style>