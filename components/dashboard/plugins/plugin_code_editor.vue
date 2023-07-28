<template>
    <div id="plugin-code-editor"></div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component({
})
export default class PluginCodeEditor extends Vue {

    content: string = "";

    mounted() {
        const ace = require("ace-builds");
        require("ace-builds/webpack-resolver");
        require("ace-builds/src-noconflict/ext-language_tools.js")

        const editor = ace.edit("plugin-code-editor", {
            mode: "ace/mode/python",
            theme: "ace/theme/github_dark",
            selectionStyle: "text"
        })

        ace.require("ace/ext/language_tools");

        editor.setOptions({
            enableLiveAutocompletion: true
        });


    }

}
</script>

<style>
#plugin-code-editor {
    height: 100%;
    width: 100%;
}
</style>