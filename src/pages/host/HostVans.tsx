import { Link, useLoaderData } from 'react-router-dom'
import { IVan } from '../../interfaces'
import { getHostVans } from '../../apiService'
import { requireAuth } from '../../utils'

export default function HostVans() {
  const vans = useLoaderData() as IVan[]  

  const hostVansEls = vans?.map(van => (
    <Link to={van._id} key={van._id} className="host-van-link-wrapper">
      <div className="host-van-single" key={van._id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ))

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        <section>{hostVansEls}</section>
      </div>
    </section>
  )
}

export async function hostVansLoader({ request }: any) {
  await requireAuth(request)
  return getHostVans()
}
