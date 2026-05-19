import type { Metadata } from 'next'
import Script from 'next/script'
import { LanguageProvider } from '@/context/LanguageContext'
import './globals.css'

const META = {
  name: 'Richard Mario',
  title: 'Richard Mario — Full-Stack Engineer & Freelance Developer',
  description:
    'Full-Stack Engineer dengan 8+ tahun pengalaman membangun web, mobile & AI systems. Tersedia untuk freelance & remote. Spesialisasi: Next.js, React, Node.js, FastAPI, Flutter, PostgreSQL, Supabase. Berbasis di Jakarta/Bekasi, Indonesia.',
  url: 'https://richardmario.dev',
  image: '/og-image.png',
}

export const metadata: Metadata = {
  title: {
    default: META.title,
    template: `%s — ${META.name}`,
  },
  description: META.description,
  keywords: [
    'full stack developer indonesia',
    'freelance programmer indonesia',
    'jasa programmer',
    'jasa web developer',
    'jasa pembuatan website',
    'next.js developer',
    'react developer',
    'node.js developer',
    'fastapi developer',
    'flutter developer',
    'web developer jakarta',
    'web developer bekasi',
    'AI developer indonesia',
    'fullstack engineer',
    'freelance web developer',
    'Richard Mario',
    'software engineer indonesia',
    'backend developer indonesia',
    'frontend developer indonesia',
    'mobile app developer indonesia',
  ],
  authors: [{ name: META.name, url: META.url }],
  creator: META.name,
  metadataBase: new URL(META.url),
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    url: META.url,
    title: META.title,
    description: META.description,
    siteName: META.name,
    images: [{ url: META.image, width: 1200, height: 630, alt: META.title }],
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: META.title,
    description: META.description,
    images: [META.image],
  },
  category: 'technology',
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  )
}
