<template>
    <v-list-item>
        <v-list-item-avatar>
            <vimu-avatar :seed="avatarSeed"></vimu-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>{{ username }}</v-list-item-title>
            <v-list-item-subtitle>can {{ fileShare.permission }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="!readonly">
            <v-btn color="primary" icon @click="remove" :loading="loading" :disabled="loading"><v-icon>mdi-close</v-icon></v-btn>
        </v-list-item-action>
    </v-list-item>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "nuxt-property-decorator";
import { FileShare } from "~/models/file";

@Component({})
export default class FileShareCard extends Vue {
    @Prop() fileShare!: FileShare;
    @Prop() loading!: boolean;
    @Prop() readonly!: boolean;

    get avatarSeed() {
        return this.fileShare.expand?.user.avatar ?? "?"
    }

    get username() {
        return this.fileShare.expand?.user.username ?? "?"
    }

    @Emit()
    remove() {
        return this.fileShare;
    }
}
</script>

<style>

</style>