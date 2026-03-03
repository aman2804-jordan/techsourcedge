import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import API_URL from "../config/api";

export default function JobApplication() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fileInputRef = useRef(null);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ NEW

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+91',
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
  const [focusedField, setFocusedField] = useState('');

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

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: digitsOnly }));
      setErrors(prev => ({ ...prev, phone: '' }));
      return;
    }

    if (name === 'yearOfPassout') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, yearOfPassout: digitsOnly }));
      setErrors(prev => ({ ...prev, yearOfPassout: '' }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5000000) {
      setErrors(prev => ({ ...prev, resume: 'File size should be less than 5MB' }));
      return;
    }

    setFormData(prev => ({ ...prev, resume: file }));
    setErrors(prev => ({ ...prev, resume: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.education) newErrors.education = 'Education is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.yearOfPassout.trim()) newErrors.yearOfPassout = 'Year is required';
    if (!formData.experience) newErrors.experience = 'Experience required';
    if (!formData.currentCTC.trim()) newErrors.currentCTC = 'Current CTC required';
    if (!formData.expectedCTC.trim()) newErrors.expectedCTC = 'Expected CTC required';
    if (!formData.noticePeriod) newErrors.noticePeriod = 'Notice period required';
    if (!formData.resume) newErrors.resume = 'Resume required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true); // ✅ START LOADING

      const formPayload = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'phone') {
          formPayload.append('phone', `${formData.countryCode}${formData.phone}`);
        } else {
          formPayload.append(key, formData[key]);
        }
      });

      const response = await fetch(`${API_URL}/api/apply`, {
        method: 'POST',
        body: formPayload
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Submission failed");

      setSubmitSuccess(true);

      setFormData({
        fullName: '', email: '', countryCode: '+91', phone: '', education: '',
        role: '', yearOfPassout: '', experience: '', currentCTC: '',
        expectedCTC: '', location: '', noticePeriod: '', skills: '', resume: null
      });

      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false); // ✅ STOP LOADING
    }
  };

  const inputClass = (name) =>
    `border-2 p-2 rounded w-full outline-none transition-colors duration-200 ${
      focusedField === name
        ? 'border-blue-500'
        : errors[name]
        ? 'border-red-400'
        : 'border-gray-300'
    }`;

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const RequiredMark = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="min-h-screen bg-black">

      {/* CAROUSEL */}
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
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FORM */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Job Application Formm</h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">

            {/* Keep your existing fields exactly same here */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-3 rounded md:col-span-2 text-white font-semibold transition duration-300 ${
                isSubmitting
                  ? 'bg-blue-600 cursor-not-allowed'
                  : 'bg-black hover:bg-gray-800'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>

            {/* ✅ SUCCESS MESSAGE BELOW BUTTON */}
            {submitSuccess && (
              <div className="md:col-span-2 mt-3 text-center text-green-600 font-medium">
                ✅ Application Submitted Successfully!
              </div>
            )}

          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            Fields marked with <span className="text-red-500">*</span> are mandatory
          </p>
        </div>
      </div>

    </div>
  );
}