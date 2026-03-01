import { Italic } from "lucide-react";
import React from "react";
import { FaUserShield,FaShieldAlt,FaHeadset, FaUserTie } from "react-icons/fa";


const About = () => {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/abou.jpg"   // place image in public/images
          alt="About TechSourceEdge"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />

        {/* Shining Effect */}
        <div className="absolute inset-0">
          <div className="shine-effect"></div>
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About TechSourceEdge
          </h1>
          <p className="text-gray-300 max-w-2x2 mx-auto font-bold">
            Driving innovation, enabling digital transformation, and delivering
            scalable technology solutions.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Who We Are */}
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-blue-500">
            Who We Are
          </h2>
          <p className="text-gray-300 leading-relaxed font-medium">
            TechSourcEdge is a next-generation startup built with a simple belief: {" "}
  <em className="italic text-gray-200"> great ideas deserve the right technology, creativity, and execution to succeed.</em><br/>

We are a multidisciplinary solutions company currently shaping our foundation and gearing up to reach among the leading ones.<br/> At TechSourcEdge, we combine technology, creativity, and strategy to help businesses, startups, and individuals build a strong digital presence, streamline operations, and grow with confidence.<br/>

Our approach is client-centric and result-driven. We don’t just deliver services—we partner with you to understand your goals, challenges, and vision, and then craft solutions that are practical, scalable, and impactful.
          </p>
        </div>

        {/* Why We Do */}
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-blue-500">
            What We Do
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 font-medium">
            We offer a wide range of services under one roof, ensuring seamless coordination and consistent quality:<br/>
            <li>Software Development – Custom web and application solutions designed for performance, security, and scalability</li>
            <li>E-Learning Platforms – Interactive, user-friendly learning websites and systems</li>
            <li>Graphic Designing – Branding, creatives, UI/UX, and visual storytelling</li>
            <li> Digital Marketing – SEO, social media, paid campaigns, and online growth strategies </li>
            <li> Content Writing – High-quality content that informs, engages, and converts </li>
            <li>Recruitment Solutions – Connecting the right talent with the right opportunities  </li>
            <li> E-Commerce Services – End-to-end online store setup and optimization </li>
            <li> Photography – Professional visuals that elevate brand identity </li>
            <li> Travel & Hospitality Solutions – Digital and creative support for travel brands </li>
            <li> Sports & Fitness Services – Integrated solutions promoting lifestyle and wellness brands </li>
            
          </ul>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-blue-500">
            Why Choose Us
          </h2>
          <p className="text-gray-300 leading-relaxed font-medium">
            <ul className="list-disc list-inside text-gray-300 space-y-2"> As a startup, we bring fresh thinking, agility, and dedication to every project. We are committed to building long-term relationships by delivering value, maintaining integrity, and consistently exceeding expectations. Here’s what sets us apart:<br/>
            <li> One-Stop Solution – Multiple services, one trusted partner </li>
            <li> Quality Over Quantity – Focused delivery with attention to detail </li>
            <li> Transparent Communication – Clear timelines, honest discussions, no surprises </li>
            <li> Future-Ready Mindset – We build solutions that grow with your business </li>
            <li> Client Satisfaction First – Your success defines ours </li>
          </ul></p>
        </div>
        {/* Icon Features Section */}
<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-10">
  
  {/* Authenticity */}
  <div className="flex items-start gap-4">
    <FaUserShield className="text-white text-4xl shrink-0" />
    <div>
      <h4 className="text-lg font-semibold text-white">
        Authenticity
      </h4>
      <p className="text-white text-sm">
        Transparent processes and honest communication at every stage.
      </p>
    </div>
  </div>

  {/* Data Privacy */}
  <div className="flex items-start gap-4">
    <FaShieldAlt className="text-white text-4xl shrink-0" />
    <div>
      <h4 className="text-lg font-semibold text-white">
        Data Privacy
      </h4>
      <p className="text-white text-sm">
        Your data is protected with enterprise-grade security standards.
      </p>
    </div>
  </div>

  {/* After Sales Support */}
  <div className="flex items-start gap-4">
    <FaHeadset className="text-white text-4xl shrink-0" />
    <div>
      <h4 className="text-lg font-semibold text-white">
        Excellent After-Sales Support
      </h4>
      <p className="text-white text-sm">
        Continuous assistance even after project delivery.
      </p>
    </div>
  </div>

  {/* Dedicated Account Manager */}
  <div className="flex items-start gap-4">
    <FaUserTie className="text-white text-4xl shrink-0" />
    <div>
      <h4 className="text-lg font-semibold text-white">
        Dedicated Account Manager
      </h4>
      <p className="text-white text-sm">
        A single point of contact for smooth coordination.
      </p>
    </div>
  </div>

</div>
<div>
    <p><br/>
          <b>TechSourcEdge is where technology meets creativity—and ideas turn into results. Join us on this exciting journey as we launch and grow together.
          </b></p>
    </div>

      </section>


      {/* Shine Effect Styles */}
      <style>
        {`
          .shine-effect {
            position: absolute;
            top: 0;
            left: -150%;
            width: 50%;
            height: 100%;
            background: linear-gradient(
              120deg,
              transparent,
              rgba(255, 255, 255, 0.35),
              transparent
            );
            animation: shine 5s infinite;
          }

          @keyframes shine {
            0% {
              left: -150%;
            }
            50% {
              left: 150%;
            }
            100% {
              left: 150%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default About;
