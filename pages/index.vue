<template>
    <v-sheet class="main">
        <div id="index-rete" class="pa-0">
        </div>
        <v-container>
            <section>
                <v-row>
                    <v-col>
                        <vimu-article title="Fully visual, fully intuitive" callToAction="Read Documentation">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Faucibus viverra maecenas est, lacus, lectus viverra. Viverra scelerisque nisl id
                            cursus
                            porta
                            ut vel. Adipiscing semper congue.
                        </vimu-article>
                    </v-col>

                    <v-col v-if="!$vuetify.breakpoint.mobile">
                        <bunny-dead-carrot :width="400"></bunny-dead-carrot>
                    </v-col>
                </v-row>
                <v-row class="align-center">
                    <v-col v-if="!$vuetify.breakpoint.mobile">
                        <speed-carrot :width="400"></speed-carrot>
                    </v-col>
                    <v-col>
                        <vimu-article title="Speed up your research" callToAction="Explore">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Faucibus viverra maecenas est, lacus, lectus viverra. Viverra scelerisque nisl id
                            cursus
                            porta
                            ut vel. Adipiscing semper congue.
                        </vimu-article>
                    </v-col>

                </v-row>
                <v-row>
                    <v-col>
                        <vimu-article title="100% Open Source" callToAction="How to install">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Faucibus viverra maecenas est, lacus, lectus viverra. Viverra scelerisque nisl id
                            cursus
                            porta
                            ut vel. Adipiscing semper congue.
                        </vimu-article>
                    </v-col>
                    <v-col v-if="!$vuetify.breakpoint.mobile">
                        <matrix-bunny></matrix-bunny>
                    </v-col>
                </v-row>
            </section>
            <section>
                <div style="padding-top: 64px;">
                    <h1 class="vimu-title">What can you do with vimu?</h1>
                    <p class="vimu-subtitle py-3">There are many templates and examples to get you started!</p>
                    <v-row class="pt-6">
                        <v-col>
                            <vimu-card title="Detect Modulation" callToAction="Open Example">
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Faucibus viverra maecenas est, lacus, lectus viverra. Viverra scelerisque nisl id
                                cursus
                                porta
                                ut vel. Adipiscing semper congue.
                            </vimu-card>
                        </v-col>
                        <v-col>
                            <vimu-card title="Search for a melody" callToAction="Open Example">
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Faucibus viverra maecenas est, lacus, lectus viverra. Viverra scelerisque nisl id
                                cursus
                                porta
                                ut vel. Adipiscing semper congue.
                            </vimu-card>
                        </v-col>
                        <v-col>
                            <vimu-card title="Realize a figured bass line" callToAction="Open Example">
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Faucibus viverra maecenas est, lacus, lectus viverra. Viverra scelerisque nisl id
                                cursus
                                porta
                                ut vel. Adipiscing semper congue.
                            </vimu-card>
                        </v-col>
                    </v-row>
                </div>
            </section>
            <section>
                <div class="text-center" style="padding-top: 128px; padding-bottom: 64px;">
                    <h1 class="vimu-title">
                        Drag, connect, analyse
                    </h1>
                    <vimu-button class="my-10" :primary="true" :x-large="true" to="/dashboard/files/all">Get started</vimu-button>
                </div>
            </section>
        </v-container>

    </v-sheet>

</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Rete from "rete";
// @ts-ignore
import AreaPlugin from "rete-area-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import Vuetify from "vuetify";
import IndexEastereggComponent from "~/components/index/rete/components/index/index_easteregg_component";
import IndexHeroComponent from "~/components/index/rete/components/index/index_hero_component";
import VimuArticle from "~/components/vimu/vimu_article.vue";
import VimuCard from "~/components/vimu/vimu_card.vue"
import Terminal from "~/components/index/terminal.vue"
import SpeedCarrot from "~/components/vimu/speed_carrot.vue";
import MatrixBunny from "~/components/vimu/matrix_bunny.vue";
import BunnyDeadCarrot from "~/components/vimu/bunny_dead_carrot.vue";
@Component({
    components: {
        VimuArticle,
        VimuCard,
        Terminal,
        SpeedCarrot,
        MatrixBunny,
        BunnyDeadCarrot
    }
})
export default class IndexPage extends Vue {

    async mounted() {
        const container = document.querySelector<HTMLElement>("#index-rete");
        container?.addEventListener('wheel', (e) => {
            e.stopPropagation();
        }, true)
        const editor = new Rete.NodeEditor("vimu@0.1.0", container!);
        const engine = new Rete.Engine("vimu@0.1.0");
        const background = document.createElement("div");
        const [w, h] = [
            editor.view.container.clientWidth,
            editor.view.container.clientHeight,
        ];

        background.classList.add("pixel-grid");

        editor.use(AreaPlugin, { background: background });
        const VueRenderPlugin = require("rete-vue-render-plugin").default;
        editor.use(VueRenderPlugin, {
            options: {
                vuetify: new Vuetify({
                    theme: {
                        themes: {
                            light: {
                                primary: '#000000',
                            }
                        }
                    }
                }),
            },
        });
        editor.use(ConnectionPlugin);

        (editor.view.area as any)._zoom.intensity = 0.03;

        const hero = new IndexHeroComponent(editor);
        const easteregg = new IndexEastereggComponent(editor);

        editor.register(hero);
        editor.register(easteregg);

        engine.register(hero);
        engine.register(easteregg)

        const paddingLeft = 128

        const heroNode = await hero.createNode();
        heroNode.position = [paddingLeft, 64];
        editor.addNode(heroNode);

        const heroNodeEl = editor.view.nodes.get(heroNode)!.el;
        const heroNodeWidth = heroNodeEl.clientWidth;

        const eastereggNode = await easteregg.createNode();
        eastereggNode.position = [3 * paddingLeft + heroNodeWidth, 64];

        editor.addNode(eastereggNode);

        editor.selectNode(heroNode)

        editor.on("zoom", ({ zoom, source }) => {
            return source != 'dblclick' && zoom > 0.5 && zoom < 2;
        });

        editor.on(["connectioncreate", "connectionremove"], () => {
            engine.process(editor.toJSON())
        });

        editor.on(["process"], (params) => {
            const trigger = (params as any).trigger
            if (trigger === "primary") {
                this.$router.push('/dashboard/files/all')
            }

        });

    }
}
</script>

<style>
#index-rete {
    height: 600px !important;
}
</style>