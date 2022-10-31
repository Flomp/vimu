<template>
    <div class="terminal pa-8">
        <span>{{ firstLine }}</span> <span v-show="!firstLineDone" id="first-line"></span>
        <div style="height: 8px"></div>
        <div v-show="firstLineDone"><span>{{ secondLine }}</span> <span v-show="!secondLineDone"
                id="second-line"></span>
        </div>
        <pre v-if="secondLineDone">
        _                 
 __   _(_)_ __ ___  _   _ 
 \ \ / / | '_ ` _ \| | | |
  \ V /| | | | | | | |_| |
   \_/ |_|_| |_| |_|\__,_|

Welcome to vimu 0.0.1-beta 

      </pre>
    </div>

</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
//@ts-ignore
import Typewriter from 'typewriter-effect/dist/core';

@Component({})
export default class Terminal extends Vue {

    firstLineDone: boolean = false;
    secondLineDone: boolean = false;

    tw1: any = null;
    tw2: any = null;

    firstCommand = "wget https://install.vimu.app"
    secondCommand = "docker-compose up -d"

    get firstLine() {
        return this.firstLineDone ? `$ ${this.firstCommand}` : "$ ";
    }

    get secondLine() {
        return this.secondLineDone ? `$ ${this.secondCommand}` : "$ ";
    }

    mounted() {
        this.tw1 = new Typewriter('#first-line');
        this.tw2 = new Typewriter('#second-line');

        this.startTyping()
    }

    startTyping() {
        this.tw1.typeString(this.firstCommand).callFunction(this.finishFirstLine).start()
    }

    finishFirstLine() {
        this.firstLineDone = true;
        this.tw2.typeString(this.secondCommand).pauseFor(1000).callFunction(this.finishSecondLine).pauseFor(2500).deleteAll().callFunction(this.reset).start();
    }

    finishSecondLine() {
        this.secondLineDone = true;
    }

    reset() {
        this.secondLineDone = false;
        this.firstLineDone = false;
        this.tw1.deleteAll()
        this.startTyping()


    }
}
</script>

<style>
pre {
   color: #8baaff
}
.terminal {
    background-color: #161414;
    height: 100%;
    border-radius: 20px;
    color: white;
    font-family: monospace;
}
</style>