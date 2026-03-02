import React, { useState, useEffect } from "react";
import { Upload, Send } from "lucide-react";

const API_URL = "https://job-application-backend-6ura.onrender.com";

export default function JobApplication() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5000000) {
      setErrors((prev) => ({
        ...prev,
        resume: "File size must be less than 5MB",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, resume: file }));
    setErrors((prev) => ({ ...prev, resume: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    if (!formData.phone.trim()) newErrors.phone = "Phone required";
    if (!formData.location.trim()) newErrors.location = "Location required";
    if (!formData.resume) newErrors.resume = "Resume required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      const response = await fetch(`${API_URL}/api/apply`, {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          location: "",
          skills: "",
          resume: null,
        });

        document.getElementById("resume").value = "";

        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setErrorMessage(data.message || "Submission failed");
      }
    } catch (err) {
      setErrorMessage("Server not reachable. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Job Application Form
        </h2>

        {submitted && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            Application submitted successfully!
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-3 rounded w-full"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-3 rounded w-full"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-3 rounded w-full"
            />

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Preferred Location"
              className="border p-3 rounded w-full"
            />
          </div>

          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills"
            className="border p-3 rounded w-full mt-4"
          />

          <div className="mt-4">
            <input
              type="file"
              id="resume"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="resume"
              className="border-2 border-dashed p-4 flex items-center justify-center cursor-pointer rounded"
            >
              <Upload className="mr-2" />
              {formData.resume
                ? formData.resume.name
                : "Upload Resume (Max 5MB)"}
            </label>
            {errors.resume && (
              <p className="text-red-500 text-sm">{errors.resume}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white w-full py-3 rounded mt-6 flex items-center justify-center gap-2"
          >
            {loading ? "Submitting..." : <> <Send size={18} /> Submit </>}
          </button>
        </form>
      </div>
    </div>
  );
}