import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trotamundos',
  description: 'Panel de gestión de viajes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
