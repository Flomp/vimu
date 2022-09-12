import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { initialiseAxios } from "~/utils/store-accessor";

export default function ({ $axios }: { $axios: NuxtAxiosInstance }) {
    initialiseAxios($axios);

    $axios.onError(error => {
        const message = error.response && error.response.data.data ? error.response.data.data.error : error.message;
        //store.commit('notifications/sendNotification', { text: message, color: "error", duration: 3000 })
       

        return Promise.resolve(false);
    })
}