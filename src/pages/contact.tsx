import { motion } from "framer-motion";
// import { Phone, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="w-full relative">
      {/* Parallax Hero */}
      <div
        className="relative h-[40vh] md:h-[60vh] bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{
         backgroundColor:"#58130B",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl text-[#EDDFC6] sm:text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            Contact Us
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-200">
            We’d love to hear from you
          </p>
        </div>
      </div>

      {/* Address + Map */}
      <section className="py-12 px-4 sm:px-8 md:px-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
            Our Store
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            Alankar jewellers Rishikesh 
Shop no 4 near city center Haridwar Road Rishikesh Uttrakhand 249201
          </p>
          <p className="text-base sm:text-lg text-gray-700"> +91 9761901234</p>
          <p className="text-base sm:text-lg text-gray-700">
            ✉️ alankarjewellersrishikesh@gmail.com
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.563455449777!2d78.29849519999999!3d30.106686399999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909161cb2accb4d%3A0xd617511aed0c7edc!2sAlankar%20Jewellers%20Best%20jewellers%20in%20Uttrakhand!5e0!3m2!1sen!2sin!4v1757560993904!5m2!1sen!2sin"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px]"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Gallery */}
      {/* <section className="py-12 px-4 sm:px-8 md:px-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Photo Gallery
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["1.jpg", "2.jpg", "3.jpg", "4.jpg"].map((img, i) => (
            <motion.img
              key={i}
              src={`/images/gallery/${img}`}
              alt={`Gallery ${i + 1}`}
              className="w-full h-36 sm:h-44 md:h-56 object-cover rounded-2xl shadow-md"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      </section> */}

      {/* 360° View */}
      <section className="py-12 px-4 sm:px-8 md:px-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Explore Our Store in 360°
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-xl aspect-video">
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1757561293243!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJREc4X3E1UlE.!2m2!1d30.10681503719204!2d78.29848913693046!3f160!4f0!5f0.7820865974627469"
            className="w-full h-[250px] sm:h-[400px] md:h-[700px]"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Floating Contact Buttons */}
      
    </div>
  );
}
