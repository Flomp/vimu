<template>
    <div id="plugin-code-editor"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel, Watch, Emit } from "nuxt-property-decorator";

@Component({
})
export default class PluginCodeEditor extends Vue {
    @VModel()
    content!: string;
    @Prop()
    readonlyLines!: number[];
    @Prop()
    timer!: boolean;


    ace!: any;

    codeEditor!: any;

    typingTimer!: NodeJS.Timeout;


    mounted() {
        this.ace = require("ace-builds");
        require("ace-builds/webpack-resolver");
        require("ace-builds/src-noconflict/ext-language_tools.js")

        this.codeEditor = this.ace.edit("plugin-code-editor", {
            mode: "ace/mode/python",
            theme: "ace/theme/github_dark",
            selectionStyle: "text"
        })

        this.ace.require("ace/ext/language_tools");

        this.codeEditor.setOptions({
            enableLiveAutocompletion: true
        });

        this.updateContent(this.content)

        this.codeEditor.on('change', (event: Event) => {
            const currentCode = this.codeEditor.getValue();
            this.content = currentCode;
            
            this.timer ? this.onType(currentCode) : this.update(currentCode)
        });

        if (this.readonlyLines?.length) {
            this.makeLinesReadonly(this.readonlyLines)
        }
    }

    onType(v: string) {
        clearTimeout(this.typingTimer);
        if (v) {
            this.typingTimer = setTimeout(() => {
                this.update(v);
            }, 1000);
        }
    }


    updateContent(newText: string) {
        this.codeEditor.setValue(newText)
        this.codeEditor.clearSelection()
    }

    @Emit()
    update(v: string) {        
        return v;
    }

    insertLine(text: string, row: number, column: number) {
        var session = this.codeEditor.getSession()

        session.insert({
            row: row,
            column: column
        }, text + "\n")
    }

    setReadonly(editor: any, readonly_ranges: number[][]) {
        var session = editor.getSession()
        const Range = require("ace-builds").Range;

        const ranges: any[] = [];

        function before(obj: any, method: string, wrapper: Function) {
            var orig = obj[method];
            obj[method] = function () {
                var args = Array.prototype.slice.call(arguments);
                return wrapper.call(this, function () {
                    return orig.apply(obj, args);
                }, args);
            }
            return obj[method];
        }
        function intersects(range: number[]) {
            return editor.getSelectionRange().intersects(range);
        }
        function intersectsRange(newRange: any) {
            for (let i = 0; i < ranges.length; i++)
                if (newRange.intersects(ranges[i]))
                    return true;
            return false;
        }
        function preventReadonly(next: Function) {
            for (let i = 0; i < ranges.length; i++) { if (intersects(ranges[i])) return; }
            next();
        }
        function onEnd(position: { row: number, column: number }) {
            var row = position["row"], column = position["column"];
            for (let i = 0; i < ranges.length; i++)
                if (ranges[i].end["row"] == row && ranges[i].end["column"] == column)
                    return true;
            return false;
        }
        function outSideRange(position: { row: number, column: number }) {
            var row = position["row"], column = position["column"];
            for (let i = 0; i < ranges.length; i++) {
                if (ranges[i].start["row"] < row && ranges[i].end["row"] > row)
                    return false;
                if (ranges[i].start["row"] == row && ranges[i].start["column"] < column) {
                    if (ranges[i].end["row"] != row || ranges[i].end["column"] > column)
                        return false;
                }
                else if (ranges[i].end["row"] == row && ranges[i].end["column"] > column) {
                    return false;
                }
            }
            return true;
        }
        for (let i = 0; i < readonly_ranges.length; i++) {
            ranges.push(new Range(...readonly_ranges[i]));
        }
        ranges.forEach(function (range) { session.addMarker(range, "readonly-highlight"); });
        editor.keyBinding.addKeyboardHandler({
            handleKeyboard: function (data: any, hash: number, keyString: string, keyCode: number, event: KeyboardEvent) {
                if (Math.abs(keyCode) == 13 && onEnd(editor.getCursorPosition())) {
                    return false;
                }
                if (hash === -1 || (keyCode <= 40 && keyCode >= 37)) return false;
                for (let i = 0; i < ranges.length; i++) {
                    if (intersects(ranges[i])) {
                        return { command: "null", passEvent: false };
                    }
                }
            }
        });
        before(editor, 'onPaste', preventReadonly);
        before(editor, 'onCut', preventReadonly);
        for (let i = 0; i < ranges.length; i++) {
            ranges[i].start = session.doc.createAnchor(ranges[i].start);
            ranges[i].end = session.doc.createAnchor(ranges[i].end);
            ranges[i].end.$insertRight = true;
        }

        var old$tryReplace = editor.$tryReplace;
        editor.$tryReplace = function (range: any, replacement: string) {
            return intersectsRange(range) ? null : old$tryReplace.apply(this, arguments);
        }
        var session = editor.getSession();
        var oldInsert = session.insert;
        session.insert = function (position: { row: number, column: number }, text: string) {
            return oldInsert.apply(this, [position, outSideRange(position) ? text : ""]);
        }
        var oldRemove = session.remove;
        session.remove = function (range: any) {
            return intersectsRange(range) ? false : oldRemove.apply(this, arguments);
        }
        var oldMoveText = session.moveText;
        session.moveText = function (fromRange: any, toPosition: { row: number, column: number }, copy: boolean) {
            if (intersectsRange(fromRange) || !outSideRange(toPosition)) return fromRange;
            return oldMoveText.apply(this, arguments);
        }

    }

    makeLinesReadonly(line_numbers: number[]) {
        var readonly_ranges = [];

        for (let i = 0; i < line_numbers.length; i++) {
            readonly_ranges.push([line_numbers[i] - 1, 0, line_numbers[i], 0]);
        }

        this.setReadonly(this.codeEditor, readonly_ranges);
    }


}
</script>

<style>
#plugin-code-editor {
    height: 100%;
    width: 100%;
}

.readonly-highlight {
    background-color: #ffffff;
    opacity: 0.2;
    position: absolute;
}
</style>