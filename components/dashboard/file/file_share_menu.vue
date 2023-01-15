<template>
    <v-menu open-on-hover bottom offset-y content-class="vimu-menu elevation-0"
        v-if="((file.expand && file.expand.collaborators) || file.public) && !shared">
        <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-share-variant</v-icon>
        </template>

        <v-list dense>
            <v-list-item v-if="file.public">
                <v-list-item-avatar>
                    <v-icon>mdi-earth</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>Anyone</v-list-item-title>
                    <v-list-item-subtitle>can view</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <file-share-card :fileShare="s" :readonly="true" v-for="s in file.expand.collaborators" :key="s.id">

            </file-share-card>
        </v-list>
    </v-menu>
    <v-menu open-on-hover bottom offset-y content-class="vimu-menu elevation-0" v-else-if="shared">
        <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
                <vimu-avatar :seed="file.expand.owner.avatar" size="36" v-if="shared"></vimu-avatar>
            </div>

        </template>

        <v-list dense>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Shared by</v-list-item-title>
                    <v-list-item-subtitle>{{ file.expand.owner.username }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>You can</v-list-item-title>
                    <v-list-item-subtitle>{{sharePermission }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>

</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { File, FileShare } from "~/models/file";
import { $pb } from "~/store";
import FileShareCard from "./file_share_card.vue";

@Component({
    components: {
        FileShareCard
    }
})
export default class FileShareMenu extends Vue {
    @Prop() file!: File;
    @Prop() shared!: boolean;

    get sharePermission() {
        return this.file.expand.collaborators?.find((c) => c.expand?.user.id == $pb.authStore.model?.id)?.permission ?? "?"
    }

}
</script>

<style>

</style>