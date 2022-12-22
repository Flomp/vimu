import { Context } from "@nuxt/types";
import PocketBase from "pocketbase";

const auth = ({ $pb, route, redirect, store }: Context & { $pb: PocketBase }) => {
  const protectedRoutes = [
    '/dashboard/account',
    '/dashboard/files/my',
    '/dashboard/files/shared',
    '/dashboard/scores',
  ]

  const loggedIn = $pb.authStore.isValid;

  if (!loggedIn) {
    for (const r of protectedRoutes) {
      if (route.path.startsWith(r)) {
        store.commit('auth/setRedirectPath', route.path)
        redirect('/login')
      }
    }
  } else {
    if (route.path.startsWith('/login')) {
      redirect('/dashboard/files/my')
      return;
    }
  }
}

export default auth
