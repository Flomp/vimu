<template>
    <aside class="account-navigation" :class="{ 'account-navigation-sticky': sticky }">
        <v-list>
            <v-list-item class="account-link my-1" style="padding-left:6px" v-for="l in links" :key="l.text"
                :to="l.value" active-class="account-link--active">
                <v-list-item-icon><v-icon>{{ l.icon }}</v-icon></v-list-item-icon>
                <v-list-item-title>
                    {{ l.text }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </aside>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class AccountNavigation extends Vue {
    @Prop({ default: true }) sticky!: boolean;

    links = [
        { text: "General", value: "/dashboard/account/general", icon: "mdi-cog" },
        { text: "Notifications", value: "/dashboard/account/notifications", icon: "mdi-bell" },
        { text: "Subscription", value: "/dashboard/account/subscription", icon: "mdi-credit-card" }

    ]
}
</script>

<style>
.account-navigation {
    z-index: 1;
    top: 75px;
    flex: 1 0 auto;
    align-self: flex-start;
    width: 256px;
    padding: 20px
}

.account-navigation-sticky {
    position: sticky;
    position: -webkit-sticky;
}
</style>