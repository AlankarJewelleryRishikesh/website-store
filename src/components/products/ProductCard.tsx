"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  weight: string;
  // price: number;
  description?: string;
  category?: string;
  originalPrice?: number;
}

const ProductCard = ({
  id,
  title,
  image,
  weight,
  // price,
  description,
  category = "Product",
  originalPrice,
}: ProductCardProps) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const isWishlisted = wishlist.includes(id);

  const toggleWishlist = () => {
    setWishlist((prev) =>
      isWishlisted ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      className="w-[250px] bg-[#FCF5F3] shadow-md border border-[#D2AB67] rounded-xl overflow-hidden relative hover:shadow-xl transition-all duration-300 h-[400px] flex flex-col"
      whileHover={{ scale: 1.02 }}
    >
      {/* Wishlist Button */}
      {/* <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:scale-110 transition"
      >
        {isWishlisted ? (
          <HiHeart className="text-red-500" size={20} />
        ) : (
          <HiOutlineHeart className="text-gray-600" size={20} />
        )}
      </button> */}

      {/* Category Title */}
      <div className="text-xs uppercase text-gray-500 px-4 pt-4 tracking-wider">
        Categories
      </div>
      <div className="text-sm font-medium text-[#1D3934] px-4">{category}</div>

      {/* Image */}
      <div className="flex items-center justify-center h-44 bg-[#FCF5F3] px-4 mt-2">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Info Section */}
      <div className="px-4 py-3 flex flex-col flex-grow justify-between">
        <div className="text-center space-y-1">
          <h3 className="text-md font-bold text-[#1D3934]">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
          {/* {weight && <p className="text-sm text-gray-600">{weight}</p>} */}
          {/* <div className="text-lg font-semibold text-[#1D3934]">
            ₹{price.toLocaleString()}
          </div> */}
        </div>

        {/* Add to Cart Button */}
       {/* Order Now via WhatsApp */}
<div className="mt-2">
  <a
    href={`https://wa.me/919760901234?text=I'm interested in ${encodeURIComponent(title)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full bg-[#580F09] hover:bg-[#A64B44] text-white py-2 rounded-md font-semibold transition duration-300 flex items-center justify-center text-sm"
  >
    <FaShoppingCart className="mr-2" />
    Order Now
  </a>
</div>

      </div>
    </motion.div>
  );
};

export default ProductCard;
