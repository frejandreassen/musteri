import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Herting trädgårdsmusteri',
  description: 'Litet musteri hemma hos oss på Hertings allé',
}

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
