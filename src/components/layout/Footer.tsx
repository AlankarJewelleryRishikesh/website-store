/* eslint-disable @next/next/no-html-link-for-pages */
// components/Footer.tsx

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer
      className="bg-gray-900 text-gray-200 pt-16 pb-10 px-6 sm:px-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundColor: "#580F09" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company */}
        <div>
          <h3 className="text-2xl font-bold text-[#FFE6C8] mb-4">
            Alankar Jewellers
          </h3>
          <p className="text-sm text-[#FFE6C8]">
            Jewellery that celebrates tradition and tells your story.
          </p>
          {/* Socials */}
          <div className="flex space-x-4 mt-5">
            <a
              href="https://www.facebook.com/alankarjewellersrishikesh/"
              className="hover:text-[#FFE6C8]"
            >
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-[#FFE6C8]">
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/alankarjewellersrishikesh/"
              className="hover:text-[#FFE6C8]"
            >
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#FFE6C8]">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#FFE6C8]">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-[#FFE6C8]">
                Home
              </a>
            </li>
            <li>
              <a href="/categories" className="hover:text-[#FFE6C8]">
                Categories
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#FFE6C8]">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#FFE6C8]">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#FFE6C8]">Contact</h4>
          <ul className="space-y-2 text-sm text-[#FFE6C8]">
            <li>
              Alankar jewellers Rishikesh Shop no 4 near city center Haridwar
              Road Rishikesh Uttrakhand 249201
            </li>
            <li>+91 9760901234, +91 9761901234</li>
            <li>alankarjewellersrishikesh@gmail.com</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#FFE6C8]">
            Newsletter
          </h4>
          <p className="text-sm text-[#FFE6C8] mb-4">
            Subscribe to get special offers and updates.
          </p>
          <form className="flex items-center border border-gray-700 rounded overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 text-sm bg-gray-800 text-[#FFE6C8] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#CDC087] text-[#FFE6C8] px-4 py-2 hover:bg-[#FFE6C8] text-sm flex items-center gap-1"
            >
              <FiMail size={16} />
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-[#FFE6C8]">
        &copy; {new Date().getFullYear()} Alankar Jewellers. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
