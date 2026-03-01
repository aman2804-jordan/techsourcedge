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

  const educationOptions = ['High School',"Bachelor's Degree","Master's Degree",'Ph.D.','Diploma','Other'];
  const experienceOptions = ['Fresher','0-1 years','1-3 years','3-5 years','5-7 years','7-10 years','10+ years'];
  const noticePeriodOptions = ['Immediate','15 days','1 month','2 months','3 months','More than 3 months'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleChange = (e) => {
    const { name, value } = e.target;

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

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.education) newErrors.education = 'Education is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.yearOfPassout.trim()) newErrors.yearOfPassout = 'Year is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.expectedCTC.trim()) newErrors.expectedCTC = 'Expected CTC is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.noticePeriod) newErrors.noticePeriod = 'Notice period is required';
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
      Object.keys(formData).forEach(key => {
        formPayload.append(key, formData[key]);
      });

      const response = await fetch(`${API_URL}/api/apply`, {
        method: 'POST',
        body: formPayload
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Submission failed");

      setSubmitted(true);
      setErrors({});
      setFormData({
        fullName:'',email:'',phone:'',education:'',role:'',yearOfPassout:'',
        experience:'',currentCTC:'',expectedCTC:'',location:'',
        noticePeriod:'',skills:'',resume:null
      });

    } catch (error) {
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
          />
        ))}
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Job Application Form</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              Application Submitted Successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

            <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="border p-2 rounded"/>
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded"/>
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border p-2 rounded"/>

            <select name="education" value={formData.education} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Education</option>
              {educationOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>

            <input name="role" placeholder="Applying Role" value={formData.role} onChange={handleChange} className="border p-2 rounded"/>
            <input name="yearOfPassout" placeholder="Year of Passout" value={formData.yearOfPassout} onChange={handleChange} className="border p-2 rounded"/>

            <select name="experience" value={formData.experience} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Experience</option>
              {experienceOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>

            <input name="currentCTC" placeholder="Current CTC" value={formData.currentCTC} onChange={handleChange} className="border p-2 rounded"/>
            <input name="expectedCTC" placeholder="Expected CTC" value={formData.expectedCTC} onChange={handleChange} className="border p-2 rounded"/>
            <input name="location" placeholder="Preferred Location" value={formData.location} onChange={handleChange} className="border p-2 rounded"/>

            <select name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Notice Period</option>
              {noticePeriodOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>

            <textarea name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} className="border p-2 rounded md:col-span-2"/>

            <input type="file" onChange={handleFileChange} className="md:col-span-2"/>
            
            <button type="submit" className="bg-black text-white py-2 rounded md:col-span-2">
              Submit Application
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}