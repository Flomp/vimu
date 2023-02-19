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
    <v-menu nudge-bottom="4" open-on-hover bottom offset-y content-class="vimu-menu elevation-0" v-else-if="shared">
        <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
                <vimu-avatar :seed="file.expand.owner.avatar" size="36" v-if="shared"></vimu-avatar>
            </div>

        </template>

        <v-list dense>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Author</v-list-item-title>
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
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { File, FilePermission } from "~/models/file";
import FileShareCard from "./file_share_card.vue";

@Component({
    components: {
        FileShareCard
    }
})
export default class FileShareMenu extends Vue {
    @Prop() file!: File;
    @Prop() shared!: boolean;

    get sharePermission(): FilePermission {        
        return this.file.expand.permission.value
    }

}
</script>

<style>

</style>