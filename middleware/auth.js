const auth = ({$pb, route, redirect}) => {
  const protectedRoutes = [
    '/dashboard/profile',
    '/dashboard/files/all',
    '/dashboard/files/recent',
    '/dashboard/files/favorites',
    '/editor'
  ]

  const loggedIn = $pb.authStore.model !== null;

  if(!loggedIn && protectedRoutes.includes(route.path)) {
    redirect('/login')
  } 
}

export default auth
