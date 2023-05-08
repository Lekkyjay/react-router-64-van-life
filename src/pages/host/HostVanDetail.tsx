import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { IVan } from '../../interfaces'

export default function HostVanDetail() {
  const { id } = useParams()
  const [currentVan, setCurrentVan] = useState<IVan>({} as IVan)
  const apiURL = 'https://us-central1.gcp.data.mongodb-api.com/app/van-life-poqsu/endpoint/host/vans'

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }

  const navLinkStyles = ({ isActive }: { isActive: Boolean }) => isActive ? activeStyles : {}

  useEffect(() => {
    fetch(`${apiURL}?id=${id}`)
      .then(res => res.json())
      .then(data => setCurrentVan(data[0]))
  }, [])

  if (!currentVan) {
    return <h1>Loading...</h1>
  }

  return (
    <section>
      <Link to=".." relative="path" className="back-button">&larr; <span>Back to all vans</span></Link>

      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>

        <nav className="host-van-detail-nav">
          <NavLink to="." end style={navLinkStyles}>Details</NavLink>
          <NavLink to="pricing" style={navLinkStyles}>Pricing</NavLink>
          <NavLink to="photos" style={navLinkStyles}>Photos</NavLink>
        </nav>
        <Outlet context={{ currentVan }} />
      </div>
    </section>
  )
}

export function useCurrentVan() {
  return useOutletContext<{ currentVan: IVan | null }>()
}
