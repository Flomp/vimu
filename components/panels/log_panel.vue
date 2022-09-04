<template>
  <div>
    <h5 class="text-button grey darken-4 px-3">Log</h5>
    <div class="pa-4">
      <p
        style="font-family: monospace; font-size: 0.8rem"
        v-for="(log, i) in logs"
        :key="i"
      >
        <span>[{{ formatLogLevel(log) }}]</span>

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