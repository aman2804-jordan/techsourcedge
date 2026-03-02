import React, { useState, useEffect, useRef } from "react";
import API_URL from "../config/api";

export default function JobApplication() {
  const currentYear = new Date().getFullYear();

  const [currentSlide, setCurrentSlide] = useState(0);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "",
    phone: "",
    education: "",
    role: "",
    yearOfPassout: "",
    experience: "",
    currentCTC: "",
    expectedCTC: "",
    location: "",
    noticePeriod: "",
    skills: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const educationOptions = [
    "High School",
    "Bachelor's Degree",
    "Master's Degree",
    "Ph.D.",
    "Diploma",
    "Other",
  ];

  const experienceOptions = [
    "Fresher",
    "0-1 years",
    "1-3 years",
    "3-5 years",
    "5-7 years",
    "7-10 years",
    "10+ years",
  ];

  const noticePeriodOptions = [
    "Immediate",
    "15 days",
    "1 month",
    "2 months",
    "3 months",
    "More than 3 months",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && value.length > 10) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5000000) {
      setErrors((prev) => ({
        ...prev,
        resume: "File size should be less than 5MB",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, resume: file }));
    setErrors((prev) => ({ ...prev, resume: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.countryCode.trim())
      newErrors.countryCode = "Country code is required";

    if (!formData.phone.trim())
      newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Phone must be exactly 10 digits";

    if (!formData.education)
      newErrors.education = "Education is required";

    if (!formData.role.trim())
      newErrors.role = "Role is required";

    if (!formData.yearOfPassout.trim())
      newErrors.yearOfPassout = "Year is required";
    else if (
      formData.yearOfPassout > currentYear + 1
    )
      newErrors.yearOfPassout =
        `Year cannot exceed ${currentYear + 1}`;

    if (!formData.experience)
      newErrors.experience = "Experience is required";

    if (!formData.currentCTC.trim())
      newErrors.currentCTC = "Current CTC is required";

    if (!formData.expectedCTC.trim())
      newErrors.expectedCTC = "Expected CTC is required";

    if (!formData.noticePeriod)
      newErrors.noticePeriod = "Notice period is required";

    if (!formData.resume)
      newErrors.resume = "Resume is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        formPayload.append(key, formData[key]);
      });

      const response = await fetch(`${API_URL}/api/apply`, {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Submission failed");

      setSubmitted(true);
      setErrors({});
      setIsSubmitting(false);

      setFormData({
        fullName: "",
        email: "",
        countryCode: "",
        phone: "",
        education: "",
        role: "",
        yearOfPassout: "",
        experience: "",
        currentCTC: "",
        expectedCTC: "",
        location: "",
        noticePeriod: "",
        skills: "",
        resume: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  const inputStyle =
    "border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Job Application Form
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              Application Submitted Successfully!
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >
            <input name="fullName" placeholder="Full Name *"
              value={formData.fullName}
              onChange={handleChange}
              className={inputStyle} />

            <input name="email" placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className={inputStyle} />

            <div className="flex gap-2">
              <input name="countryCode" placeholder="+91 *"
                value={formData.countryCode}
                onChange={handleChange}
                className={`${inputStyle} w-24`} />

              <input name="phone" placeholder="Mobile No *"
                value={formData.phone}
                onChange={handleChange}
                className={`${inputStyle} flex-1`} />
            </div>

            <select name="education"
              value={formData.education}
              onChange={handleChange}
              className={inputStyle}>
              <option value="">Select Education *</option>
              {educationOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <input name="role" placeholder="Applying Role *"
              value={formData.role}
              onChange={handleChange}
              className={inputStyle} />

            <input name="yearOfPassout" type="number"
              placeholder="Year of Passout *"
              value={formData.yearOfPassout}
              onChange={handleChange}
              className={inputStyle} />

            <select name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={inputStyle}>
              <option value="">Select Experience *</option>
              {experienceOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <input name="currentCTC" placeholder="Current CTC *"
              value={formData.currentCTC}
              onChange={handleChange}
              className={inputStyle} />

            <input name="expectedCTC" placeholder="Expected CTC *"
              value={formData.expectedCTC}
              onChange={handleChange}
              className={inputStyle} />

            <input name="location"
              placeholder="Preferred Location"
              value={formData.location}
              onChange={handleChange}
              className={inputStyle} />

            <select name="noticePeriod"
              value={formData.noticePeriod}
              onChange={handleChange}
              className={inputStyle}>
              <option value="">Select Notice Period *</option>
              {noticePeriodOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <textarea name="skills"
              placeholder="Skills"
              value={formData.skills}
              onChange={handleChange}
              className={`${inputStyle} md:col-span-2`} />

            <input type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="md:col-span-2" />

            <button
              type="submit"
              className={`py-2 rounded text-white md:col-span-2 transition duration-300 ${
                isSubmitting ? "bg-green-600" : "bg-black"
              }`}
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}