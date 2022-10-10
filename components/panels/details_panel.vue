<template>
  <div>
    <div class="d-flex justify-space-between grey darken-4">
      <h5 class="text-button px-3">Details</h5>
      <v-btn icon @click="removeNode()" v-if="selectedNode">
        <v-icon size="20">mdi-delete</v-icon>
      </v-btn>
    </div>

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

      <h6 class="text-h6 mx-4">Data</h6>
      <v-expansion-panels
        accordion
        flat
        v-if="Object.keys(selectedNode.data).length > 0"
      >
        <v-expansion-panel
          v-for="[key, value] in Object.entries(selectedNode.data)"
          :key="key"
        >
          <v-expansion-panel-header> {{ key }} </v-expansion-panel-header>
          <v-expansion-panel-content style="max-height: 300px">
            <v-btn
              icon
              style="position: absolute; right: 16px"
              @click="copyToClipboard(value)"
            >
              <v-icon size="20">mdi-content-copy</v-icon></v-btn
            >
            <div style="height: 100%; overflow: scroll">
              <pre v-html="prettyXML(value)" v-if="key == 'xml'"></pre>
              <pre v-else>{{ value }}</pre>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <code class="mx-4 d-block text-center" v-else> No data </code>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Inputs</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-for="(o, i) in inputs" :key="o.key">
        <v-list-item-avatar> {{ i + 1 }}. </v-list-item-avatar>
        <v-text-field
          label="Name"
          v-model="o.name"
          solo
          dense
          hide-details
          @input="updateSelected()"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Outputs</v-list-item-title>
        </v-list-item-content>
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
      </v-list-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Node, Output } from "rete";
import { LogLevel } from "~/models/log";
import { logStore } from "~/store";
import { reteStore } from "~/store/rete";

@Component({})
export default class DetailsPanel extends Vue {
  reteStore = reteStore;

  get selectedNode(): Node | undefined {
    return reteStore.editor?.selected.list[0];
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

  prettyXML(value: string) {
    const Prism = require("~/assets/prism.js");

    return Prism.highlight(value, Prism.languages.html, "html");
  }

  updateSelected() {
    this.selectedNode?.update();
    if (this.selectedNode) {
      reteStore.editor!.selectNode(this.selectedNode);
    }
  }

  removeNode() {
    if (this.selectedNode && reteStore.editor) {
      logStore.log({
        level: LogLevel.info,
        text: `Removed node ${this.selectedNode.name}`,
      });

      reteStore.editor?.removeNode(this.selectedNode);
      reteStore.editor.selected.clear();
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
code[class*="language-"],
pre[class*="language-"] {
  color: #f8f8f2;
  background: 0 0;
  text-shadow: 0 1px rgba(0, 0, 0, 0.3);
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}
pre[class*="language-"] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
  border-radius: 0.3em;
}
:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: #272822;
}
:not(pre) > code[class*="language-"] {
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
}
.token.cdata,
.token.comment,
.token.doctype,
.token.prolog {
  color: #8292a2;
}
.token.punctuation {
  color: #f8f8f2;
}
.token.namespace {
  opacity: 0.7;
}
.token.constant,
.token.deleted,
.token.property,
.token.symbol,
.token.tag {
  color: #f92672;
}
.token.boolean,
.token.number {
  color: #ae81ff;
}
.token.attr-name,
.token.builtin,
.token.char,
.token.inserted,
.token.selector,
.token.string {
  color: #a6e22e;
}
.language-css .token.string,
.style .token.string,
.token.entity,
.token.operator,
.token.url,
.token.variable {
  color: #f8f8f2;
}
.token.atrule,
.token.attr-value,
.token.class-name,
.token.function {
  color: #e6db74;
}
.token.keyword {
  color: #66d9ef;
}
.token.important,
.token.regex {
  color: #fd971f;
}
.token.bold,
.token.important {
  font-weight: 700;
}
.token.italic {
  font-style: italic;
}
.token.entity {
  cursor: help;
}
</style>