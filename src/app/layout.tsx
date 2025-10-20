import { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

import './globals.css';
import Loading from '@/components/Loading';

export const metadata: Metadata = {
  title: `神机阁 - 星河的个人博客`,
  description: `一个记录技术、生活和思考的个人博客空间`,
  manifest: "/manifest.json",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 字体 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-lite-webfont@1.1.0/style.css"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;600;700&display=swap"
        />
        {/* PWA / Theme Color */}
        <meta name="theme-color" content="#0070f3" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans flex flex-col min-h-screen"
        style={{
          "--main-color": "rgba(128,30,255,1)",
          "--shadow-color": "rgba(178,80,255,0.99)",
          "--transplant-color": "rgba(128,30,255,0.1)",
          "--light-color": "rgba(248,242,255,0.7)",
        } as React.CSSProperties}
      >

        <div id="app">
          <NavBar />
          <Suspense fallback={<div className=""></div>}>
            <div id="main">
              <div className="inner">
                {children}
              </div>
              <Footer />
            </div>
          </Suspense>
        </div>
        <Loading />
      </body>
    </html >
  );
}

