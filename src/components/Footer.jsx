import React from 'react';
import footerLogo from "./public/footer-logo.png";
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaInstagram, FaEnvelope, FaMapPin } from "react-icons/fa";



export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 px-4" id="contact">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center">
          <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            TECHSOURCEDGE
          </h4>
             
            <img
        src={footerLogo}
        alt="TechSourceEdge Logo"
        className="h-24 w-auto opacity-90 "
      />
      
          
        </div>

        <div>
          <h5 className="font-semibold mb-4">Services</h5>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#services" className="hover:text-blue-400 transition">Web Development</a></li>
            <li><a href="#services" className="hover:text-blue-400 transition">Software Development</a></li>
            <li><a href="#services" className="hover:text-blue-400 transition">Graphic Designing</a></li>
            <li><a href="#services" className="hover:text-blue-400 transition">Digital Marketing</a></li>
            <li><a href="#about" className="hover:text-blue-400 transition"></a>Staffing</li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-4">Company</h5>
          <ul className="space-y-2 text-gray-400">
            <li><Link
    to="/abou"
    className="flex items-center gap-2 hover:text-blue-400 transition font-semibold"
  >About Us</Link></li>
            <li><Link
    to="/career"
    className="flex items-center gap-2 hover:text-blue-400 transition font-semibold"
  >Careers</Link></li>
            <li><Link
    to="/portfolio"
    className="flex items-center gap-2 hover:text-blue-400 transition font-semibold"
  >Case Studies</Link></li>
            <li><Link
    to="/contact"
    className="flex items-center gap-2 hover:text-blue-400 transition font-semibold"
  >Contact</Link></li>
            <li><a href="#about" className="hover:text-blue-400 transition"></a></li>
          </ul>
        </div>

        <div>
  <h5 className="font-semibold mb-4">Contact</h5>
<ul className="space-y-2 text-gray-400">

  <li className="flex items-center gap-2">
    <FaEnvelope className="text-gray-400 hover:text-yellow-500 transition text-xl" />
    <a 
      href="mailto:info@techsourcedge.com"
      className="hover:text-yellow-500 transition"
    >
      info@techsourcedge.com
    </a>
  </li>

  <li className="flex items-center gap-2">
    <FaEnvelope className="text-gray-400 hover:text-yellow-500 transition text-xl" />
    <a 
      href="mailto:hr@techsourcedge.com"
      className="hover:text-yellow-500 transition"
    >
      hr@techsourcedge.com
    </a>
  </li>

  <li className="flex items-center gap-2">
  <FaMapPin className="text-gray-400 hover:text-red-500 transition text-xl" />
  <a 
    href="https://www.google.com/maps/search/?api=1&query=IT+Park+Gwalior+Madhya+Pradesh"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-500 transition"
  >
    IT Park
  </a>
</li>
    <li>Gwalior, Madhya Pradesh</li>

    {/* Social Media Icons */}
    <li className="pt-3 flex gap-4">
      <a
        href="https://www.linkedin.com/company/techsourcedge"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-blue-500 transition text-xl"
      >
        <FaLinkedinIn />
      </a>

      <a
        href="https://www.instagram.com/techsourcedge"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-pink-500 transition text-xl"
      >
        <FaInstagram />
      </a>
    </li>
  </ul>
</div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
  © 2025 TECHSOURCEDGE. All rights reserved.
</p>
        <div className="flex space-x-6 text-gray-400 text-sm">
          <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
          <a href="#" className="hover:text-blue-400 transition">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}