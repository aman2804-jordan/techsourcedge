import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import API_URL from "../config/api";

export default function JobApplication() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fileInputRef = useRef(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
  const [submitted, setSubmitted] = useState(false);
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

  const educationOptions = ['High School', "Bachelor's Degree", "Master's Degree", 'Ph.D.', 'Diploma', 'Other'];
  const experienceOptions = ['Fresher', '0-1 years', '1-3 years', '3-5 years', '5-7 years', '7-10 years', '10+ years'];
  const noticePeriodOptions = ['Immediate', '15 days', '1 month', '2 months', '3 months', 'More than 3 months'];
  const countryCodes = [
    { code: '+1', label: '🇺🇸 +1' },
    { code: '+44', label: '🇬🇧 +44' },
    { code: '+91', label: '🇮🇳 +91' },
    { code: '+61', label: '🇦🇺 +61' },
    { code: '+971', label: '🇦🇪 +971' },
    { code: '+65', label: '🇸🇬 +65' },
    { code: '+49', label: '🇩🇪 +49' },
    { code: '+33', label: '🇫🇷 +33' },
    { code: '+81', label: '🇯🇵 +81' },
    { code: '+86', label: '🇨🇳 +86' },
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

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, resume: 'Only PDF or Word documents allowed' }));
      return;
    }

    setFormData(prev => ({ ...prev, resume: file }));
    setErrors(prev => ({ ...prev, resume: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData.education) newErrors.education = 'Education is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';

    if (!formData.yearOfPassout.trim()) {
      newErrors.yearOfPassout = 'Year of passout is required';
    } else {
      const year = parseInt(formData.yearOfPassout);
      if (isNaN(year) || year < 1950 || year > currentYear + 1) {
        newErrors.yearOfPassout = `Year must be between 1950 and ${currentYear + 1}`;
      }
    }

    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.currentCTC.trim()) newErrors.currentCTC = 'Current CTC is required';
    if (!formData.expectedCTC.trim()) newErrors.expectedCTC = 'Expected CTC is required';
    if (!formData.noticePeriod) newErrors.noticePeriod = 'Notice period is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';

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

    setSubmitSuccess(true);

    try {
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

      setSubmitted(true);
      setErrors({});

      setFormData({
        fullName: '', email: '', countryCode: '+91', phone: '', education: '',
        role: '', yearOfPassout: '', experience: '', currentCTC: '',
        expectedCTC: '', location: '', noticePeriod: '', skills: '', resume: null
      });

      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (error) {
      setSubmitSuccess(false);
      alert(error.message);
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

      {/* CAROUSEL — your exact style */}
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

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition"
        >
          <ChevronRight className="text-white" size={24} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      {/* END CAROUSEL */}

      {/* FORM */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Job Application Form</h2>

          
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">

            {/* Full Name */}
            <div>
              <label className={labelClass}>Full Name <RequiredMark /></label>
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={() => setFocusedField('fullName')}
                onBlur={() => setFocusedField('')}
                className={inputClass('fullName')}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>Email <RequiredMark /></label>
              <input
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                className={inputClass('email')}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone with Country Code */}
            <div className="md:col-span-2">
              <label className={labelClass}>Phone Number <RequiredMark /></label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('countryCode')}
                  onBlur={() => setFocusedField('')}
                  className={`border-2 p-2 rounded outline-none transition-colors duration-200 w-36 ${
                    focusedField === 'countryCode' ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  {countryCodes.map(c => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
                <div className="flex-1">
                  <input
                    name="phone"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField('')}
                    maxLength={10}
                    className={inputClass('phone')}
                  />
                </div>
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Education */}
            <div>
              <label className={labelClass}>Education <RequiredMark /></label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                onFocus={() => setFocusedField('education')}
                onBlur={() => setFocusedField('')}
                className={inputClass('education')}
              >
                <option value="">Select Education</option>
                {educationOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
              {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education}</p>}
            </div>

            {/* Applying Role */}
            <div>
              <label className={labelClass}>Applying Role <RequiredMark /></label>
              <input
                name="role"
                placeholder="e.g. Software Engineer"
                value={formData.role}
                onChange={handleChange}
                onFocus={() => setFocusedField('role')}
                onBlur={() => setFocusedField('')}
                className={inputClass('role')}
              />
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>

            {/* Year of Passout */}
            <div>
              <label className={labelClass}>Year of Passout <RequiredMark /></label>
              <input
                name="yearOfPassout"
                placeholder={`e.g. ${new Date().getFullYear()}`}
                value={formData.yearOfPassout}
                onChange={handleChange}
                onFocus={() => setFocusedField('yearOfPassout')}
                onBlur={() => setFocusedField('')}
                maxLength={4}
                className={inputClass('yearOfPassout')}
              />
              {errors.yearOfPassout && <p className="text-red-500 text-xs mt-1">{errors.yearOfPassout}</p>}
            </div>

            {/* Experience */}
            <div>
              <label className={labelClass}>Experience <RequiredMark /></label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                onFocus={() => setFocusedField('experience')}
                onBlur={() => setFocusedField('')}
                className={inputClass('experience')}
              >
                <option value="">Select Experience</option>
                {experienceOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
              {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
            </div>

            {/* Current CTC */}
            <div>
              <label className={labelClass}>Current CTC <RequiredMark /></label>
              <input
                name="currentCTC"
                placeholder="e.g. 5 LPA"
                value={formData.currentCTC}
                onChange={handleChange}
                onFocus={() => setFocusedField('currentCTC')}
                onBlur={() => setFocusedField('')}
                className={inputClass('currentCTC')}
              />
              {errors.currentCTC && <p className="text-red-500 text-xs mt-1">{errors.currentCTC}</p>}
            </div>

            {/* Expected CTC */}
            <div>
              <label className={labelClass}>Expected CTC <RequiredMark /></label>
              <input
                name="expectedCTC"
                placeholder="e.g. 8 LPA"
                value={formData.expectedCTC}
                onChange={handleChange}
                onFocus={() => setFocusedField('expectedCTC')}
                onBlur={() => setFocusedField('')}
                className={inputClass('expectedCTC')}
              />
              {errors.expectedCTC && <p className="text-red-500 text-xs mt-1">{errors.expectedCTC}</p>}
            </div>

            {/* Preferred Location */}
            <div>
              <label className={labelClass}>Preferred Location</label>
              <input
                name="location"
                placeholder="e.g. Bangalore"
                value={formData.location}
                onChange={handleChange}
                onFocus={() => setFocusedField('location')}
                onBlur={() => setFocusedField('')}
                className={inputClass('location')}
              />
            </div>

            {/* Notice Period */}
            <div>
              <label className={labelClass}>Notice Period <RequiredMark /></label>
              <select
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
                onFocus={() => setFocusedField('noticePeriod')}
                onBlur={() => setFocusedField('')}
                className={inputClass('noticePeriod')}
              >
                <option value="">Select Notice Period</option>
                {noticePeriodOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
              {errors.noticePeriod && <p className="text-red-500 text-xs mt-1">{errors.noticePeriod}</p>}
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label className={labelClass}>Skills</label>
              <textarea
                name="skills"
                placeholder="e.g. React, Node.js, SQL"
                value={formData.skills}
                onChange={handleChange}
                onFocus={() => setFocusedField('skills')}
                onBlur={() => setFocusedField('')}
                rows={3}
                className={inputClass('skills')}
              />
            </div>

            {/* Resume */}
            <div className="md:col-span-2">
              <label className={labelClass}>Resume (PDF/Word, max 5MB) <RequiredMark /></label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                onFocus={() => setFocusedField('resume')}
                onBlur={() => setFocusedField('')}
                className={`w-full p-2 rounded border-2 transition-colors duration-200 ${
                  focusedField === 'resume'
                    ? 'border-blue-500'
                    : errors.resume
                    ? 'border-red-400'
                    : 'border-gray-300'
                }`}
              />
              {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
              {formData.resume && <p className="text-green-600 text-xs mt-1">✅ {formData.resume.name}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-black text-white py-2 rounded md:col-span-2">
              Submit Application
            </button>
           
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            Fields marked with <span className="text-red-500">*</span> are mandatory
          </p>
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg align-middle mt-4 text-center">
              ✅ Application Submitted Successfully!
            </div>
          )}

        </div>
      </div>

    </div>
  );
}