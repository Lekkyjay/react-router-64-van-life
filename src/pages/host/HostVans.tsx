import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IVan } from '../../interfaces'

export default function HostVans() {
  const [vans, setVans] = useState<IVan[]>([])

  // const apiURL = 'https://us-central1.gcp.data.mongodb-api.com/app/van-life-poqsu/endpoint/host/vans'
  const apiURL = 'https://us-central1.gcp.data.mongodb-api.com/app/van-life-poqsu/endpoint/vans'

    useEffect(() => {
      fetch(apiURL)
        .then(res => res.json())
        .then(data => setVans(data))
    }, [])

    const hostVansEls = vans?.map(van => (
      <Link to={van.hostId} key={van._id} className="host-van-link-wrapper">
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
        {
          vans.length > 0 
          ? (<section>{hostVansEls}</section>) 
          : (<h2>Loading...</h2>)
        }
      </div>
    </section>
  )
}
