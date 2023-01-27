<template>
    <tr @click="click" class="hover-table-row">
        <td> <img class="mx-2" :src="thumbnailPath" height="48" style="object-fit: cover;" />
        </td>
        <td>

            <span>{{ score.name }}</span>

        </td>
        <td v-if="!$vuetify.breakpoint.mobile">
            {{ composer }}
        </td>
        <td v-if="!$vuetify.breakpoint.mobile">
            {{ opus }}
        </td>
        <td>
            <div class="d-flex align-center">
                <v-tooltip bottom v-if="score.public && owned && !readonly">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">
                            mdi-earth
                        </v-icon>
                    </template>
                    <span>Public</span>
                </v-tooltip>
                <score-context-menu @edit="edit" @remove="remove" v-if="owned && !readonly"></score-context-menu>
            </div>
        </td>
    </tr>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "nuxt-property-decorator";
import { Score } from "~/models/score";
import { $pb } from "~/store";
import getRelativeTime from "~/utils/date";
import ScoreContextMenu from "./score_context_menu.vue";

@Component({
    components: {
        ScoreContextMenu
    }
})
export default class ScoreTableRow extends Vue {
    @Prop() readonly score!: Score;
    @Prop() readonly readonly!: boolean;

    editedTimestamp = getRelativeTime(this.score.updated)
    createdTimestamp = getRelativeTime(this.score.created)

    get thumbnailPath() {
        return $pb.getFileUrl(this.score as any, this.score.thumbnail)
    }

    get owned() {
        return this.score.owner == $pb.authStore.model?.id
    }

    get composer() {
        return this.score.expand.meta?.composer ?? "";
    }

    get opus() {
        return this.score.expand.meta?.opus ?? "";
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
.hover-table-row {
    cursor: pointer;
}
</style>