import React from 'react'
import { Await, Link, defer, useLoaderData } from 'react-router-dom'
import { BsStarFill } from 'react-icons/bs'
import { requireAuth } from '../../utils'
import { getHostVans } from '../../apiService'
import { IVan } from '../../interfaces'

export default function Dashboard() {
  const hostVansPromise = useLoaderData() as { vans: Promise<IVan[]> }

  const renderHostVanElements = (vans: IVan[]) => {
    const hostVanElements = vans.map((van) => (
      <div className="host-van-single" key={van._id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
        <Link to={`vans/${van._id}`}>View</Link>
      </div>
    ))

    return (
      <div className="host-vans-list">
        <section>{hostVanElements}</section>
      </div>
    )
  }

  return (
    <>
      <section className="host-dashboard-earnings">
        <div className="info">
          <h1>Welcome!</h1>
          <p>Income last <span>30 days</span></p>
          <h2>$2,260</h2>
        </div>
        <Link to="income">Details</Link>
      </section>
      <section className="host-dashboard-reviews">
        <h2>Review score</h2>
        <BsStarFill className="star" />
        <p>
          <span>5.0</span>/5
        </p>
        <Link to="reviews">Details</Link>
      </section>
      <section className="host-dashboard-vans">
        <div className="top">
          <h2>Your listed vans</h2>
          <Link to="vans">View all</Link>
        </div>
        <React.Suspense fallback={<h3>Loading...</h3>}>
          <Await resolve={hostVansPromise.vans}>{renderHostVanElements}</Await>
        </React.Suspense>
      </section>
    </>
  )
}

export async function dashBoardLoader({ request }: any) {
  await requireAuth(request)
  return defer({ vans: getHostVans() })
}
