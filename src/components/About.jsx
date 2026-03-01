import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';



const images = [
  { src: "/images/About/digital.JPG", alt: "Technology" },
  { src: "/images/About/graphic.JPG", alt: "Innovation" },
  { src: "/images/About/recruit.JPG", alt: "Recruitment" },
  { src: "/images/About/webdev.JPG", alt: "Web Development" },
];



export default function About() {
  return (
    <section className="w-full py-20 pt-8 pb-2 px-4 bg-black" id="aboutus">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white" >About TECHSOURCEDGE</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Who We Are</h3>
            <p className="text-gray-700 mb-4">
              TECHSOURCEDGE is a next-generation startup built with a simple belief: great ideas deserve the right technology, creativity, and execution to succeed.
            </p>
            <p className="text-gray-700">
              We are a multidisciplinary solutions company currently shaping our foundation and gearing up for launch in February. At TechSourcEdge, we combine technology, creativity, and strategy to help businesses, startups, and individuals build a strong digital presence, streamline operations, and grow with confidence.
            </p>
             <p className="text-gray-700 mb-4">
              Our approach is client-centric and result-driven. We don’t just deliver services—we partner with you to understand your goals, challenges, and vision, and then craft solutions that are practical, scalable, and impactful.
            </p>
            <p className="text-gray-700">
              From initial consultation to implementation and ongoing support, we partner with you every step of the way, ensuring seamless integration and measurable results that drive your business forward.
            </p>
            <Link
    to="/abou"
    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
  >
    Read More
    <ArrowRight size={18} />
  </Link>
          </div>

             <div className="grid grid-cols-2 gap-6">
            {images.map((image, index) => (
              <motion.img
                key={index}
                src={image.src}
                alt={image.alt}
                className="rounded-xl shadow-lg object-cover h-48 w-full"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}