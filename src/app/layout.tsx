import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ErrorBoundary from './components/ErrorBoundary';
import { Providers } from './components/Providers';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Open your Business to the Next Dimension",
  description: "Transform your business with cutting-edge technology and innovative solutions. Experience the future of digital transformation.",
  keywords: ["business", "technology", "innovation", "digital transformation", "next dimension"],
  authors: [{ name: "Tesseract Integrations" }],
  creator: "Tesseract Integrations",
  publisher: "Tesseract Integrations",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    title: "Open your Business to the Next Dimension",
    description: "Transform your business with cutting-edge technology and innovative solutions.",
    url: "https://tesseract-integrations.com",
    siteName: "Tesseract Integrations",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tesseract Integrations - Next Dimension Business Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open your Business to the Next Dimension",
    description: "Transform your business with cutting-edge technology and innovative solutions.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased bg-black text-white min-h-screen">
        <Providers>
          {/* Main Content */}
          <main id="main-content" className="relative">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>
        
        {/* Modal Portal Container */}
        <div id="modal-root" className="relative z-50" />
        
        {/* Toast/Notification Portal Container */}
        <div id="toast-root" className="relative z-40" />
        
        {/* Loading Overlay */}
        <div id="loading-overlay" className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-innovation"></div>
        </div>
        </Providers>
      </body>
    </html>
  );
}
