<template>
  <v-snackbar bottom right v-model="showSnackbar" :color="notification.color" :timeout="duration" min-width="300">
    <p class="mb-1 font-weight-bold">{{ notification.title }}</p>
    <span v-if="notification.subtitle">{{ notification.subtitle }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="showSnackbar = false"> OK </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { notificationStore } from "~/store";

@Component({})
export default class NotificationCenter extends Vue {
  showSnackbar: boolean = false;

  get notification() {
    return notificationStore.notification;
  }

  get duration() {
    return this.notification.duration ?? 3000;
  }

  @Watch("notification")
  onNotificationChanged(oldValue: Notification, newValue: Notification) {        
    this.showSnackbar = true;
  }
}
</script>

<style>

</style>