import { Context } from "@nuxt/types";
import PocketBase from "pocketbase";

const auth = ({ $pb, route, redirect }: Context & { $pb: PocketBase }) => {
  const protectedRoutes = [
    '/dashboard/account',
    '/dashboard/files/my',
    '/dashboard/files/shared',
    '/dashboard/scores',
    '/dashboard/plugins',
    '/dashboard/teams',
  ]

  const loggedIn = $pb.authStore.isValid;
  if (!loggedIn) {
    for (const r of protectedRoutes) {
      if (route.path.startsWith(r)) {
        redirect(302, '/login', {r: route.path, ...route.query})
        return false;
      }
    }
  } else {
    const verified = $pb.authStore.model?.verified;

    if(!verified) {
      for (const r of protectedRoutes) {
        if (route.path.startsWith(r)) {
          redirect('/dashboard/verify')
          return;
        }
      }
      return;
    }else {
      if (route.path.startsWith('/dashboard/verify')) {
        redirect('/dashboard/files/my')
        return;
      }
    }
    if (route.path.startsWith('/login')) {
      redirect('/dashboard/files/my')
      return;
    }
  }
}

export default auth
