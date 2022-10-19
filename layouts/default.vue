<template>
  <v-app>
    <div id="wrapper" class="d-flex fill-height ma-0" style="flex-wrap: nowrap">
      <div id="editor" class="pa-0" style="flex: 1 1 50%">
        <v-main>
          <nuxt />
        </v-main>
      </div>
      <div
        id="editor-handler"
        class="vertical-handler"
        v-if="showFirstColumn"
      ></div>
      <div
        class="pa-0 mb-1"
        style="flex: 1 1 auto; min-width: 0; max-height: 100vh"
        v-if="showFirstColumn"
      >
        <div id="score" style="height: 66%" v-show="showScore">
          <client-only>
            <OSMD-panel></OSMD-panel>
          </client-only>
        </div>
        <div id="score-handler" class="horizontal-handler"></div>

        <div id="log" style="height: calc(34% - 4px)" v-show="showLog">
          <log-panel></log-panel>
        </div>
      </div>
      <div
        class="pa-0"
        style="
          z-index: 1;
          background-color: #363636;
          flex: 0 0 20%;
          width: 20%;
          max-width: 300px;
        "
      >
        <details-panel />
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import DetailsPanel from "~/components/panels/details_panel.vue";
import OSMDPanel from "~/components/panels/osmd_panel.vue";
import LogPanel from "~/components/panels/log_panel.vue";
import { settingsStore } from "~/store";

@Component({
  components: {
    DetailsPanel,
    OSMDPanel,
    LogPanel,
  },
})
export default class DefaultLayout extends Vue {
  get drawerWidth(): string {
    if (process.client) {
      return window?.screen.width < 850 ? "60%" : "850px";
    }
    return "";
  }

  get showFirstColumn() {
    return settingsStore.settings.view.score || settingsStore.settings.view.log;
  }

  get showScore() {
    return settingsStore.settings.view.score;
  }

  get showLog() {
    return settingsStore.settings.view.log;
  }

  mounted() {
    this.handleDrag();
  }

  handleDrag() {
    const editorHandler = document.getElementById("editor-handler");
    const editor = document.getElementById("editor");
    var isEditorHandlerDragging = false;

    const scoreHandler = document.getElementById("score-handler");
    const score = document.getElementById("score");
    var isScoreHandlerDragging = false;

    const log = document.getElementById("log");

    document.addEventListener("mousedown", function (e) {
      if (e.target === editorHandler) {
        isEditorHandlerDragging = true;
      } else if (e.target === scoreHandler) {
        isScoreHandlerDragging = true;
      }
    });

    document.addEventListener("mousemove", function (e) {
      if (isEditorHandlerDragging) {
        const editorMinWidth = 276;

        editor!.style.width = Math.max(editorMinWidth, e.clientX - 4) + "px";
        editor!.style.flexGrow = "0";
        editor!.style.flexBasis = "auto";
      } else if (isScoreHandlerDragging) {
        const scoreMinHeight = 20;
        const scoreMaxHeight = 80;

        const scoreHeight = Math.floor(((e.clientY - 2)/window.innerHeight) * 100);
        if (scoreHeight > scoreMinHeight && scoreHeight < scoreMaxHeight) {
          score!.style.height = scoreHeight + "%";
          log!.style.height = 100 - scoreHeight + "%";          
        }
      }
    });

    document.addEventListener("mouseup", function (e) {
      isEditorHandlerDragging = false;
      isScoreHandlerDragging = false;
    });
  }
}
</script>

<style>
.vertical-handler {
  width: 2px;
  padding: 0;
  cursor: ew-resize;
  flex: 0 0 auto;
}

.vertical-handler::before {
  content: "";
  display: block;
  width: 2px;
  height: 100%;
  margin: 0 auto;
}

.horizontal-handler {
  height: 2px;
  padding: 0;
  cursor: ns-resize;
  flex: 0 0 auto;
}

.horizontal-handler::before {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  margin: 0 auto;
}
</style>