import React from "react";
import { BookOpen, Users, Layers, Heart, HeartPulse, Code2, Camera, Images, ShoppingCart, SquarePen, Activity, SquarePenIcon, PlaneIcon } from "lucide-react";



const industries = [
  {
    title: "Software Development",
    description:
      "Build reliable and scalable digital solutions with our software development services. We design and develop custom applications tailored to your business needs, ensuring performance, security, and long-term growth.",
    image: "/images/Industries/devlopement.jpeg",
    icon:   Code2,
  },
  {
    title: "eLearning",
    description:
      "Transform education delivery with our eLearning platforms. We create interactive and accessible learning experiences for institutions and enterprises.",
    image: "/images/Industries/elearning.jpeg",
    icon: BookOpen,
  },
  {
    title: "Manpower & Lead Generation",
    description:
      "Strengthen your workforce and sales pipeline with our manpower and lead generation solutions. We connect businesses with the right talent and high-quality leads to drive productivity and revenue.",
    image: "/images/Industries/lead.jpeg",
    icon: Users,
  },
  {
    title: "Media & Digital Marketing",
    description:
      "Accelerate your brand’s digital growth with data-driven media and marketing strategies. We create targeted campaigns that increase visibility, engagement, and conversions across digital platforms.",
    image: "/images/Industries/digital.jpeg",
    icon: Camera,
  },
  {
    title: "Photography & Graphics Designing",
    description:
      "Enhance your brand identity through compelling visuals and creative design. We deliver professional photography and impactful graphics that communicate your story and leave a lasting impression.",
    image: "/images/Industries/graphic.jpeg",
    icon: Images,
  },
  {
    title: "Retail & E-commerce",
    description:
      "Expand your online business with our retail and e-commerce solutions. We build and optimize digital storefronts that deliver seamless user experiences and drive consistent sales.",
    image: "/images/Industries/ecommerce.jpeg",
    icon: ShoppingCart,
  },
  {
    title: "Travel & Hospitality",
    description:
      "Elevate guest experiences with our travel and hospitality solutions. We support brands with digital, creative, and operational tools that enhance engagement and build customer loyalty.",
    image: "/images/Industries/travel.jpeg",
    icon: PlaneIcon,
  },
  {
    title: "Information & Content Publishing",
    description:
      "Communicate with clarity and impact through our information and content publishing services. We create, manage, and distribute high-quality content that educates, engages, and builds credibility.",
    image: "/images/Industries/content.jpeg",
    icon: SquarePenIcon,
  },
  {
    title: "Sports & Fitness",
    description:
      "Empower active lifestyles with our sports and fitness solutions. We support brands and professionals with digital platforms, content, and marketing strategies that inspire performance and growth.",
    image: "/images/Industries/fitness.jpeg",
    icon: Activity,
  },
];

export default function Industries() {
  return (
    <section className="pt-4 pb-10 px-4 bg-black" id="industries">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Industries We Serve
        </h2>
        <p className="text-center text-white max-w-3xl mx-auto mb-16 text-lg">
          Delivering tailored technology solutions across diverse sectors to
          drive innovation and efficiency
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industries.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Icon Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white p-3 rounded-full shadow-md">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
              
            );
          })}
        </div>
      </div>
    </section>
  );
}