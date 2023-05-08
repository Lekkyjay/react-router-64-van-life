import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IVan } from '../../interfaces'

export default function VanDetail() {
  const { id } = useParams()
  const [van, setVan] = useState<IVan>({} as IVan)

  const apiURL = 'https://us-central1.gcp.data.mongodb-api.com/app/van-life-poqsu/endpoint/van'

  useEffect(() => {
    fetch(`${apiURL}?id=${id}`)
      .then(res => res.json())
      .then(data => setVan(data[0]))
  }, [id])

  return (
    <div className="van-detail-container">
      {van 
        ? (
            <div className="van-detail">
              <img src={van.imageUrl} />
              <i className={`van-type ${van.type} selected`}>
                {van.type}
              </i>
              <h2>{van.name}</h2>
              <p className="van-price"><span>${van.price}</span>/day</p>
              <p>{van.description}</p>
              <button className="link-button">Rent this van</button>
            </div>
          ) 
        : <h2>Loading...</h2>}
    </div>
  )
}
