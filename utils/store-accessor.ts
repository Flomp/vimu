import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import engine from '~/store/engine';
import log from '~/store/log';
import osmd from '~/store/osmd';
import settings from '~/store/settings';

let engineStore: engine;

let logStore: log;
let osmdStore: osmd;
let settingsStore: settings;

let $axios: NuxtAxiosInstance;

function initialiseAxios(axiosInstance: NuxtAxiosInstance) {
    $axios = axiosInstance;
}

function initialiseStores(store: Store<any>): void {
    engineStore = getModule(engine, store)
    logStore = getModule(log, store)
    osmdStore = getModule(osmd, store)
    settingsStore = getModule(settings, store)
}

export {
    initialiseStores,
    initialiseAxios,
    $axios,
    engineStore,
    logStore,
    osmdStore,
    settingsStore
};
