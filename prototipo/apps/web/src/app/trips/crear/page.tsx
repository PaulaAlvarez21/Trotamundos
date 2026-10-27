'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CrearReserva() {
  const router = useRouter()
  const [form, setForm] = useState({
    type: 'FLIGHT',
    provider: '',
    bookingRef: '',
    startAt: '',
    endAt: ''
  })

  const submit = async (e: any) => {
    e.preventDefault()
    await fetch('http://localhost:4000/reservations/manual', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    router.push('/trips')
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Agregar Reserva Manual</h1>
          <Link href="/trips" className="text-blue-600 hover:underline">Volver</Link>
        </div>

        <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} className="w-full p-2 border rounded">
              <option value="FLIGHT">Vuelo</option>
              <option value="HOTEL">Hotel</option>
              <option value="CAR">Auto</option>
              <option value="TRAIN">Tren</option>
              <option value="BUS">Bus</option>
              <option value="OTHER">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Proveedor</label>
            <input value={form.provider} onChange={(e) => setForm({...form, provider: e.target.value})} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Código de Reserva</label>
            <input value={form.bookingRef} onChange={(e) => setForm({...form, bookingRef: e.target.value})} className="w-full p-2 border rounded" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fecha inicio</label>
              <input type="date" value={form.startAt} onChange={(e) => setForm({...form, startAt: e.target.value})} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fecha fin</label>
              <input type="date" value={form.endAt} onChange={(e) => setForm({...form, endAt: e.target.value})} className="w-full p-2 border rounded" required />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Guardar</button>
        </form>
      </div>
    </main>
  )
}
