<template>
    <v-sheet class="page">
        <div id="index-rete" class="pa-0 pixel-grid">
        </div>
        <section>
            <div class="text-center" style="padding-top: 64px;">

                <h1 class="vimu-title">Drag, Connect, Analyze</h1>

                <div class="d-flex showcase">
                    <video class="elevation-4" style="border-radius: 10px;" autoplay muted loop alt="Showcase Clip"
                        preload="none">
                        <source src="/movs/editor.webm" type="video/webm">
                    </video>
                    <img format="webp" class="elevation-4" src="/imgs/scores_small.png" style="border-radius: 10px;"
                        loading="lazy" quality="100" alt="Score Page" />

                </div>
            </div>

        </section>

        <v-container style="max-width: 1185px">
            <section>
                <v-row class="content-row">
                    <v-col>
                        <vimu-article title="Fully visual, fully intuitive" callToAction="Try it now"
                            to="/dashboard/files/my">
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
                        <vimu-article title="Speed up your research" callToAction="Learn more" to="/docs">
                            <b>vimu</b> does the grunt work for you, so you can focus more on the core of your
                            musicology
                            research questions.
                            It does the job more accurately and faster than any human ever could.
                        </vimu-article>
                    </v-col>

                </v-row>
                <v-row class="content-row">
                    <v-col>
                        <vimu-article title="100% Open Source" callToAction="How to install"
                            to="/docs/self-hosting/introduction">
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
                <v-row class="content-row">
                    <v-col class="illustration text-center">
                        <bunny-engineer :width="220"></bunny-engineer>
                    </v-col>
                    <v-col>
                        <vimu-article title="Infinitely extensible" callToAction="Read about Plugins"
                            to="/docs/plugins/overview">
                            The robust plugin system allows for limitless customization options. Create nodes that do
                            exactly
                            what you want and share them with your colleagues.
                        </vimu-article>
                    </v-col>

                </v-row>
            </section>
            <section>
                <div class="text-center" style="padding-top: 48px;">
                    <h1 class="vimu-title">What can you do with vimu?</h1>
                    <p class="vimu-subtitle py-3">There are many <nuxt-link to="/docs/tutorials">tutorials and
                            examples</nuxt-link> to get you started! Here are three quick examples to give you an idea.
                    </p>
                    <v-row class="pt-6 text-left">
                        <v-col>
                            <vimu-card title="Roman Numeral Analysis" callToAction="Open Example"
                                to="/editor/example-roman-numeral-analysis">
                                <b>vimu</b> can perform an automated roman numeral analysis of any score. We use <a
                                    href="https://github.com/napulen/AugmentedNet">AugmentedNet</a> to accurately
                                predict chord functions and modulation.
                            </vimu-card>
                        </v-col>
                        <v-col>
                            <vimu-card title="Search for a melody" callToAction="Open Example" to="/editor/example-search">
                                Search for melody or rhythm fragments in a score. The search comes with many
                                configurable options allowing you to find the exact matches you need.
                            </vimu-card>
                        </v-col>
                        <v-col>
                            <vimu-card title="Plot with vimu" callToAction="Open Example" to="/editor/example-plots">
                                <b>vimu</b> comes with the ability to graphically represent a wide range of score
                                properties. In this example you can see how easy it is to plot with <b>vimu</b>.
                            </vimu-card>
                        </v-col>
                    </v-row>
                </div>
            </section>
            <section>
                <div class="text-center" style="padding-top: 128px; padding-bottom: 64px;">
                    <h1 ref="slogan" class="vimu-title">
                        Sounds good?
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
import { heroSocket } from "~/components/editor/rete/sockets/sockets";
import IndexEastereggComponent from "~/components/index/rete/components/index/index_easteregg_component";
import IndexHeroComponent from "~/components/index/rete/components/index/index_hero_component";
import Terminal from "~/components/index/terminal.vue";
import BunnyDeadCarrot from "~/components/vimu/illustrations/bunny_dead_carrot.vue";
import BunnyEngineer from "~/components/vimu/illustrations/bunny_engineer.vue";
import MatrixBunny from "~/components/vimu/illustrations/matrix_bunny.vue";
import SpeedCarrot from "~/components/vimu/illustrations/speed_carrot.vue";
import VimuArticle from "~/components/vimu/vimu_article.vue";
import VimuCard from "~/components/vimu/vimu_card.vue";

@Component({
    head: {
        title: "The visual musicology editor"
    },
    components: {
        VimuArticle,
        VimuCard,
        Terminal,
        SpeedCarrot,
        MatrixBunny,
        BunnyDeadCarrot,
        BunnyEngineer
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
        const out0 = new Rete.Output("out_0", "", heroSocket, false);
        heroNode.position = [paddingX, w <= heroNodeWidth ? 24 : h / 2 - heroNodeHeight / 2];
        if (w >= 1000) {
            const eastereggNode = await easteregg.createNode();
            eastereggNode.position = [w - paddingX - eastereggNodeWidth, h / 2 - eastereggNodeHeight / 2];
            editor.addNode(eastereggNode);
            heroNode.addOutput(out0);
        }

        editor.addNode(heroNode);



        editor.selectNode(heroNode)

        editor.on("zoom", ({ zoom, source }) => {
            return source != 'dblclick' && zoom > 0.5 && zoom < 2;
        });

        editor.on(["connectioncreate", "connectionremove"], () => {
            engine.process(editor.toJSON())
        });

        if (w < 1000) {
            editor.on("nodetranslate", () => {
                return false;
            })
        }

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

.showcase {
    padding: 16px;
    padding-top: 64px;
    gap: 48px;
    width: 140%;
}

.showcase video,
.showcase img {
    width: 50%;
}

.content-row {
    padding-top: 48px;
    padding-bottom: 48px;
}

.illustration {
    display: block;
}

@media only screen and (max-width: 1000px) {
    .the-visual-musicology-editor {
        margin: 12px;
    }

    .showcase {
        padding: 16px;
        padding-top: 64px;
        gap: 48px;
        flex-wrap: wrap;
        width: 100%;
    }

    .showcase video,
    .showcase img {
        width: 100%;
    }
}

@media only screen and (max-width: 686px) {
    .illustration {
        display: none;
    }
}
</style>