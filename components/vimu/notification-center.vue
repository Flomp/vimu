<template>
  <v-snackbar outlined bottom right v-model="showSnackbar" :color="notification.color" :timeout="duration" min-width="0">
    <h4>{{ notification.title }}</h4>
    <span v-if="notification.subtitle">{{ notification.subtitle }}</span>
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