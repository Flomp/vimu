import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import auth from '~/store/auth';
import file from '~/store/file';
import score from '~/store/score';
import team from '~/store/team';
import plugin from '~/store/plugin';

import engine from '~/store/engine';
import log from '~/store/log';
import notification from '~/store/notification';

import PocketBase from 'pocketbase';
import osmd from '~/store/osmd';
import settings from '~/store/settings';

import stripe from '~/store/stripe'
import subscription from '~/store/subscription';

let authStore: auth;
let fileStore: file;
let scoreStore: score;
let teamStore: team;
let pluginStore: plugin;

let engineStore: engine;
let logStore: log;
let notificationStore: notification;
let osmdStore: osmd;
let settingsStore: settings;

let stripeStore: stripe;
let subscriptionStore: subscription;

let $axios: NuxtAxiosInstance;
let $pb: PocketBase;

function initialiseAxios(axiosInstance: NuxtAxiosInstance) {
    $axios = axiosInstance;
}

function initialisePocketbase(pocketbase: PocketBase) {
    $pb = pocketbase;
}

function initialiseStores(store: Store<any>): void {
    authStore = getModule(auth, store)
    fileStore = getModule(file, store)
    scoreStore = getModule(score, store)
    teamStore = getModule(team, store)

    engineStore = getModule(engine, store)
    logStore = getModule(log, store)
    notificationStore = getModule(notification, store)
    osmdStore = getModule(osmd, store)
    settingsStore = getModule(settings, store)

    stripeStore = getModule(stripe, store);
    subscriptionStore = getModule(subscription, store);
    pluginStore = getModule(plugin, store);
}

export {
    initialiseStores,
    initialiseAxios,
    initialisePocketbase,
    $axios,
    $pb,
    authStore,
    fileStore,
    scoreStore,
    teamStore,
    pluginStore,
    engineStore,
    logStore,
    notificationStore,
    osmdStore,
    settingsStore,
    stripeStore,
    subscriptionStore
};

