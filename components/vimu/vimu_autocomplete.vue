<template>
    <v-combobox class="vimu-autocomplete" v-model="searchResult" :loading="loading" :items="items" append-icon=""
        @update:search-input="onAutocompleteType" @change="change" no-filter outlined hide-details :label="label"
        :dense="dense" :prepend-inner-icon="prependInnerIcon" :prepend-icon="prependIcon" :placeholder="placeholder"
        menu-props="closeOnContentClick" hide-no-data>
        <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
            <slot :name="slot" v-bind="props" />
        </template>

    </v-combobox>
</template>
<script lang="ts">
import { Component, Emit, Prop, VModel, Vue } from "nuxt-property-decorator";

@Component({})
export default class VimuAutocomplete<T> extends Vue {
    lastSearch: string = "";
    @VModel()
    searchResult!: { text: string | null; value: T | null } | null;
    typingTimer!: NodeJS.Timeout;

    @Prop({
        default: true,
    })
    clearAfterSelect!: boolean;
    @Prop({
        default: false,
    })
    readonly loading!: boolean;
    @Prop() readonly items!: Array<{ text: string; value: T }>;
    @Prop({
        default: 5,
    })
    readonly searchLength!: number;
    @Prop() readonly label!: string;
    @Prop() readonly prependInnerIcon!: string;
    @Prop() readonly prependIcon!: string;
    @Prop() readonly placeholder!: string;
    @Prop() readonly dense!: boolean;

    onAutocompleteType(q: string) {
        clearTimeout(this.typingTimer);
        if (q) {
            if (Math.abs(q.length - this.lastSearch.length) > this.searchLength) {
                this.update(q);
                return;
            }
            this.typingTimer = setTimeout(() => {
                this.update(q);
            }, 500);
        }
    }

    @Emit()
    update(q: string) {
        this.lastSearch = q;
        return q;
    }

    @Emit()
    change(item: { text: string; value: T }) {     
        console.log("here");
   
        if (this.clearAfterSelect) {
            
            this.$nextTick(() => {
                
                this.searchResult = null;
                this.lastSearch = "";
            });
        }
        if (!item || !item.value) {
            return null;
        }
        return item.value;
    }
}
</script>

<style >
.vimu-autocomplete fieldset {
    border: 2px solid currentColor !important;
}
.v-autocomplete__content {
    border: 2px solid currentColor;
    border-radius: 10px !important;
    background-color: white;
    box-shadow: none !important;
    top: 70px !important;
}
</style>