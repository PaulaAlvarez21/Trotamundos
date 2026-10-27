'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Ingest() {
  const [emailsResult, setEmailsResult] = useState<any>(null)
  const [providersResult, setProvidersResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const processEmails = async () => {
    setLoading(true)
    const res = await fetch('http://localhost:4000/ingest/emails', { method: 'POST' })
    const data = await res.json()
    setEmailsResult(data)
    setLoading(false)
  }

  const pollProviders = async () => {
    setLoading(true)
    const res = await fetch('http://localhost:4000/ingest/providers', { method: 'POST' })
    const data = await res.json()
    setProvidersResult(data)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Ingesta (Simulador)</h1>
          <Link href="/" className="text-blue-600 hover:underline">Volver</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Procesar Correos</h2>
            <p className="text-sm text-gray-600 mb-4">Simula lectura de correos con whitelist (RF-03, RF-07)</p>
            <button onClick={processEmails} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
              Sincronizar correo
            </button>
            {emailsResult && (
              <div className="mt-4 text-sm">
                <p>Procesados: {emailsResult.processed}</p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Actualizar Proveedores</h2>
            <p className="text-sm text-gray-600 mb-4">Simula polling a APIs de terceros (RF-04)</p>
            <button onClick={pollProviders} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50">
              Simular actualización proveedor
            </button>
            {providersResult && (
              <div className="mt-4 text-sm">
                <p>Actualizados: {providersResult.updated}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Correos mock (whitelisted)</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• reservas@vuelos.com - Confirmación de vuelo ABC123</li>
            <li>• hotel@reservas.com - Reserva hotel HOTEL-456</li>
            <li>• spam@otro.com - <span className="text-red-600">Filtrado (no whitelisted)</span></li>
          </ul>
        </div>
      </div>
    </main>
  )
}
