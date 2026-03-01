import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Upload, Send } from 'lucide-react';
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

  const educationOptions = [
    'High School',
    "Bachelor's Degree",
    "Master's Degree",
    'Ph.D.',
    'Diploma',
    'Other'
  ];

  const experienceOptions = [
    'Fresher',
    '0-1 years',
    '1-3 years',
    '3-5 years',
    '5-7 years',
    '7-10 years',
    '10+ years'
  ];

  const noticePeriodOptions = [
    'Immediate',
    '15 days',
    '1 month',
    '2 months',
    '3 months',
    'More than 3 months'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
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

    setErrors((prev) => ({
      ...prev,
      resume: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';

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

    if (!formData.education) newErrors.education = 'Education is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.yearOfPassout.trim())
      newErrors.yearOfPassout = 'Year of passout is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.expectedCTC.trim())
      newErrors.expectedCTC = 'Expected CTC is required';
    if (!formData.location.trim())
      newErrors.location = 'Preferred location is required';
    if (!formData.noticePeriod)
      newErrors.noticePeriod = 'Notice period is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formPayload = new FormData();

      Object.keys(formData).forEach((key) => {
        formPayload.append(key, formData[key]);
      });

      const response = await fetch(`${API_URL}/apply`, {
  method: 'POST',
  body: formPayload
});



      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      await response.json();

      setSubmitted(true);
      setErrors({});

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
      console.error("Error submitting application:", error);
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

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full"
        >
          <ChevronRight className="text-white" size={24} />
        </button>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Job Application Form
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              Application Submitted Successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* You can keep your existing JSX form fields here unchanged */}
          </form>
        </div>
      </div>
    </div>
  );
}