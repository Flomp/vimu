import { Context } from '@nuxt/types';
import { Inject, NuxtApp } from '@nuxt/types/app';
import PocketBase from 'pocketbase';
import { initialisePocketbase } from "~/utils/store-accessor";

export default (ctx: Context, inject: Inject) => {
  const pb = new PocketBase('http://127.0.0.1:8090');

  // load the store data from the request cookie string
  const authCookie = (ctx as any).$cookies.get('pb_auth')
  pb.authStore.loadFromCookie(authCookie);

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {    
    (ctx as any).$cookies.set('pb_auth', pb.authStore.exportToCookie())
  });  
 
  inject('pb', pb);
  initialisePocketbase(pb)

};