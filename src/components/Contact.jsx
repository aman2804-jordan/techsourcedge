import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import DOMPurify from 'dompurify';
import rateLimiter from '../utils/rateLimiter';
import SEO from "./SEO";




export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
  const { name, value } = e.target;
  // Sanitize input
  const sanitizedValue = DOMPurify.sanitize(value);
  
  setFormData(prev => ({
    ...prev,
    [name]: sanitizedValue
  }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Check rate limit
  const userKey = formData.email || 'anonymous';
  if (!rateLimiter.canAttempt(userKey)) {
    const remainingTime = rateLimiter.getRemainingTime(userKey);
    setErrorMessage(`Too many attempts. Please wait ${remainingTime} seconds.`);
    return;
  }

  const submittedEmails =
    JSON.parse(localStorage.getItem("submittedEmails")) || [];

  if (submittedEmails.includes(formData.email)) {
    setErrors({
      email: "This email has already submitted the form."
    });
    return;
  }

  emailjs
    .send(
      "service_54bxw7o",
      "template_lke4dp6",
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        "g-recaptcha-response": captchaToken // 🔐 REQUIRED
      },
      "TZglAh8t-j-bFodeA"
    )
    .then(() => {
      submittedEmails.push(formData.email);
      localStorage.setItem(
        "submittedEmails",
        JSON.stringify(submittedEmails)
      );

      setSubmitted(true);
      setCaptchaToken(null); // reset captcha

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

      setTimeout(() => setSubmitted(false), 5000);
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please try again.");
    });
};


return (
    <div className="min-h-screen bg-black text-white">
       
      <SEO 
        title="Contact Us - TECHSOURCEDGE"
        description="Get in touch with TECHSOURCEDGE for your IT consulting needs"
      />
      {/* Header Section with Image and Shining Effect */}
      <div className="relative h-[48vh] overflow-hidden bg-black" >
        {/* Background Image with Overlay */}
        <div 
          className="relative h-80"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Shining effect animation */}
          <div className="absolute inset-0 overflow-hidden ">
            <div className="shine-effect"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Get In Touch</h1>
              <p className="text-xl md:text-2xl animate-fade-in-delay">We'd love to hear from you. Let's start a conversation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for shining effect */}
      <style>{`
        .shine-effect {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 70%
          );
          animation: shine 3s infinite;
          transform: rotate(45deg);
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease-in 0.3s both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Contact Info Cards - Overlapping the image */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 mb-12 relative z-20">
        <div className="grid md:grid-cols-4 gap-6 ">
          {/* Email Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
  <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
    <Mail className="w-8 h-8 text-blue-600" />
  </div>

  <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>

  <a
    href="mailto:info@techsourcedge.com"
    className="block text-gray-600 text-sm hover:text-blue-600 transition"
  >
    info@techsourcedge.com
  </a>

  <a
    href="mailto:hr@techsourcedge.com"
    className="block text-gray-600 text-sm hover:text-blue-600 transition"
  >
    techsourcedge@gmail.com
  </a>
</div>
          {/* Phone Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
  <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
    <Phone className="w-8 h-8 text-green-600" />
  </div>

  <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>

  <a
    href="https://wa.me/919111039274"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 text-sm hover:text-green-600 transition font-medium"
  >
    +91 9111039274
  </a>
</div>

          {/* Location Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Visit Us</h3>
            <p className="text-gray-600 text-sm">Shivpuri Link Road</p>
            <p className="text-gray-600 text-sm">Gwalior, Madhya Pradesh</p>
          </div>

          {/* Hours Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <div className="inline-block p-4 bg-orange-100 rounded-full mb-4">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Business Hours</h3>
            <p className="text-gray-600 text-sm">Mon - Fri: 9AM - 6PM</p>
            <p className="text-gray-600 text-sm">Sat - Sun: Closed</p>
          </div>
        </div>
      </div>

      {/* Contact Form and Map Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <p className="font-semibold">Thank you for contacting us!</p>
                <p className="text-sm">We'll get back to you within 24 hours.</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="FullName" className="block text-gray-700 font-semibold mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  
                  placeholder="First & Last Name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>  



              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="abc@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone Field */}
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="(std) 123-4567"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Subject Field */}
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="How can we help you?"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 border rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us more about your project or inquiry..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              <div className="mb-6 flex justify-center">
               <ReCAPTCHA
  sitekey="6LcVb1ssAAAAAEnX0XDz069K3PegMx0WJqO9fRm6"
  onChange={(token) => setCaptchaToken(token)}
  onExpired={() => setCaptchaToken(null)}
/></div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>

          {/* Map and Additional Info */}
          <div>
            {/* Map */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.979576766513!2d78.1514983!3d26.1647946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c5002dc5300b%3A0xa50184eddf7996af!2sMahadji%20nagar%20shivpuri%20link%20road%20Gwalior!5e0!3m2!1sen!2sin!4v1775770954112!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>

            {/* Why Contact Us */}
            <div className="bg-white rounded-lg shadow-lg p-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose TECHSOURCEDGE?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">✓</span>
                  <span>Expert team members with 10+ years of experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">✓</span>
                  <span>24/7 customer support available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">✓</span>
                  <span>Quick response time - within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">✓</span>
                  <span>Tailored solutions for your business needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">✓</span>
                  <span>Proven track record of successful projects</span>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong className="text-blue-600">Quick Tip:</strong> Have a project in mind? 
                  Include your budget and timeline in the message to help us provide you with 
                  the most accurate information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className=" bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-gray-800 mb-2">How quickly will I get a response?</h4>
              <p className="text-gray-600 text-sm">We typically respond to all inquiries within 24 hours during business days.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-gray-800 mb-2">Do you offer free consultations?</h4>
              <p className="text-gray-600 text-sm">Yes! We provide free initial consultations to understand your needs and how we can help.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-gray-800 mb-2">What services do you provide?</h4>
              <p className="text-gray-600 text-sm">We offer web development, mobile apps, digital marketing, custom software, and IT consulting.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-gray-800 mb-2">Can you work with my existing team?</h4>
              <p className="text-gray-600 text-sm">Absolutely! We collaborate seamlessly with your in-house team or work independently.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}