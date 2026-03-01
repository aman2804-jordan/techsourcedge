import React from "react";

// Import images properly (Vite-safe)
import software from "../assets/software.jpeg";
import dev from "../assets/dev.jpeg";
import udemy from "../assets/udemy.jpeg";
import manpower from "../assets/manpower.jpeg";
import digital from "../assets/digital.jpeg";
import graphic from "../assets/graphic.jpeg";
import ecommerce from "../assets/ecommerce.jpeg";
import travel from "../assets/travel.jpeg";
import content from "../assets/content.jpeg";
import fitness from "../assets/fitness.jpeg";

const brands = [
  { name: "TCS", logo: software },
  { name: "Infosys", logo: dev },
  { name: "Udemy", logo: udemy },
  { name: "Randstad", logo: manpower },
  { name: "WatConsult", logo: digital },
  { name: "Photoshop", logo: graphic },
  { name: "Amazon", logo: ecommerce },
  { name: "MakeMyTrip", logo: travel },
  { name: "The Hindu", logo: content },
  { name: "Adidas", logo: fitness },
];

export default function TrustedBrands() {
  return (
    <section className="pt-4 pb-10 px-4 bg-black">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl text-center font-bold text-white mb-3">
          Our Trusted Brands
        </h2>
        <p className="text-lg text-center text-white mb-12">
          Industry leaders worldwide
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl h-32 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-20 object-contain transition duration-300 hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
