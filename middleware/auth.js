const auth = ({$pb, route, redirect}) => {
  const protectedRoutes = [
    '/dashboard/account',
    '/dashboard/files/all',
    '/dashboard/files/recent',
    '/editor'
  ]

  const loggedIn = $pb.authStore.model !== null;

  if(!loggedIn && protectedRoutes.includes(route.path)) {
    redirect('/login')
  } 
}

export default auth
