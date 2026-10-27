'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Trips() {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/trips')
      .then(res => res.json())
      .then(setTrips)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Mis Viajes</h1>
          <Link href="/" className="text-blue-600 hover:underline">Volver</Link>
        </div>
        {trips.length === 0 ? (
          <p className="text-gray-600">No hay viajes. Agrega una reserva manual o procesa correos desde el simulador.</p>
        ) : (
          <div className="space-y-4">
            {trips.map((item: any) => (
              <Link key={item.trip.id} href={`/trips/${item.trip.id}`} className="block bg-white p-6 rounded-lg shadow hover:shadow-md">
                <h2 className="text-xl font-semibold mb-2">{item.trip.title}</h2>
                <p className="text-gray-600 mb-2">
                  {new Date(item.trip.startDate).toLocaleDateString()} - {new Date(item.trip.endDate).toLocaleDateString()}
                </p>
                <span className={`px-2 py-1 rounded text-sm ${
                  item.trip.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                  item.trip.status === 'COMPLETED' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.trip.status}
                </span>
                <p className="text-sm text-gray-500 mt-2">{item.reservations.length} reserva(s)</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

        <div className="mb-4">
          <Link href="/trips/crear" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Agregar reserva manual
          </Link>
        </div>
