import { Await, Link, defer, useLoaderData, useNavigation, useSearchParams } from 'react-router-dom'
import { IVan } from '../../interfaces'
import { getVans } from '../../apiService'

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams()
  const vansPromise = useLoaderData() as { vans: Promise<IVan[]> }
  const navigation = useNavigation()

  const typeFilter = searchParams.get('type')

  if (navigation.state === 'loading') return <h1>Loading ...</h1>

  const renderVans = (vans: IVan[]) => {
    const filteredVans = typeFilter 
      ? vans.filter(van => van.type === typeFilter)
      : vans
  
    const vanElements = filteredVans?.map(van => (
      <div key={van._id} className="van-tile">
        <Link to={van._id} state={{ search: `?${searchParams.toString()}`, type: typeFilter }}>
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
      <>
        <div className="van-list-filter-buttons">
          <button onClick={()=>setSearchParams({type: 'simple'})} className={`van-type simple ${typeFilter==="simple" ? "selected" : ""}`}>
            Simple
          </button>
          <button onClick={() => setSearchParams({type: 'luxury'})} className={`van-type simple ${typeFilter==="luxury" ? "selected" : ""}`}>
            Luxury
          </button>
          <button onClick={() => setSearchParams({type: 'rugged'})} className={`van-type simple ${typeFilter==="rugged" ? "selected" : ""}`}>
            Rugged
          </button>
          {typeFilter 
            ? (<button onClick={() => setSearchParams({})} className="van-type clear-filters">Clear filter</button>) 
            : null
          }
        </div>
  
        <div className="van-list">
          {vanElements}
        </div>
      </>
    )
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      
      <Await resolve={vansPromise.vans}>
        { renderVans }      
      </Await>
      
    </div>
  )
}

export function vansLoader() {
  return defer({ vans: getVans() })
}
