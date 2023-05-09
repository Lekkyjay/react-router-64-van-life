import { redirect } from "react-router-dom"

export async function requireAuth() {
  const isLoggedIn = JSON.parse(localStorage.getItem('loggedin') as string)

  if (!isLoggedIn) {
    throw redirect('/login?message=You must log in first.')
  }
  return null
}
