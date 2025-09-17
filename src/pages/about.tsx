"use client";

import Image from "next/image";
import Link from "next/link";
// import { ArrowRight } from "lucide-react"

const AboutPage = () => {
  return (
    <div className="w-full bg-[#5C1F1F] text-white mt-20">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[400px] md:min-h-[600px] px-6 sm:px-12 md:px-20">
          {/* Left: Hero Image */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] rounded-lg overflow-hidden">
            <Image
              src="/assets/categories/modelabout.png" // Your image path
              alt="Garhwali Brides with Jewellery"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right: Hero Text */}
          <div className="flex flex-col justify-center px-4 sm:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl md:text-5l font-serif font-bold text-[#FFD88A] leading-snug">
              Garhwali Tradition, <br /> Modern Sparkle
            </h1>
            <p className="mt-3 text-base sm:text-lg tracking-wide text-[#FFD88A] uppercase font-semibold">
              Alankar Jewellers, Rishikesh
            </p>
            <button className="mt-8 bg-[#FFD88A] text-[#5C1F1F] font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#e6c36f] transition w-fit">
              See the Heritage
            </button>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 px-6 sm:px-12 md:px-20 bg-[#F7DAB8] text-[#1B1B1B]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5C1F1F] mb-6">
              About Us
            </h2>
            <p className="text-lg mb-4 leading-relaxed text-gray-800">
              <span className="font-semibold">Alankar Jewellers</span> is not
              just a showroom, it is a reflection of Garhwali soul and culture.
              Every piece of our jewellery embodies the purity of the Ganges,
              the sanctity of the Himalayas and the essence of Garhwali culture.
            </p>
            <p className="text-lg mb-4 leading-relaxed text-gray-800">
              Since 1978, our creations have been part of Rishikesh and
              Garhwal’s weddings and festivals. We blend traditional designs
              with modern touch to create a collection that is both trendy and
              rooted in heritage.
            </p>
          </div>

          {/* Jewellery Image Card */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-[#580F09] rounded-xl shadow-lg p-6">
              <Image
                src="/assets/hero.png" // replace with your jewellery image
                alt="Jewellery Collection"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Jewellery Collection */}
      <section className="py-16 px-6 sm:px-12 md:px-20 bg-[#FDF6EC] text-[#1B1B1B]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5C1F1F] mb-10">
            Jewellery Collection
          </h2>

          {/* Collection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
            {/* Garhwali Heritage */}
            <div className="bg-[#580F09] rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition">
              <Image
                src="/assets/hero.png" // replace
                alt="Garhwali Heritage"
                width={120}
                height={120}
                className="object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Garhwali Heritage Collection
              </h3>
              <p className="text-white text-sm">Identity of Garhwali brides.</p>
            </div>

            {/* Bridal */}
            <div className="bg-[#580F09] rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition">
              <Image
                src="/assets/hero2.png" // replace
                alt="Bridal Collection"
                width={120}
                height={120}
                className="object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Bridal Collection
              </h3>
              <p className="text-white text-sm">Brides sets</p>
            </div>

            {/* Modern */}
            <div className="bg-[#580F09] rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition">
              <Image
                src="/assets/hero.png" // replace
                alt="Modern Collection"
                width={120}
                height={120}
                className="object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Modern Collection
              </h3>
              <p className="text-white text-sm">Office and party wear</p>
            </div>
          </div>

          {/* Button */}
          <Link href="/store">
            <button className="bg-[#5C1F1F] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#3e1616] transition flex items-center gap-2 mx-auto">
              Find Your Perfect Piece
            </button>
          </Link>
        </div>
      </section>

      {/* Footer Strip */}
      <div className="bg-[#5C1F1F] py-4 text-center text-[#FFD88A] font-medium text-sm">
        Alankar Jewellers — Ornament of Every Relationship, Pride of Garhwal
      </div>
    </div>
  );
};

export default AboutPage;
