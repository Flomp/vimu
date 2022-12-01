<template>
    <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title>
        Rename file
      </v-card-title>
      <v-card-text class="pb-0">
        <vimu-text-field v-model="filenameLocal" :rules="filenameRules"></vimu-text-field>
      </v-card-text>
      <v-card-actions class="py-4">
        <v-spacer></v-spacer>
        <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
        <vimu-btn @click="save">Save</vimu-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, VModel, Emit, Prop, Watch } from "nuxt-property-decorator";
import VimuBtn from "~/components/vimu/vimu_button.vue";
import { required } from "~/utils/verification_rules";

@Component({
    components: {
        VimuBtn
    }
})
export default class FileRenameDialog extends Vue {
    @VModel() dialog!: boolean;
    @Prop() filename!: string;
    filenameLocal: string = this.filename;

    filenameRules = [required]

    @Watch("dialog")
    onDialogChanged(value: boolean) {
        if(!value) {
            return;
        }
        this.filenameLocal = this.filename;
    }

    @Emit()
    save() {
        this.dialog = false;
        return this.filenameLocal;
    }
}
</script>

<style>

</style>