import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { IVan } from '../../interfaces'

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [vans, setVans] = useState<IVan[]>([])
  const apiURL = 'https://us-central1.gcp.data.mongodb-api.com/app/van-life-poqsu/endpoint/vans'
  
  useEffect(() => {
    fetch(apiURL)
      .then(res => res.json())
      .then(data => setVans(data))
  }, [])

  const typeFilter = searchParams.get('type')

  const filteredVans = typeFilter 
    ? vans.filter(van => van.type === typeFilter)
    : vans

  const vanElements = filteredVans?.map(van => (
    <div key={van._id} className="van-tile">
      <Link to={van._id}>
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>${van.price}<span>/day</span></p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ))

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>

      <div className="van-list-filter-buttons">
        <button onClick={()=>setSearchParams({type: 'simple'})} className={`van-type simple ${typeFilter==="simple" ? "selected" : ""}`}>Simple</button>
        <button onClick={() => setSearchParams({type: 'luxury'})} className={`van-type simple ${typeFilter==="luxury" ? "selected" : ""}`}>Luxury</button>
        <button onClick={() => setSearchParams({type: 'rugged'})} className={`van-type simple ${typeFilter==="rugged" ? "selected" : ""}`}>Rugged</button>
        {typeFilter 
          ? (<button onClick={() => setSearchParams({})} className="van-type clear-filters">Clear filter</button>) 
          : null
        }
      </div>

      <div className="van-list">
        {vanElements}
      </div>
    </div>
  )
}
