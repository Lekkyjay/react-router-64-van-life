export interface IVan { 
  _id: string
  name: string
  price: number
  description: string
  imageUrl: string
  type: string
  hostId: string
}

export interface IError {
  message: string
  status: string
  statusText: string
}
