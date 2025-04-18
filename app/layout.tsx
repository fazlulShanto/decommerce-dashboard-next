import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Decommerce Discord Bot Dashboard',
  description: 'Decommerce Discord Bot Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className='dark'>{children}</body>
    </html>
  )
}
