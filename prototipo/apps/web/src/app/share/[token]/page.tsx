'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function SharedTrip() {
  const params = useParams()
  const [tripData, setTripData] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`http://localhost:4000/share/public/${params.token}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(setTripData)
      .catch(e => setError('Itinerario no encontrado o expirado'))
  }, [params.token])

  if (error) return <div className="p-8 text-center text-red-600">{error}</div>
  if (!tripData) return <div className="p-8">Cargando...</div>

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{tripData.trip.title} (Compartido)</h1>
        <p className="text-gray-600 mb-6">Vista de solo lectura</p>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Reservas</h2>
          <div className="space-y-3">
            {tripData.reservations.map((res: any) => (
              <div key={res.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{res.type}</span>
                  <span className="text-sm text-gray-500">{res.source}</span>
                </div>
                <p className="text-sm text-gray-600">Proveedor: {res.provider}</p>
                <p className="text-sm text-gray-600">Ref: {res.bookingRef}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
