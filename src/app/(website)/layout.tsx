import { inter, monoton } from '@/utils/fonts'
import './global.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${monoton.variable}`}>
        <div className="grid min-h-[100dvh] grid-rows-[1fr_auto]">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
