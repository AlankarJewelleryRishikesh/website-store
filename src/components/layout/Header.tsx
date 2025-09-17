"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX, HiSearch, HiUser, HiShoppingCart } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  return (
    <header className="bg-[#580F09] text-[#F5F5F5] fixed top-0 w-full z-50">
      {/* Inner container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with image + text */}
          <Link href="/" className="flex items-center space-x-3 leading-tight">
            <Image
              src="/alankarlogo.png" // Replace with your logo path
              alt="Alankar Logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <div className="flex flex-col items-start">
              <span className="text-2xl font-serif font-bold text-[#F0C694] tracking-wide">
                Alankar
              </span>
              <span className="text-sm font-light text-[#F0C694] tracking-widest pl-6">
                Jewellers
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-yellow-400">
              Home
            </Link>
            <Link href="/about" className="hover:text-yellow-400">
              About
            </Link>
            {/* <Link href="/collection" className="hover:text-yellow-400">
              Collection
            </Link> */}
            <Link href="#shop" className="hover:text-yellow-400">
              Shop
            </Link>
            <Link href="#blog" className="hover:text-yellow-400">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-yellow-400">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* <HiSearch
              size={24}
              className="hover:text-yellow-400 cursor-pointer"
            /> */}
            {/* <Heart
              size={24}
              className="hover:text-yellow-400 cursor-pointer"
            />
            <HiShoppingCart
              size={24}
              className="hover:text-yellow-400 cursor-pointer"
            /> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Full width bottom line */}
      <div className="h-[2px] bg-[#F8DBB9] w-full" />

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.nav
              key="mobileMenu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-[#580F09] text-[#F0C694] shadow-lg z-50 flex flex-col p-8 pt-20 space-y-6"
            >
              <Link
                href="/"
                onClick={toggleMenu}
                className="hover:text-yellow-400 text-lg font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={toggleMenu}
                className="hover:text-yellow-400 text-lg font-medium"
              >
                About
              </Link>
             
              <Link
                href="#shop"
                onClick={toggleMenu}
                className="hover:text-yellow-400 text-lg font-medium"
              >
                Shop
              </Link>
              <Link
                href="#blog"
                onClick={toggleMenu}
                className="hover:text-yellow-400 text-lg font-medium"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                onClick={toggleMenu}
                className="hover:text-yellow-400 text-lg font-medium"
              >
                Contact
              </Link>
            </motion.nav>

            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={toggleMenu}
              aria-hidden="true"
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
