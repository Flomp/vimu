import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import source from '~/store/source';
import stream from '~/store/stream';
import log from '~/store/log';

import { PyodideInterface } from '~/types/pyodide';

let sourceStore: source;
let streamStore: stream;
let logStore: log;

let $axios: NuxtAxiosInstance;
let $pyodide: PyodideInterface;

function initialiseAxios(axiosInstance: NuxtAxiosInstance) {
    $axios = axiosInstance;
}

function initialisePyodide(pyodideInstance: any) {
    $pyodide = pyodideInstance;
}

function initialiseStores(store: Store<any>): void {
    sourceStore = getModule(source, store)
    streamStore = getModule(stream, store)
    logStore = getModule(log, store)

}

export { initialiseStores, initialiseAxios, initialisePyodide, $axios, $pyodide, sourceStore, streamStore, logStore }