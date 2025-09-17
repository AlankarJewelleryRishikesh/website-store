"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description: string | null;
}

const CategoriesPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleClick = (category: Category) => {
    sessionStorage.setItem("selectedCategory", JSON.stringify(category));
    router.push("/categories/products");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-16 bg-[#FAF3EB]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">
         Explore Our Signature Collections
        </h2>
        <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
          From timeless gold, silver, and diamond pieces to traditional
          favorites, explore jewelry crafted to celebrate every moment in style.
        </p>

        <Slider {...settings}>
          {categories?.map((cat) => (
            <div key={cat.id} className="px-4">
              <div className="bg-[#FCF5F3] shadow-md border border-[#D2AB67] rounded-lg shadow-lg p-6 text-center h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-medium mb-4 text-gray-800 text-left">
                    {cat.name}
                  </h3>
                  <div className="w-full h-40 relative mb-4">
                    <Image
                      src={cat.imageUrl}
                      alt={cat.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleClick(cat)}
                  className="mt-auto bg-[#580F09] text-white text-sm px-4 py-2 rounded-md hover:bg-[#580f0f] transition-colors duration-300 w-[70%] text-left"
                >
                  Check More Products →
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CategoriesPage;
