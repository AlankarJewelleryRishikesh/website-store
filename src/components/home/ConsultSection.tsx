"use client";

import Image from "next/image";
import Link from "next/link";

const ConsultSection = () => {
  return (
    <section id="shop" className="w-full bg-[#FCF5F3] py-8 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Text and Buttons */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-800 mb-4">
            Need Guidance? Talk to Our Jewellery Experts Today.
          </h2>
          <p className="text-base text-gray-700 mb-8">
            A thoughtful way to experience fine jewellery designed around your story
          </p>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
            {/* Call Us */}
            <a href="tel:+919450220581" className="w-full sm:w-52">
              <button className="shadow-md border border-[#D2AB67] rounded-xl w-full bg-[#580F09] text-white py-3 font-semibold uppercase tracking-wide hover:bg-gray-800 transition duration-300">
                Call Us
              </button>
            </a>

            {/* Visit Us */}
            <Link href="/contact" className="w-full sm:w-52">
              <button className="w-full bg-[#580F09] text-white py-3 font-semibold uppercase tracking-wide border border-[#AEBECC] hover:bg-[#2A2A2A] transition duration-300 shadow-md border border-[#D2AB67] rounded-xl">
                Visit Us
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        {/* Right: Image */}
<div className="flex justify-center md:justify-end h-full ">
  <div className="h-full flex items-center">
    <Image
      src="/assets/covers/necklace-stand.png"
      alt="Alankar Jewellers"
      width={300}
      height={350}
      className="h-full w-auto object-contain"
    />
        <Image
      src="/assets/hero.png"
      alt="Alankar Jewellers"
      width={300}
      height={350}
      className="h-full w-auto object-contain"
    />
  </div>
</div>

      </div>
    </section>
  );
};

export default ConsultSection;
