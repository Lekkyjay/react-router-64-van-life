import { useRouteError } from 'react-router-dom'
import { IError } from '../interfaces'

export default function ErrorBoundary() {
  const error = useRouteError() as IError

  return (
    <>
      <h1>Error: {error.message}</h1>
      <pre>{error.status} - {error.statusText}</pre>
    </>
  )
}
