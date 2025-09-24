'use client';

import Slider from 'react-slick';
import { motion } from 'framer-motion';
import Link from 'next/link';
// inside your layout or _app.js
import { Noto_Sans_Devanagari } from 'next/font/google';

const hindiFont = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '600'],
});


const slides = [
//   {
//     title: 'The Perfect Jewels For You',
//     description:
//       'Welcoming in the season with an enchanting Emerald & Diamond necklace.',
//     image: '/assets/hero.png',
//   },
//   {
//     title: 'Luxury Crafted With Love',
//     description: 'Explore timeless pieces that shine as bright as your moments.',
//     image: '/assets/hero2.png',
//   },
  {
    title: 'Alankar Jewellers Rishikesh ',
description: `हम सिर्फ गहने नहीं बेचते, हम कहानियाँ गढ़ते हैं। हमारी टीम गढ़वाली पारंपरिक डिज़ाइनों को आधुनिक फैशन के साथ मिलाकर एक नया अंदाज़ देती है – ताकि आज की पीढ़ी भी अपनी संस्कृति को गर्व से पहन सके।`,

    image: '/assets/slide1.webp',
  },
];

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  return (
    <section className="mt-16 relative mb-0">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="relative h-[80vh] sm:h-[90vh] w-full overflow-hidden"
          >
            {/* Background Image instead of gradient */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/assets/herodesign.png')`,
              }}
            />

            {/* Foreground Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="
                absolute 
                right-4 
                bottom-0 
                w-3/4 
                sm:w-1/2 
                lg:w-[30%] 
                object-contain 
                z-10 
                pointer-events-none
                max-w-none
                sm:max-w-full
              "
              style={{
                right: '0.5rem',
              }}
            />

            {/* Text + CTA */}
            <div className="relative z-20 h-full flex flex-col justify-start sm:justify-center items-start px-4 sm:px-16 pt-16 sm:pt-0 text-white max-w-xl">
              {/* Subtitle */}
              <motion.span
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="uppercase tracking-widest text-sm text-white/50 mb-2 font-sans"
              >
                Jewelry Design With Love
              </motion.span>

              {/* Main Title */}
              <motion.h1
  initial={{ x: -50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 1, delay: 0.2 }}
className="font-playfair text-xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-[#F0C694] mb-4 whitespace-nowrap overflow-hidden text-ellipsis"

  style={{ fontFamily: "'Playfair Display', serif" }}
>
  {slide.title}
</motion.h1>


              {/* Description */}
            <motion.p
  initial={{ x: -50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 1, delay: 0.4 }}
  className="text-[#F0C694] text-base sm:text-lg mb-8 font-sans"
  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
>
  {slide.description}
</motion.p>


              {/* Buttons */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex gap-4"
              >
                <Link
                  href="/store"
                  className="px-6 py-3 bg-[#EFC593] text-[#0F1B17] font-semibold rounded hover:opacity-90 transition"
                >
                  Buy Now
                </Link>
                <Link
                  href="#blog"
                  className="px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-[#0F1B17] transition"
                >
                  Explore
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
