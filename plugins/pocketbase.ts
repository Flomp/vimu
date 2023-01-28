import { Context } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';
import { initialisePocketbase } from "~/utils/store-accessor";

export default async (ctx: Context, inject: Inject) => {
  const PocketBase = require('pocketbase').default;
  const pb = new PocketBase(ctx.$config.pocketbaseURL);

  // load the store data from the request cookie string
  const authCookie = (ctx as any).$cookies.get('pb_auth')
  pb.authStore.loadFromCookie('pb_auth=' + authCookie);

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {
    (ctx as any).$cookies.set('pb_auth', pb.authStore.exportToCookie().replace('pb_auth=', ''))
  });

  inject('pb', pb);
  initialisePocketbase(pb);

  try {
    // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
    if (process.client && pb.authStore.isValid) {
      await pb.collection('users').authRefresh();

    }

  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear();
  }
};