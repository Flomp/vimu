<template>
    <div>
        <div class="d-flex">
            <nuxt-link class="doc-nav-link" :class="{ 'doc-nav-link--active': active, 'doc-nav-link--bordered': !main }"
                :to="to">

                <v-icon v-if="open && main && $slots['sub-items']">mdi-chevron-down</v-icon>
                <v-icon v-else-if="(!open && main) || (!$slots['sub-items'] && main)">mdi-chevron-right</v-icon>
                <span>
                    <slot></slot>
                </span>
            </nuxt-link>
        </div>
        <div v-if="open">
            <slot name="sub-items"></slot>
        </div>
    </div>


</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class DocNavLink extends Vue {
    @Prop() to!: string;
    @Prop({ default: false }) main!: boolean;

    get open() {
        return this.$route.path.includes(this.to);
    }

    get active() {
        return this.to == this.$route.path;
    }
}
</script>

<style>
.doc-nav-link {
    text-decoration: none;
    font-size: 14px;
    padding: 10px;
    color: gray !important
}

.doc-nav-link:hover {
    transition: 200ms;
    color: currentColor !important
}

.doc-nav-link--bordered {
    margin-left: 12px;
    border-left: 1px solid lightgray
}

.doc-nav-link--active {
    font-weight: 600;
    color: black !important;
}
</style>