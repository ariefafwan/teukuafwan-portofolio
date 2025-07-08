import "@/styles/globals.css";
import "aos/dist/aos.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import AOS from "aos";
import Modal from "react-modal";

if (typeof window !== "undefined") {
  Modal.setAppElement("#__next"); // Untuk Next.js (default root ID)
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return <Component {...pageProps} />;
}
