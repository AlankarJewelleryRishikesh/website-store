// pages/_app.tsx

import "@/styles/globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/globals.css'; // Tailwind or other global styles

import type { AppProps } from "next/app";
import Layout from "@/components/layout/layout"; // ⬅️ Import your layout

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
