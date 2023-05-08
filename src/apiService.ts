const apiURL = 'https://us-central1.gcp.data.mongodb-api.com/app/van-life-poqsu/endpoint/vans'

export async function getVans() {
  const res = await fetch(apiURL)
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans", 
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json()
  await timeOut(1000)
  return data
}

function timeOut(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}