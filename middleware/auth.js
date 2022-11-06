const auth = ({$pb, route, redirect}) => {
  const protectedRoutes = [
    '/dashboard/profile',
    '/editor'
  ]

  const loggedIn = $pb.authStore.model !== null;

  if(!loggedIn && protectedRoutes.includes(route.path)) {
    redirect('/login')
  } 
}

export default auth
