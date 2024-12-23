import { Inter, Monoton } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
})

export const monoton = Monoton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-monoton',
})
