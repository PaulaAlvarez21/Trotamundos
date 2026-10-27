'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function TripDetail() {
  const params = useParams()
  const [tripData, setTripData] = useState<any>(null)
  const [showShare, setShowShare] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    fetch(`http://localhost:4000/trips/${params.id}`)
      .then(res => res.json())
      .then(setTripData)
  }, [params.id])

  const shareTrip = async () => {
    const res = await fetch(`http://localhost:4000/share/${params.id}`, { method: 'POST' })
    const data = await res.json()
    setShareUrl(data.shareUrl)
    setShowShare(true)
  }

  if (!tripData) return <div className="p-8">Cargando...</div>

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{tripData.trip.title}</h1>
          <div className="flex gap-4">
            <button onClick={shareTrip} className="text-blue-600 hover:underline">Compartir</button>
            <Link href="/trips" className="text-blue-600 hover:underline">Volver</Link>
          </div>
        </div>

        {showShare && (
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <p className="text-sm text-gray-600 mb-2">Link para compartir (expira en 24h):</p>
            <input value={shareUrl} readOnly className="w-full p-2 border rounded" />
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Reservas</h2>
          {tripData.reservations.length === 0 ? (
            <p className="text-gray-600">No hay reservas</p>
          ) : (
            <div className="space-y-3">
              {tripData.reservations.map((res: any) => (
                <div key={res.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">{res.type}</span>
                    <span className="text-sm text-gray-500">{res.source}</span>
                  </div>
                  <p className="text-sm text-gray-600">Proveedor: {res.provider}</p>
                  <p className="text-sm text-gray-600">Ref: {res.bookingRef}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(res.startAt).toLocaleDateString()} - {new Date(res.endAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
