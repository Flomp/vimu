<template>
    <div class="vimu-card hover-card score-card" @click="click">
        <img :src="thumbnailPath" width="100%" style="max-height: 256px; object-fit: cover;" />
        <div class="d-flex align-center pa-4">
            <span class="vimu-card-title score-card-title mr-1">
                {{ score.name }}
            </span>
            <v-tooltip bottom v-if="score.public && owned && !readOnly">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">
                        mdi-earth
                    </v-icon>
                </template>
                <span>Public</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-tooltip bottom v-if="!readOnly">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" icon v-bind="attrs" v-on="on" @click.stop="create">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </v-btn>

                </template>
                <span>Create file from score</span>
            </v-tooltip>
            <v-menu offset-y content-class="vimu-menu elevation-0" v-if="owned && !readOnly">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item @click="edit">
                        <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="remove">
                        <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>

</template>

<script lang="ts">
import { read } from "fs";
import { Vue, Component, Prop, Emit } from "nuxt-property-decorator";
import { Score } from "~/models/score";
import { $pb, authStore } from "~/store";

@Component({
    components: {}
})
export default class ScoreCard extends Vue {
    @Prop() readonly score!: Score;
    @Prop() readonly readOnly!: boolean;


    get thumbnailPath() {
        return $pb.getFileUrl(this.score as any, this.score.thumbnail)
    }

    get owned() {
        return this.score.user_id == authStore.userId
    }

    @Emit()
    click() {
        return this.score;
    }

    @Emit()
    create() {
        return this.score;
    }

    @Emit()
    edit() {
        return this.score;
    }

    @Emit()
    remove() {
        return this.score;
    }
}
</script>

<style>
.score-card-title {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
}
</style>