'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export default function FacebookPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PIXEL_ID) return;

    const init = () => {
      if (typeof (window as any).fbq === 'function') return;
      /* eslint-disable */
      (function(f: any, b: any, e: any, v: any) {
        if (f.fbq) return;
        const n: any = f.fbq = function() { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n;
        n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
        const t = b.createElement(e); t.async = true; t.src = v;
        const s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
      (window as any).fbq('init', PIXEL_ID);
      (window as any).fbq('track', 'PageView');
    };

    const events = ['mousedown', 'touchstart', 'scroll'];
    const handler = () => { init(); events.forEach(ev => window.removeEventListener(ev, handler)); };
    const timer = setTimeout(init, 3000);
    events.forEach(ev => window.addEventListener(ev, handler, { passive: true }));
    return () => { clearTimeout(timer); events.forEach(ev => window.removeEventListener(ev, handler)); };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'PageView');
    }
  }, [pathname]);

  return null;
}
