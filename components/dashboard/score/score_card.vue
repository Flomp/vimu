<template>
    <div class="vimu-card hover-card score-card" @click="click">
        <img :src="thumbnailPath" width="100%" style="height: 128px; object-fit: cover;" />
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
            <score-context-menu @edit="edit" @remove="remove" v-if="owned && !readOnly"></score-context-menu>
        </div>
    </div>

</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "nuxt-property-decorator";
import { Score } from "~/models/score";
import { $pb } from "~/store";
import ScoreContextMenu from "./score_context_menu.vue";

@Component({
    components: {
        ScoreContextMenu
    }
})
export default class ScoreCard extends Vue {
    @Prop() readonly score!: Score;
    @Prop() readonly readOnly!: boolean;


    get thumbnailPath() {
        return $pb.getFileUrl(this.score as any, this.score.thumbnail)
    }

    get owned() {
        return this.score.owner == $pb.authStore.model?.id
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

.score-card-click-count {
    font-size: 0.75rem;
    color: #5A5A5A
}
</style>