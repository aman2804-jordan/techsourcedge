import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import API_URL from "../config/api";

export default function JobApplication() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    role: '',
    yearOfPassout: '',
    experience: '',
    currentCTC: '',
    expectedCTC: '',
    location: '',
    noticePeriod: '',
    skills: '',
    resume: null
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const slides = [
    {
      title: "Launch Your Career with Us",
      description: "Apply now and join our innovative team",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop"
    },
    {
      title: "Be Part of Something Amazing",
      description: "Your next career opportunity awaits",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop"
    },
    {
      title: "Grow with Industry Leaders",
      description: "Transform your career with TECHSOURCEDGE",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5000000) {
      setErrors((prev) => ({
        ...prev,
        resume: 'File size should be less than 5MB'
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      resume: file
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formPayload = new FormData();

      Object.keys(formData).forEach((key) => {
        formPayload.append(key, formData[key]);
      });

      const response = await fetch(`${API_URL}/api/apply`, {
        method: 'POST',
        body: formPayload
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed");
      }

      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        education: '',
        role: '',
        yearOfPassout: '',
        experience: '',
        currentCTC: '',
        expectedCTC: '',
        location: '',
        noticePeriod: '',
        skills: '',
        resume: null
      });

    } catch (error) {
      console.error("Submission Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Carousel */}
      <div className="relative h-[90vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="flex items-center justify-center h-full text-white text-center px-4">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Form */}
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-6">Job Application</h2>

        {submitted && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
            Application Submitted Successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <input
            type="file"
            onChange={handleFileChange}
            className="w-full"
          />
          {errors.resume && <p className="text-red-500">{errors.resume}</p>}

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}