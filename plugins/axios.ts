import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { Store } from "vuex/types/index";
import { LogLevel } from "~/models/log";
import { initialiseAxios } from "~/utils/store-accessor";

export default function ({ $axios, store }: { $axios: NuxtAxiosInstance, store: Store<any> }) {
    initialiseAxios($axios);

    $axios.onError(error => {
        const message = error.message;
        store.commit('log/log', {
            level: LogLevel.error,
            text: message,
        })


        return Promise.resolve(false);
    })
}