'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('test@test.com')
  const [logged, setLogged] = useState(false)

  const login = async () => {
    const res = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    const data = await res.json()
    localStorage.setItem('token', data.token)
    setLogged(true)
  }

  if (!logged) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Trotamundos</h1>
          <p className="text-sm text-gray-600 mb-4 text-center">Login simulado</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="email"
          />
          <button onClick={login} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Entrar (simulado)
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Trotamundos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/trips" className="bg-white p-6 rounded-lg shadow hover:shadow-md">
            <h2 className="text-xl font-semibold mb-2">Mis Viajes</h2>
            <p className="text-gray-600">Ver viajes agrupados por itinerario</p>
          </Link>
          <Link href="/ingest" className="bg-white p-6 rounded-lg shadow hover:shadow-md">
            <h2 className="text-xl font-semibold mb-2">Ingesta (Simulador)</h2>
            <p className="text-gray-600">Procesar correos y actualizaciones de proveedores</p>
          </Link>
          <Link href="/assistant" className="bg-white p-6 rounded-lg shadow hover:shadow-md">
            <h2 className="text-xl font-semibold mb-2">Asistente Virtual</h2>
            <p className="text-gray-600">Chatbot con handoff a agencia</p>
          </Link>
          <Link href="/analytics" className="bg-white p-6 rounded-lg shadow hover:shadow-md">
            <h2 className="text-xl font-semibold mb-2">Analítica</h2>
            <p className="text-gray-600">Eventos de dominio registrados</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
