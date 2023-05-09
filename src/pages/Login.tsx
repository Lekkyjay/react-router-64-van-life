import { Form, redirect, useActionData, useLoaderData, useNavigation } from 'react-router-dom'
import { loginUser } from "../apiService"
import { ReactNode } from "react"

export default function Login() {
  const errorMessage = useActionData() as ReactNode
  const message = useLoaderData() as ReactNode
  const navigation = useNavigation()

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      <Form method="post"  className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  )
}

//fn runs when Form is submitted. must be added to the login route as action.
//action and loader fns recieve an obj as arg. { request: Request {}, params: {} }
export async function loginAction({ request }: any) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  if (email === '' || password === '') return 'Credentials must be provided'

  const pathname = new URL(request.url).searchParams.get('redirectTo') || '/host'

  try {
    const user = await loginUser({ email, password })
    localStorage.setItem('loggedin', JSON.stringify(user))
    return redirect(pathname)
  } 
  catch(err: any) {
    return err.message
  }
}

export function loginLoader({ request }: any) {
  return new URL(request.url).searchParams.get('message')
}
