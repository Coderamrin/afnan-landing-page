import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Noto_Serif_Bengali } from 'next/font/google';
import FacebookPixel from '@/components/FacebookPixel';
import './globals.css';

const font = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'আফনান ফ্যাশন | বোরকা হিজাব নিকাব',
  description: 'প্রিমিয়াম মানের বোরকা, হিজাব ও নিকাব। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।',
  keywords: 'বোরকা, হিজাব, নিকাব, পর্দা, আফনান ফ্যাশন',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body className={font.className} style={{ background: '#faf9f6' }}>
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
