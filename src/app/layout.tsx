import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { DigitalArena } from '@/components/arena'
import { CommandPalette } from '@/components/features/command-palette'
import './globals.css'

export const dynamic = 'force-dynamic'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: 'ATE Digital Arena | Alanya Taudra E-Sports',
  description: 'They played, we ATE. Alanya Taudra E-Sports resmi platformu. Alanya\'nın dijital e-spor altyapısı.',
  manifest: '/manifest.json',
  icons: {
    icon: '/ate-logo.png',
    apple: '/ate-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-[#050505] text-[#F7F7F7] antialiased min-h-screen flex flex-col relative overflow-x-hidden selection:bg-[#D00000] selection:text-white`}>
        <DigitalArena variant="default" intensity={0.9} />
        <CommandPalette />
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111114',
              color: '#F7F7F7',
              border: '1px solid rgba(255,255,255,0.08)'
            },
          }}
        />
      </body>
    </html>
  )
}
