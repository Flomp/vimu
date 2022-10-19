<template>
  <div>
    <div class="d-flex justify-space-between grey lighten-2">
      <h5 class="text-button px-3">Details</h5>
      <v-btn icon @click="removeNode()" v-if="selectedNode">
        <v-icon size="20">mdi-delete</v-icon>
      </v-btn>
    </div>

    <div v-if="selectedNode">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 mb-2"> Name </v-list-item-title>
          <v-text-field v-model="selectedNode.name" outlined hide-details @input="updateSelected()"></v-text-field>
        </v-list-item-content>
      </v-list-item>

      <h6 class="text-h6 mx-4">Data</h6>
      <v-expansion-panels accordion flat v-if="Object.keys(selectedNode.data).length > 0">
        <v-expansion-panel v-for="[key, value] in Object.entries(selectedNode.data)" :key="key">
          <v-expansion-panel-header> {{ key }} </v-expansion-panel-header>
          <v-expansion-panel-content style="max-height: 300px">
            <v-btn icon style="position: absolute; right: 16px" @click="copyToClipboard(value)">
              <v-icon size="20">mdi-content-copy</v-icon>
            </v-btn>
            <div style="height: 100%; overflow: scroll">
              <pre v-html="prettyXML(value)" v-if="key == 'xml'"></pre>
              <pre v-else>{{ value }}</pre>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <code class="mx-4 d-block text-center" v-else> No data </code>

      <template v-if="selectedNode.inputs.size">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">Inputs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="(o, i) in inputs" :key="o.key">
          <v-list-item-avatar> {{ i + 1 }}. </v-list-item-avatar>
          <v-text-field label="Name" v-model="o.name" outlined dense hide-details @input="updateSelected()"></v-text-field>
        </v-list-item>
      </template>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Outputs</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-for="(o, i) in outputs" :key="o.key">
        <v-list-item-avatar> {{ i + 1 }}. </v-list-item-avatar>
        <v-text-field label="Name" v-model="o.name" outlined dense hide-details @input="updateSelected()"></v-text-field>
      </v-list-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue } from "nuxt-property-decorator";
import { Node, NodeEditor } from "rete";
import { LogLevel } from "~/models/log";
import { logStore } from "~/store";

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

  prettyXML(value: string) {
    const Prism = require("~/assets/prism.js");

    return Prism.highlight(value, Prism.languages.html, "html");
  }

  updateSelected() {
    this.selectedNode?.update();
    if (this.selectedNode) {
      this.editor!.selectNode(this.selectedNode);
    }
  }

  removeNode() {
    if (this.selectedNode && this.editor) {
      logStore.log({
        level: LogLevel.info,
        text: `Removed node ${this.selectedNode.name}`,
      });

      this.editor?.removeNode(this.selectedNode);
      this.editor.selected.clear();
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
code[class*=language-],
pre[class*=language-] {
  color: #000;
  background: 0 0;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
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
  hyphens: none
}

pre[class*=language-] {
  position: relative;
  margin: .5em 0;
  overflow: visible;
  padding: 1px
}

pre[class*=language-]>code {
  position: relative;
  z-index: 1;
  border-left: 10px solid #358ccb;
  box-shadow: -1px 0 0 0 #358ccb, 0 0 0 1px #dfdfdf;
  background-color: #fdfdfd;
  background-image: linear-gradient(transparent 50%, rgba(69, 142, 209, .04) 50%);
  background-size: 3em 3em;
  background-origin: content-box;
  background-attachment: local
}

code[class*=language-] {
  max-height: inherit;
  height: inherit;
  padding: 0 1em;
  display: block;
  overflow: auto
}

:not(pre)>code[class*=language-],
pre[class*=language-] {
  background-color: #fdfdfd;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin-bottom: 1em
}

:not(pre)>code[class*=language-] {
  position: relative;
  padding: .2em;
  border-radius: .3em;
  color: #c92c2c;
  border: 1px solid rgba(0, 0, 0, .1);
  display: inline;
  white-space: normal
}

pre[class*=language-]:after,
pre[class*=language-]:before {
  content: '';
  display: block;
  position: absolute;
  bottom: .75em;
  left: .18em;
  width: 40%;
  height: 20%;
  max-height: 13em;
  box-shadow: 0 13px 8px #979797;
  -webkit-transform: rotate(-2deg);
  -moz-transform: rotate(-2deg);
  -ms-transform: rotate(-2deg);
  -o-transform: rotate(-2deg);
  transform: rotate(-2deg)
}

pre[class*=language-]:after {
  right: .75em;
  left: auto;
  -webkit-transform: rotate(2deg);
  -moz-transform: rotate(2deg);
  -ms-transform: rotate(2deg);
  -o-transform: rotate(2deg);
  transform: rotate(2deg)
}

.token.block-comment,
.token.cdata,
.token.comment,
.token.doctype,
.token.prolog {
  color: #7d8b99
}

.token.punctuation {
  color: #5f6364
}

.token.boolean,
.token.constant,
.token.deleted,
.token.function-name,
.token.number,
.token.property,
.token.symbol,
.token.tag {
  color: #c92c2c
}

.token.attr-name,
.token.builtin,
.token.char,
.token.function,
.token.inserted,
.token.selector,
.token.string {
  color: #2f9c0a
}

.token.entity,
.token.operator,
.token.url,
.token.variable {
  color: #a67f59;
  background: rgba(255, 255, 255, .5)
}

.token.atrule,
.token.attr-value,
.token.class-name,
.token.keyword {
  color: #1990b8
}

.token.important,
.token.regex {
  color: #e90
}

.language-css .token.string,
.style .token.string {
  color: #a67f59;
  background: rgba(255, 255, 255, .5)
}

.token.important {
  font-weight: 400
}

.token.bold {
  font-weight: 700
}

.token.italic {
  font-style: italic
}

.token.entity {
  cursor: help
}

.token.namespace {
  opacity: .7
}

@media screen and (max-width:767px) {

  pre[class*=language-]:after,
  pre[class*=language-]:before {
    bottom: 14px;
    box-shadow: none
  }
}

pre[class*=language-].line-numbers.line-numbers {
  padding-left: 0
}

pre[class*=language-].line-numbers.line-numbers code {
  padding-left: 3.8em
}

pre[class*=language-].line-numbers.line-numbers .line-numbers-rows {
  left: 0
}

pre[class*=language-][data-line] {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0
}

pre[data-line] code {
  position: relative;
  padding-left: 4em
}

pre .line-highlight {
  margin-top: 0
}
</style>