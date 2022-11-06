import Vue from 'vue'
import PocketBase from 'pocketbase';
//@ts-ignore
import CookieJar from 'universal-cookie-nuxt'

declare module 'vue/types/vue' {
  interface Vue {
    $pb: PocketBase
    $cookies: CookieJar
  }
}