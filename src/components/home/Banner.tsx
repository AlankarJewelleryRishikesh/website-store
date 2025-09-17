"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const bannerLines = [
  " “गढ़वाल की शान – अब हर घर में।”",
  " “आज ही विज़िट करें – परंपरा और ट्रेंड का संगम।”",
  " “Alankar Jewellers – हर रिश्ते का अलंकार।”",
];

const Banner = () => {
  return (
    <section className="w-full py-12 px-4 sm:px-10 bg-[#F8DBB9] overflow-hidden mt-0">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Left Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-3xl font-playfair font-semibold text-[#0F1B17] mb-6 leading-snug">
          अलंकार ज्वेलर्स – हर रिश्ते को अलंकार।<br className="hidden sm:block" />
            -हमारे परिवार से आपके परिवार तक
          </h2>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.3 } },
              hidden: {},
            }}
            className="mb-6 max-w-md mx-auto lg:mx-0"
          >
          {bannerLines.map((line, idx) => (
  <motion.div
    key={idx}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    className="flex items-start leading-snug lhe-6 mb-2 text-[#475356] text-base sm:text-lg"
  >
    <FaCheckCircle className="text-[#580F09] mt-1 mr-3 flex-shrink-0 text-xl" />
    <span>{line}</span>
  </motion.div>
))}

          </motion.div>

          <Link
            href="/products"
            className="inline-block bg-[#580F09] text-white px-6 py-3 rounded hover:opacity-90 transition"
          >
            Check More Products
          </Link>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 flex justify-center lg:justify-center  relative w-full max-w-sm sm:max-w-md mx-auto"
        // style={{
        //         backgroundImage: `url('/assets/desginbg.png')`,
        //       }}
        >
          <div className="border-4 bg-[#580F09] border-[#d6c29f] p-2 relative inline-block"
          >
            <Image
              src="/assets/banner.webp"
              alt="Jewellery Model"
              width={620}
              height={660}
              className="object-contain w-full h-auto rounded"
            />
            {/* <div className="absolute top-0 right-[-105px] hidden lg:block">
              <Image
                src="/assets/frameSide.png"
                alt="Floral Design"
                width={120}
                height={150}
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
