import { useCurrentVan } from './HostVanDetail'

export default function HostVanPhotos() {
  const { currentVan } = useCurrentVan()

  return (
    <img src={currentVan!.imageUrl} className="host-van-detail-image" />
  )
}
