<template>
    <v-autocomplete v-model="model" class="vimu-searchbar" placeholder="User-Id" :persistent-placeholder="true"
        :hide-details="true" prepend-inner-icon="mdi-magnify" append-icon="" outlined hide-no-data chips
        @update:search-input="search" :items="items">

    </v-autocomplete>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { User } from "~/models/user";
import { $pb } from "~/store";

@Component({})
export default class UserSearch extends Vue {
    model = null;
    entries: User[] = [];

    get items(): { text: string, value: User }[] {
        console.log(this.entries);

        return this.entries.map((u) => {
            return {
                text: u.email,
                value: u
            }
        });
    }

    async search(query: string) {
        if (query === null || query.length == 0) {
            return
        }
        try {
            this.entries = (await $pb.collection('profile').getList<User>(1, 8, { filter: `name="users${query}"` })).items
        } catch {
        }

    }
}
</script>

<style>

</style>