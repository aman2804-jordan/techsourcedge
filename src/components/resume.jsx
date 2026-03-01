import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Upload, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';




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
    'Bachelor\'s Degree',
    'Master\'s Degree',
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

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          resume: 'File size should be less than 5MB'
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      if (errors.resume) {
        setErrors(prev => ({
          ...prev,
          resume: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
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

    if (!formData.education) {
      newErrors.education = 'Education is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!formData.yearOfPassout.trim()) {
      newErrors.yearOfPassout = 'Year of passout is required';
    }

    if (!formData.experience) {
      newErrors.experience = 'Experience is required';
    }

    if (!formData.expectedCTC.trim()) {
      newErrors.expectedCTC = 'Expected CTC is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Preferred location is required';
    }

    if (!formData.noticePeriod) {
      newErrors.noticePeriod = 'Notice period is required';
    }

    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Application submitted:', formData);
    
    // Show success message
    setSubmitted(true);
    
    // Reset form
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

    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Carousel */}
      <div className="relative h-96 overflow-hidden mt-20">
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
        
        <button 
          onClick={prevSlide} 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition"
          aria-label="Next slide"
        >
          <ChevronRight className="text-white" size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Application Form */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Job Application Form</h2>
          <p className="text-gray-600 text-center mb-8">Fill out the form below to apply for a position with us</p>
          
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <p className="font-semibold">Application Submitted Successfully!</p>
              <p className="text-sm">We'll review your application and get back to you soon.</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">Personal Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">
                    Preferred Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="New York, NY"
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>
              </div>
            </div>

            {/* Educational & Professional Details */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">Educational & Professional Details</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Education */}
                <div>
                  <label htmlFor="education" className="block text-gray-700 font-semibold mb-2">
                    Highest Education <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.education ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Education</option>
                    {educationOptions.map((edu, index) => (
                      <option key={index} value={edu}>{edu}</option>
                    ))}
                  </select>
                  {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
                </div>

                {/* Year of Passout */}
                <div>
                  <label htmlFor="yearOfPassout" className="block text-gray-700 font-semibold mb-2">
                    Year of Passout <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="yearOfPassout"
                    name="yearOfPassout"
                    value={formData.yearOfPassout}
                    onChange={handleChange}
                    min="1950"
                    max="2030"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.yearOfPassout ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="2023"
                  />
                  {errors.yearOfPassout && <p className="text-red-500 text-sm mt-1">{errors.yearOfPassout}</p>}
                </div>

                {/* Role Looking For */}
                <div>
                  <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">
                    Role Looking For <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.role ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Full Stack Developer"
                  />
                  {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                </div>

                {/* Experience */}
                <div>
                  <label htmlFor="experience" className="block text-gray-700 font-semibold mb-2">
                    Total Experience <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.experience ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Experience</option>
                    {experienceOptions.map((exp, index) => (
                      <option key={index} value={exp}>{exp}</option>
                    ))}
                  </select>
                  {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                </div>

                {/* Current CTC */}
                <div>
                  <label htmlFor="currentCTC" className="block text-gray-700 font-semibold mb-2">
                    Current CTC (LPA)
                  </label>
                  <input
                    type="text"
                    id="currentCTC"
                    name="currentCTC"
                    value={formData.currentCTC}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5.0 LPA"
                  />
                </div>

                {/* Expected CTC */}
                <div>
                  <label htmlFor="expectedCTC" className="block text-gray-700 font-semibold mb-2">
                    Expected CTC (LPA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="expectedCTC"
                    name="expectedCTC"
                    value={formData.expectedCTC}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.expectedCTC ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="7.0 LPA"
                  />
                  {errors.expectedCTC && <p className="text-red-500 text-sm mt-1">{errors.expectedCTC}</p>}
                </div>

                {/* Notice Period */}
                <div>
                  <label htmlFor="noticePeriod" className="block text-gray-700 font-semibold mb-2">
                    Notice Period <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="noticePeriod"
                    name="noticePeriod"
                    value={formData.noticePeriod}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.noticePeriod ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Notice Period</option>
                    {noticePeriodOptions.map((period, index) => (
                      <option key={index} value={period}>{period}</option>
                    ))}
                  </select>
                  {errors.noticePeriod && <p className="text-red-500 text-sm mt-1">{errors.noticePeriod}</p>}
                </div>
              </div>
            </div>

            {/* Skills & Resume */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">Additional Information</h3>
              
              {/* Skills */}
              <div className="mb-4">
                <label htmlFor="skills" className="block text-gray-700 font-semibold mb-2">
                  Key Skills
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React, Node.js, Python, AWS, etc."
                ></textarea>
              </div>

              {/* Resume Upload */}
              <div>
                <label htmlFor="resume" className="block text-gray-700 font-semibold mb-2">
                  Upload Resume <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <label
                    htmlFor="resume"
                    className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                      errors.resume ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <Upload className="w-6 h-6 mr-2 text-gray-500" />
                    <span className="text-gray-600">
                      {formData.resume ? formData.resume.name : 'Click to upload resume (PDF, DOC, DOCX - Max 5MB)'}
                    </span>
                  </label>
                </div>
                {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-lg"
            >
              <Send size={24} />
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}