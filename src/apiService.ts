const vansURL = 'https://us-central1.gcp.data.mongodb-api.com/app/van-life-poqsu/endpoint/vans'
const hostVansURL = 'https://us-central1.gcp.data.mongodb-api.com/app/van-life-poqsu/endpoint/host/vans'

export async function getVans() {
  const res = await fetch(vansURL)
  if (!res.ok) {
    throw {
      message: 'Failed to fetch vans', 
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json()
  return data
}

export async function getVanDetail(id: string) {
  const res = await fetch(`${vansURL}?id=${id}`)
  if (!res.ok) {
    throw {
      message: 'Failed to fetch van details', 
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json()
  return data[0]
}

export async function getHostVans() {
  const res = await fetch(hostVansURL)
  if (!res.ok) {
    throw {
      message: 'Failed to fetch host vans',
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json()
  return data.vans
}

export async function getHostVanDetail(id: string) {
  const res = await fetch(`${hostVansURL}?id=${id}`)
  if (!res.ok) {
    throw {
      message: 'Failed to fetch host van details',
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json()
  return data.vans
}