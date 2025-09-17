import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Categories from "@/components/products/ProductCategories";
import Banner from "@/components/home/Banner";
import InstagramView from "@/components/layout/InstagramView";
import CustomerReview from "@/components/home/CustomerReview";
import ConsultSection from "@/components/home/ConsultSection";
import ChooseUsSection from "@/components/home/ChooseUsSection";
import ProductCarousel from "@/components/products/ProductCarousel";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
    <Head>
  <title>Alankar Jewellers Rishikesh | Best Jewellery Shop in Uttarakhand</title>
  <meta name="description" content="Explore timeless elegance at Alankar Jewellers – the best jewellery shop in Rishikesh. Handcrafted silver, gold, and traditional ornaments rooted in Uttarakhand's heritage." />
  <meta name="keywords" content="best jewellery shop in Rishikesh, jewellery store Rishikesh, best jewellery shop in Uttarakhand, silver jewellery Uttarakhand, gold jewellery Rishikesh, Alankar Jewellers, Rishikesh jewellery shop, bridal jewellery Rishikesh, handmade jewellery Uttarakhand" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {/* Open Graph */}
  <meta property="og:title" content="Alankar Jewellers Rishikesh | Finest Jewellery in Uttarakhand" />
  <meta property="og:description" content="Visit Alankar Jewellers – your trusted jewellery store in Rishikesh. Premium silver, gold & custom ornaments from Uttarakhand." />
  <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
  <meta property="og:url" content="https://yourdomain.com" />
  <meta property="og:type" content="website" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Alankar Jewellers Rishikesh | Elegant Jewellery for Every Occasion" />
  <meta name="twitter:description" content="Handcrafted jewellery inspired by Uttarakhand’s tradition. Discover silver, gold & bridal pieces." />
  <meta name="twitter:image" content="https://yourdomain.com/og-image.jpg" />
</Head>

      <Hero />
      <Banner />
      <Categories />
      <InstagramView />
      <ProductCarousel />
      <ConsultSection />
      <CustomerReview />
      <ChooseUsSection />

    </>
     
  );
}
