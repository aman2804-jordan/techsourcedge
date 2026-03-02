import React, { useState, useEffect, useRef } from 'react';
import API_URL from "../config/api";

export default function JobApplication() {

  const currentYear = new Date().getFullYear();
  const fileInputRef = useRef(null);

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const educationOptions = ['High School',"Bachelor's Degree","Master's Degree",'Ph.D.','Diploma','Other'];
  const experienceOptions = ['Fresher','0-1 years','1-3 years','3-5 years','5-7 years','7-10 years','10+ years'];
  const noticePeriodOptions = ['Immediate','15 days','1 month','2 months','3 months','More than 3 months'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5000000) {
      setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
      return;
    }

    setFormData(prev => ({ ...prev, resume: file }));
    setErrors(prev => ({ ...prev, resume: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.countryCode.trim()) newErrors.countryCode = 'Country code required';

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }

    if (!formData.education) newErrors.education = 'Education required';
    if (!formData.role.trim()) newErrors.role = 'Role required';

    if (!formData.yearOfPassout.trim()) {
      newErrors.yearOfPassout = 'Year required';
    } else if (
      formData.yearOfPassout > currentYear + 1 ||
      formData.yearOfPassout < 1950
    ) {
      newErrors.yearOfPassout = `Year cannot exceed ${currentYear + 1}`;
    }

    if (!formData.experience) newErrors.experience = 'Experience required';
    if (!formData.currentCTC.trim()) newErrors.currentCTC = 'Current CTC required';
    if (!formData.expectedCTC.trim()) newErrors.expectedCTC = 'Expected CTC required';
    if (!formData.noticePeriod) newErrors.noticePeriod = 'Notice period required';
    if (!formData.resume) newErrors.resume = 'Resume required';

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
      setIsSubmitting(true);

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

      setFormData({
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

      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? 'border-red-500' : 'border-gray-300'
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Job Application Form</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              Application Submitted Successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

            <div>
              <input name="fullName" placeholder="Full Name *" value={formData.fullName} onChange={handleChange} className={inputClass('fullName')} />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div>
              <input name="email" placeholder="Email *" value={formData.email} onChange={handleChange} className={inputClass('email')} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="flex gap-2">
              <div className="w-1/3">
                <input name="countryCode" value={formData.countryCode} onChange={handleChange} className={inputClass('countryCode')} />
              </div>
              <div className="w-2/3">
                <input name="phone" placeholder="Mobile Number *" maxLength="10" value={formData.phone} onChange={handleChange} className={inputClass('phone')} />
              </div>
            </div>
            {errors.phone && <p className="text-red-500 text-sm md:col-span-2">{errors.phone}</p>}

            <div>
              <input name="yearOfPassout" type="number" placeholder="Year of Passout *" value={formData.yearOfPassout} onChange={handleChange} className={inputClass('yearOfPassout')} />
              {errors.yearOfPassout && <p className="text-red-500 text-sm">{errors.yearOfPassout}</p>}
            </div>

            <div>
              <select name="experience" value={formData.experience} onChange={handleChange} className={inputClass('experience')}>
                <option value="">Select Experience *</option>
                {experienceOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
              {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
            </div>

            <div>
              <input name="currentCTC" placeholder="Current CTC *" value={formData.currentCTC} onChange={handleChange} className={inputClass('currentCTC')} />
              {errors.currentCTC && <p className="text-red-500 text-sm">{errors.currentCTC}</p>}
            </div>

            <div>
              <input name="expectedCTC" placeholder="Expected CTC *" value={formData.expectedCTC} onChange={handleChange} className={inputClass('expectedCTC')} />
              {errors.expectedCTC && <p className="text-red-500 text-sm">{errors.expectedCTC}</p>}
            </div>

            <div className="md:col-span-2">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className={inputClass('resume')} />
              {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}
            </div>

            <button
              type="submit"
              className={`py-2 rounded text-white md:col-span-2 transition ${
                isSubmitting ? 'bg-green-600' : 'bg-black hover:bg-gray-800'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}