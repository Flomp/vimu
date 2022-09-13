<template>
  <div>
    <div class="pa-4" style="font-size: 0.8rem">
      <pre>
        _                 
 __   _(_)_ __ ___  _   _ 
 \ \ / / | '_ ` _ \| | | |
  \ V /| | | | | | | |_| |
   \_/ |_|_| |_| |_|\__,_|
      </pre>
      <pre>
Welcome to vimu 0.0.1-beta 
Rightclick in the editor area to get started!
      </pre>
      <p
        style="font-family: monospace"
        v-for="(log, i) in logs"
        :key="i"
      >
        <span :class="logLevelColor(log)">[{{ formatLogLevel(log) }}]</span>

        <span>[{{ formatDate(log) }}]</span>
        {{ log.text }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Log, LogLevel } from "~/models/log";
import { logStore } from "~/store";

@Component({})
export default class LogPanel extends Vue {
  get logs() {
    return logStore.logs;
  }

  logLevelColor(log: Log) {
    switch (log.level) {
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
}
</script>

<style>
</style>