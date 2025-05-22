import { Metadata } from 'next'
import { Shippori_Antique, Dancing_Script } from 'next/font/google'
import './globals.css'

const shipporiAntique = Shippori_Antique({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-shippori',
})

const dancingScript = Dancing_Script({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-dancing',
})

export const metadata: Metadata = {
  title: 'Happy Birthday',
  description: 'Birthday Greeting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${shipporiAntique.variable} ${dancingScript.variable}`}>
        {children}
      </body>
    </html>
  )
}