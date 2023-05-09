import { redirect } from 'react-router-dom'

export async function requireAuth(request: any) {
  const pathname = new URL(request.url).pathname
  const isLoggedIn = JSON.parse(localStorage.getItem('loggedin') as string)

  if (!isLoggedIn) {
    throw redirect(`/login?message=You must log in first.&redirectTo=${pathname}`)
  }
  return null
}
