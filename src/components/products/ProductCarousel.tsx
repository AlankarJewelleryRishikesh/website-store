"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/skelton/ProductCardSkeleton"; // Assuming you have this

// Autoplay plugin (unchanged)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Autoplay(slider: any, interval = 3000) {
  let timeout: NodeJS.Timeout;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }
  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, interval);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

interface Product {
  id: string;
  title: string;
  image: string;
  weight: string ;
  description: string;
  category: string;
}

const ProductCarousel = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: "snap",
      slides: {
        perView: 5,
        spacing: 16,
      },
      breakpoints: {
        "(max-width: 1280px)": {
          slides: { perView: 3, spacing: 12 },
        },
        "(max-width: 768px)": {
          slides: {
            perView: 1,
            spacing: 16,
            origin: "center",
          },
        },
      },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
    },
    [Autoplay]
  );

  useEffect(() => {
    async function fetchTopProducts() {
      try {
        const res = await fetch("/api/products/top10");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        // Transform data if needed to match your Product interface keys
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formatted = data.map((p: any) => ({
          id: p.id,
          title: p.name,
          image: p.imageUrl,
          weight: p.weight || "", // Optional fallback
          description: p.description,
          category: p.category?.name || "", // Assuming relation
        }));

        setProducts(formatted);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTopProducts();
  }, []);

  if (loading) {
    return (
      <section id="collection"className="py-12 bg-white relative">
        <div className="text-center mb-8 px-4">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[black]]">
            Uttarakhand’s Favorites – Loved by You
          </h2>
          <p className="text-gray-500 mt-2 text-base md:text-lg max-w-xl mx-auto">
            Crafted in the Heart of Uttarakhand — Adorn Yourself with Timeless Grace & Tradition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {[...Array(6)].map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-12 bg-white relative text-center">
        <p className="text-gray-500">No products found.</p>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white relative">
      <div className="text-center mb-8 px-4">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[black]]">
          Uttarakhand’s Favorites – Loved by You
        </h2>
        <p className="text-gray-500 mt-2 text-base md:text-lg max-w-xl mx-auto">
          Crafted in the Heart of Uttarakhand — Adorn Yourself with Timeless Grace & Tradition
        </p>
      </div>

      <div ref={sliderRef} className="keen-slider px-4">
        {products.map((product) => (
          <div key={product.id} className="keen-slider__slide flex justify-center">
            <ProductCard {...product} />
          </div>
        ))}
      </div>

      {slider && (
        <>
          <button
            onClick={() => slider.current?.prev()}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => slider.current?.next()}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </>
      )}

      {slider && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(slider.current?.track.details.slides.length).keys()].map((idx) => (
            <button
              key={idx}
              onClick={() => slider.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition ${
                currentSlide === idx ? "bg-[#1D3934]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductCarousel;
