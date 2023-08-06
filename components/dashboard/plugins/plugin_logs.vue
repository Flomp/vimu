<template>
  <div>
    <div class="d-flex align-center white--text py-2 px-3" style="background: #151515">
      <h5>Output</h5>
      <v-spacer></v-spacer>
      <v-tooltip class="d-flex" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" dark icon @click="clearLogs">
            <v-icon>mdi-notification-clear-all</v-icon>
          </v-btn>
        </template>
        <span>Clear output</span>
      </v-tooltip>
    </div>

    <div class="plugin-logs">
      <div class="pa-4" style="font-size: 0.8rem">
        <p style="font-family: monospace" v-for="(log, i) in logs" :key="i">
          <span :class="logLevelColor(log)">[{{ formatLogLevel(log) }}]</span>

          <span>[{{ formatDate(log) }}]</span>
          {{ log.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Log, LogLevel } from "~/models/log";
import { pluginStore } from "~/store";

@Component({})
export default class PluginLogs extends Vue {
  get logs() {
    return pluginStore.logs;
  }

  logLevelColor(log: Log) {
    switch (log.level) {
      case LogLevel.success:
        return "success--text";
      case LogLevel.error:
        return "error--text";
      case LogLevel.warning:
        return "warning--text";
      default:
        return "";
    }
  }

  formatLogLevel(log: Log) {
    return LogLevel[log.level].toUpperCase();
  }

  formatDate(log: Log) {
    return log.date.toLocaleTimeString();
  }

  clearLogs() {
    pluginStore.clearLogs();
  }
}
</script>

<style>
.plugin-logs {
  height: 300px;
  overflow-y: scroll;
  background-color: #24292e;
  color: white;
  display: flex;
  flex-direction: column-reverse;
}
</style>