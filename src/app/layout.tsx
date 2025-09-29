import { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: `神机阁 - 星河的个人博客`,
  description: `一个记录技术、生活和思考的个人博客空间`,
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        {/* <link
          rel="stylesheet"
          href="https://at.alicdn.com/t/c/font_4934641_ru2cdfa9zj.css"
        /> */}
        {/* <link
          rel="stylesheet"
          href="https://kirigaya.cn/css/app.1c0cdd57.css"
        /> */}

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
      </body>
    </html >
  );
}

