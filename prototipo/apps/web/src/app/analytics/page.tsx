'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Analytics() {
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState({})

  useEffect(() => {
    fetch('http://localhost:4000/analytics/events')
      .then(res => res.json())
      .then(setEvents)
    fetch('http://localhost:4000/analytics/stats')
      .then(res => res.json())
      .then(setStats)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Analítica</h1>
          <Link href="/" className="text-blue-600 hover:underline">Volver</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats).map(([key, value]: any) => (
              <div key={key} className="text-center p-3 bg-gray-50 rounded">
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-gray-600">{key}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Eventos Recientes</h2>
          <div className="space-y-2">
            {events.map((event: any) => (
              <div key={event.id} className="border-l-4 border-blue-500 pl-3 py-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold">{event.type}</span>
                  <span className="text-gray-500">{new Date(event.occurredAt).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
