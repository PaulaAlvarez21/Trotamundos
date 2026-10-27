'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Assistant() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    setLoading(true)
    const userMsg = { role: 'user', content: input }
    setMessages([...messages, userMsg])
    
    const res = await fetch('http://localhost:4000/assistant/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input, sessionId })
    })
    const data = await res.json()
    if (!sessionId) setSessionId(data.sessionId)
    
    setMessages([...messages, userMsg, { role: 'bot', content: data.response, handoff: data.handoff }])
    setInput('')
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Asistente Virtual</h1>
          <Link href="/" className="text-blue-600 hover:underline">Volver</Link>
        </div>

        <div className="bg-white rounded-lg shadow h-96 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-gray-500 text-center mt-8">Hola! Puedo ayudarte a consultar el estado de tus viajes o escalarte a la agencia.</p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  <p className="text-sm">{msg.content}</p>
                  {msg.handoff && (
                    <div className="mt-2 p-2 bg-green-100 text-green-800 rounded text-xs">
                      Caso: {msg.handoff.caseId}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 p-2 border rounded"
              placeholder="Escribe un mensaje..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
              Enviar
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>Prueba: "¿Cuál es el estado de mi viaje?" o "Tengo un problema, ayúdame" o "Quiero hablar con la agencia"</p>
        </div>
      </div>
    </main>
  )
}
