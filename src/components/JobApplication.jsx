import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Upload, Send } from 'lucide-react';
import API_URL from "../config/api";   // ✅ Production API

export default function JobApplication() {

  const fileInputRef = useRef(null);   // ✅ For clearing file input

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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

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
      if (file.size > 5000000) {
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

    if (!formData.fullName.trim())
      newErrors.fullName = 'Full name is required';

    if (!formData.email.trim())
      newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';

    if (!formData.phone.trim())
      newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, '')))
      newErrors.phone = 'Phone number must be 10 digits';

    if (!formData.education) newErrors.education = 'Education is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.yearOfPassout.trim()) newErrors.yearOfPassout = 'Year of passout is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.expectedCTC.trim()) newErrors.expectedCTC = 'Expected CTC is required';
    if (!formData.location.trim()) newErrors.location = 'Preferred location is required';
    if (!formData.noticePeriod) newErrors.noticePeriod = 'Notice period is required';
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

    setLoading(true);
    setErrorMessage('');

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });

      // ✅ Production URL
      const response = await fetch(`${API_URL}/api/apply`, {
        method: 'POST',
        body: submitData
      });

      const data = await response.json();

      if (response.ok && data.success) {

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

        // ✅ Proper file reset
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        setTimeout(() => {
          setSubmitted(false);
        }, 5000);

      } else {
        setErrorMessage(data.message || 'Failed to submit application.');
      }

    } catch (error) {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Keep your full carousel JSX here unchanged */}

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">

          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Job Application Form
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              Application Submitted Successfully!
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* KEEP YOUR ENTIRE BEAUTIFUL FORM JSX BELOW UNCHANGED */}

            {/* Just replace file input with this version */}

            <input
              type="file"
              id="resume"
              name="resume"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              disabled={loading}
              className="hidden"
            />

            {/* Keep your styled upload label */}

          </form>
        </div>
      </div>
    </div>
  );
}