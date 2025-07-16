import "@/styles/globals.css";
import "aos/dist/aos.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import AOS from "aos";
import Modal from "react-modal";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    Modal.setAppElement("#__next");
  }, []);

  return (
    <>
      {/* Google Analytics Script */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-CK53K43EV0" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CK53K43EV0');
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}
