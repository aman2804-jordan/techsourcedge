import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";




export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [technologiesOpen, setTechnologiesOpen] = useState(false);
  const location = useLocation();

  const services = [
    { name: "Custom Development", href: "#services" },
    { name: "Graphics Designing", href: "#services" },
    { name: "IT & ITEs Staffing", href: "#services" },
    { name: "Mobile Application", href: "#services" },
    { name: "Content Writing", href: "#services" },
    { name: "Digital Marketing", href: "#services" },
    { name: "Web Development", href: "#services" },
    { name: "Creative Services", href: "#services" },
  ];

  const technologies = [
    { name: "React & Angular", href: "#technologies" },
    { name: "Node.js & Express", href: "#technologies" },
    { name: "Java & Spring Boot", href: "#technologies" },
    { name: "AWS & Azure", href: "#technologies" },
    { name: "Photoshop & Illustrator", href: "#technologies" },
    { name: "Hootsuite & Google Analytics", href: "#technologies" },
    { name: "Grammarly & Hemingway", href: "#technologies" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
  setMobileMenuOpen(false);
  setServicesOpen(false);
  setTechnologiesOpen(false);
}, [location]);

  const navItemClass =
    "flex items-center justify-between text-white text-base font-medium py-2";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          {/* Logo - Make it clickable to go home */}
                    <Link to="/" className="flex items-baseline cursor-pointer">
          <div className="flex items-baseline">
            <span className={`text-2xl font-bold transition-all duration-300 ${
              scrolled 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' 
                : 'text-white drop-shadow-lg'
            }`}>TECHSOURCEDGE</span>
            <span className="ml-1 font-bold text-white">IT Solutions</span>
          </div>
          </Link>
          {/* Desktop Menu */} 
          <div className="hidden md:flex items-center space-x-8">
            
                    <Link to="/" className="text-white hover:text-blue-300">
  Home
</Link>
            {/* Services */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-white hover:text-blue-300">
                Services
                <span
                  className={`transition-transform ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50">
                  {services.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Technologies */}
            <div
              className="relative"
              onMouseEnter={() => setTechnologiesOpen(true)}
              onMouseLeave={() => setTechnologiesOpen(false)}
            >
              <button className="flex items-center gap-1 text-white hover:text-blue-300">
                Technologies
                <span
                  className={`transition-transform ${
                    technologiesOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {technologiesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50">
                  {technologies.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

           <Link to="/portfolio" className="text-white hover:text-blue-300">
  Portfolio
</Link>
             <Link to="/career" className="text-white hover:text-blue-300">
              Career
            </Link>
            <Link to="/contact" className="text-white hover:text-blue-300">
              Contact
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 text-white rounded-lg mt-2 p-4 space-y-2">
            
<Link to="/" className=" block text-white py-1 font-semibold hover:text-blue-300">
  Home
</Link>

            {/* Mobile Services */}
            <button
              className={navItemClass}
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services
            </button>
            {servicesOpen &&
              services.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="block pl-4 py-1 text-sm text-gray-300"
                >
                  {item.name}
                </a>
              ))}

            {/* Mobile Technologies */}
            <button
              className={navItemClass}
              onClick={() => setTechnologiesOpen(!technologiesOpen)}
            >
              Technologies
            </button>
            {technologiesOpen &&
              technologies.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="block pl-4 py-1 text-sm text-gray-300"
                >
                  {item.name}
                </a>
              ))}

            <Link to="/portfolio" className=" block text-white py-1 font-semibold hover:text-blue-300">
  Portfolio
</Link>
             <Link to="/career" className=" block text-white py-1 font-semibold hover:text-blue-300">
              Career
            </Link>
            <Link to="/contact" className=" block text-white font-semibold py-1 hover:text-blue-300">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}