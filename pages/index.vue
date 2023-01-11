<template>
    <v-sheet class="page">
        <div id="index-rete" class="pa-0 pixel-grid">
        </div>
        <v-container>
            <section>
                <v-row class="content-row">
                    <v-col>
                        <vimu-article title="Fully visual, fully intuitive" callToAction="Try it now">
                            <b>vimu</b> works with a node based, graphical editor. You can create complex functionality
                            with
                            a few clicks. Just drag and connect the components that you need for your analysis and let
                            <b>vimu</b> do the rest.
                        </vimu-article>
                    </v-col>

                    <v-col class="illustration">
                        <bunny-dead-carrot :width="400"></bunny-dead-carrot>
                    </v-col>
                </v-row>
                <v-row class="content-row">
                    <v-col class="illustration">
                        <speed-carrot :width="400"></speed-carrot>
                    </v-col>
                    <v-col>
                        <vimu-article title="Speed up your research" callToAction="Explore">
                            <b>vimu</b> does the grunt work for you, so you can focus more on the core of your
                            musicology
                            research questions.
                            It does the job more accurately and faster than any human ever could.
                        </vimu-article>
                    </v-col>

                </v-row>
                <v-row class="content-row">
                    <v-col>
                        <vimu-article title="100% Open Source" callToAction="How to install">
                            We believe that software should be free for everyone. Thus <b>vimu</b> is fully open source.
                            If you do not want to use our hosted service read the docs and learn how to get <b>vimu</b>
                            up and
                            running on your server.
                        </vimu-article>
                    </v-col>
                    <v-col class="illustration">
                        <matrix-bunny></matrix-bunny>
                    </v-col>
                </v-row>
            </section>
            <section>
                <div style="padding-top: 48px;">
                    <h1 class="vimu-title">What can you do with vimu?</h1>
                    <p class="vimu-subtitle py-3">There are many <nuxt-link to="/examples">templates and
                            examples</nuxt-link> to get you started!</p>
                    <v-row class="pt-6">
                        <v-col>
                            <vimu-card title="Detect Modulation" callToAction="Open Example"
                                to="/editor/example-modulation">
                                Learn how to employ <b>vimu's</b> sophisticated statistical model to accurately detect
                                possible
                                modulation sites in one of Bach chorales.
                            </vimu-card>
                        </v-col>
                        <v-col>
                            <vimu-card title="Search for a melody" callToAction="Open Example"
                                to="/editor/example-search">
                                Search for melody or rythm fragments in a score. The search comes with many
                                configurable options allowing you to find the exact matches you need.
                            </vimu-card>
                        </v-col>
                        <v-col>
                            <vimu-card title="Plot with vimu" callToAction="Open Example"
                                to="/editor/example-plots">
                                <b>vimu</b> comes with the ability to graphically represent a wide range of score
                                properties. In this example you will learn how easy it is to plot with <b>vimu</b>.
                            </vimu-card>
                        </v-col>
                    </v-row>
                </div>
            </section>
            <section>
                <div class="text-center" style="padding-top: 128px; padding-bottom: 64px;">
                    <h1 ref="slogan" class="vimu-title">
                        Drag, Connect, Analyse
                    </h1>
                    <vimu-button class="my-10" :primary="true" :x-large="true" to="/dashboard/files/my">Get started
                    </vimu-button>
                </div>
            </section>
        </v-container>

    </v-sheet>

</template>

<script lang="ts">
import { Component, Ref, Vue } from "nuxt-property-decorator";
import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import Vuetify from "vuetify";
import IndexEastereggComponent from "~/components/index/rete/components/index/index_easteregg_component";
import IndexHeroComponent from "~/components/index/rete/components/index/index_hero_component";
import VimuArticle from "~/components/vimu/vimu_article.vue";
import VimuCard from "~/components/vimu/vimu_card.vue"
import Terminal from "~/components/index/terminal.vue"
import SpeedCarrot from "~/components/vimu/illustrations/speed_carrot.vue";
import MatrixBunny from "~/components/vimu/illustrations/matrix_bunny.vue";
import BunnyDeadCarrot from "~/components/vimu/illustrations/bunny_dead_carrot.vue";
//@ts-ignore
import Typewriter from 'typewriter-effect/dist/core';

@Component({
    components: {
        VimuArticle,
        VimuCard,
        Terminal,
        SpeedCarrot,
        MatrixBunny,
        BunnyDeadCarrot
    },
})
export default class IndexPage extends Vue {

    @Ref() slogan!: HTMLElement;

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

        const AreaPlugin = require("rete-area-plugin").default;
        editor.use(AreaPlugin, { background: background });
        const VueRenderPlugin = require("rete-vue-render-plugin").default;
        editor.use(VueRenderPlugin, {
            options: {
                vuetify: new Vuetify(
                    {
                        theme: {
                            themes: {
                                light: {
                                    primary: '#000000',
                                    accent: '#2962FF',
                                }
                            }
                        }
                    }
                ),
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

        const heroNodeWidth = 646;
        const heroNodeHeight = 387;

        const eastereggNodeWidth = 242;
        const eastereggNodeHeight = 349;

        const gap = 0.1 * w;
        let paddingX = 0;
        if (w >= 1000) {
            paddingX = (w / 2) - (heroNodeWidth + eastereggNodeWidth + gap) / 2;
        } else if (w <= 1000 && w >= heroNodeWidth) {
            paddingX = (w / 2) - (heroNodeWidth / 2)
        }

        const heroNode = await hero.createNode();
        heroNode.position = [paddingX, w <= heroNodeWidth ? 24 : h / 2 - heroNodeHeight / 2];
        editor.addNode(heroNode);
        if (w >= 1000) {
            const eastereggNode = await easteregg.createNode();
            eastereggNode.position = [w - paddingX - eastereggNodeWidth, h / 2 - eastereggNodeHeight / 2];
            editor.addNode(eastereggNode);
        }


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
                this.$router.push('/dashboard/files/my')
            } else if (trigger === "secondary") {
                this.$router.push('/docs')

            }

        });


        // var typewriter = new Typewriter(this.slogan, {
        //     loop: true,
        //     delay: 75,
        //     cursor: ""
        // });

        // typewriter
        // .typeString("Drag")
        // .pauseFor(1000)
        // .typeString("->Connect")
        // .pauseFor(1000)
        // .typeString("->Analyse")
        // .pauseFor(3000)
        // .start()
    }
}
</script>

<style>
#index-rete {
    height: 600px !important;
}

.content-row {
    padding-top: 48px;
    padding-bottom: 48px;
}

.illustration {
    display: block;
}

@media only screen and (max-width: 686px) {
    .illustration {
        display: none;
    }
}
</style>