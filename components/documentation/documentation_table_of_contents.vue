<template>
    <aside class="toc grey lighten-5" right permanent
        v-scroll="onScroll">
        <v-list class="grey lighten-5" dense>
            <v-list-item class="toc-header"><v-list-item-icon>
                    <v-icon>mdi-table-of-contents</v-icon>
                </v-list-item-icon>
                Table of contents
            </v-list-item>
            <v-list-item style="padding-left:6px" v-for="t in toc" :key="t.id">
                <a class="doc-nav-link" :class="{ 'doc-nav-link--active': currentlyActiveToc == t.id }"
                    :href="`#${t.id}`" :style="`margin-left: ${24 * (t.depth - 2)}px`" @click="jumpTo(t.id)">{{ t.text
                    }}</a>
            </v-list-item>
        </v-list>
        <v-divider class="mx-4" height="1"></v-divider>
        <a class="doc-nav-link d-flex align-center ml-1" @click="scrollIt"
            v-if="showBackToTop"><v-icon>mdi-arrow-up-circle-outline</v-icon>
            <span class="ml-2">Back to top</span></a>
    </aside>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class DocsTableOfContents extends Vue {
    @Prop() toc!: {
        id: string;
        depth: number;
        text: string;
    }[];

    currentlyActiveToc: string | null = null;
    observer: IntersectionObserver | null = null;
    previous: Record<string, number> = {}

    tocDisabled: boolean = true;
    showBackToTop: boolean = false;

    mounted() {
        const observerOptions = <IntersectionObserverInit>{
            root: document,
            rootMargin: "-75px",
            threshold: 1
        }
        this.observer = new IntersectionObserver(entries => {            
            entries.forEach(entry => {
                const id = entry.target.getAttribute("id");

                if (id == null) {
                    return;
                }
                const currentY = entry.boundingClientRect.y

                if (!this.previous[id]) {
                    this.previous[id] = 0;
                }

                if (entry.isIntersecting) {
                    if (currentY > this.previous[id] && !this.tocDisabled) {
                        const prevTocIndex = (this.toc.findIndex(t => t.id == id) || 1) - 1;
                        this.currentlyActiveToc = this.toc[prevTocIndex]?.id;
                    }
                } else {
                    if (currentY < this.previous[id] && !this.tocDisabled) {
                        this.currentlyActiveToc = id;
                    }
                }

                this.previous[id] = currentY
            });
        }, observerOptions);

        document
            .querySelectorAll(".nuxt-content h2[id], .nuxt-content h3[id]")
            .forEach(section => {
                this.observer?.observe(section);
            });

        if (this.toc.length > 0) {
            this.currentlyActiveToc = this.toc[0].id;
        }

        setTimeout(() => {
            this.tocDisabled = false;
        }, 100);
    }
    beforeDestroy() {
        this.observer?.disconnect();
    }

    onScroll() {
        this.showBackToTop = window.scrollY > 0;
    }

    jumpTo(section: string) {
        this.currentlyActiveToc = section;
        this.tocDisabled = true;
        setTimeout(() => {
            this.tocDisabled = false;
        }, 100);
    }

    scrollIt() {
        window.scrollTo(0, 0);
    }

}
</script>

<style>
.toc {
	z-index: 1;
	position: sticky;
	position: -webkit-sticky;
    top: 75px;
	flex-shrink: 0;
    align-self: flex-start;
	width: 300px;
    padding: 20px
}
.toc-header {
    font-size: 14px;
    font-weight: 600;
}
</style>