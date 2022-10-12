import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import api from '~/store/api/api';
import api_source from '~/store/api/source';
import api_select from '~/store/api/select';
import api_transform from '~/store/api/transform';
import api_analysis from '~/store/api/analysis';
import api_search from '~/store/api/search';

import log from '~/store/log';
import osmd from '~/store/osmd'
import settings from '~/store/settings'

let apiStore : api;
let apiSourceStore: api_source;
let apiSelectStore: api_select;
let apiTransformStore: api_transform;
let apiAnalysisStore: api_analysis;
let apiSearchStore: api_search;

let logStore: log;
let osmdStore: osmd;
let settingsStore: settings;

let $axios: NuxtAxiosInstance;

function initialiseAxios(axiosInstance: NuxtAxiosInstance) {
    $axios = axiosInstance;
}

function initialiseStores(store: Store<any>): void {
    apiStore = getModule(api, store);
    apiSourceStore = getModule(api_source, store)
    apiSelectStore = getModule(api_select, store)
    apiTransformStore = getModule(api_transform, store)
    apiAnalysisStore = getModule(api_analysis, store)
    apiSearchStore = getModule(api_search, store)
    logStore = getModule(log, store)
    osmdStore = getModule(osmd, store)
    settingsStore = getModule(settings, store)
}

export {
    initialiseStores,
    initialiseAxios,
    $axios,
    apiStore,
    apiSourceStore,
    apiSelectStore,
    apiTransformStore,
    apiAnalysisStore,
    apiSearchStore,
    logStore,
    osmdStore,
    settingsStore
}