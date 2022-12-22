<template>
  <v-img class="framed-gif" :src="path" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class  extends Vue {
    @Prop() path!: string;
}
</script>

<style>
.framed-gif {
	max-width: calc(100% - 48px);
	border-radius: 15px;
	border: 2px solid;
	margin: 24px;
}
</style>