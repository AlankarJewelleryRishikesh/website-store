'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Review = {
  id: number;
  reviewer_name: string;
  reviewer_picture_url: string;
  rating: number;
  text: string;
};

type ApiResponse = {
  status: string;
  result: {
    data: Review[];
  };
};

const AUTO_SCROLL_INTERVAL = 10000;

const CustomerReview = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2); // 2 for desktop

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          'https://service-reviews-ultimate.elfsight.com/data/reviews?uris%5B%5D=ChIJTcusshwWCTkR3H4M7RpRF9Y&filter_content=text_required&min_rating=5&page_length=100&order=date'
        );
        const data: ApiResponse = await res.json();
        setReviews(data.result.data.slice(0, 3)); // Only keep 3 reviews
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  // Detect screen size to adjust visible reviews
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 640 ? 1 : 2); // 1 for mobile, 2 for sm+
    };

    handleResize(); // run on load
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto scroll
  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + visibleCount) % reviews.length);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [reviews, visibleCount]);

  const handlePrev = () =>
    setCurrent((prev) => (prev - visibleCount + reviews.length) % reviews.length);
  const handleNext = () =>
    setCurrent((prev) => (prev + visibleCount) % reviews.length);

  if (reviews.length === 0) return null;

  const visibleReviews = [
    ...reviews,
    ...reviews, // duplicate for seamless scrolling
  ].slice(current, current + visibleCount);

  return (
    <section
  className="relative pt-10 sm:pt-24 pb-16 px-4 sm:px-10 text-white text-center overflow-visible"
  style={{
    backgroundColor: '#FAF3EB',
  }}
>

      {/* Section Title */}
     <div className="flex items-center justify-center mb-10">
  <div className="flex items-center w-full max-w-3xl px-4 ">
    {/* Left Line */}
    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

    {/* Center Label */}
    <div className="px-4 py-1 mx-4 bg-[#FAF3EB] border border-[#A0523D] text-[#B88A44] font-semibold rounded-md text-lg ">
      Happy Customers
    </div>

    {/* Right Line */}
    <div className="flex-grow h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent" />
  </div>
</div>

      {/* Review Container */}
      <div className="max-w-6xl mx-auto relative mt-12">
        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-yellow-600 text-3xl hover:text-yellow-800 transition hidden sm:block z-20"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-yellow-600 text-3xl hover:text-yellow-800 transition hidden sm:block z-20"
        >
          &#8250;
        </button>

        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="relative bg-[#59100A]/90 rounded-lg pt-16 pb-6 px-6 sm:px-8 flex-1 transition-all duration-500 ease-in-out max-w-md w-full"
            >
              {/* Reviewer Image */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20">
                <Image
                  src={review.reviewer_picture_url}
                  alt={review.reviewer_name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#F6DAB5] shadow-md"
                />
              </div>

              <p className="text-[#FFF8F0] text-base sm:text-sm leading-relaxed mb-3 italic mt-2">
                “{review.text}”
              </p>

              <p className="text-[#FFE6C8] font-semibold text-lg mb-1">
                {review.reviewer_name}
              </p>

              <div className="text-[#D4AF37] text-lg">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
