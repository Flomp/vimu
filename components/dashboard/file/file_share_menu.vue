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
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { File } from "~/models/file";
import FileShareCard from "./file_share_card.vue";

@Component({
    components: {
        FileShareCard
    }
})
export default class FileShareMenu extends Vue {
    @Prop() file!: File;
    @Prop() shared!: boolean;

}
</script>

<style>

</style>