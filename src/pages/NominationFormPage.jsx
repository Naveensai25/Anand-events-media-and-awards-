import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Award, Upload, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

const NominationFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    candidateName: '',
    email: '',
    phone: '',
    category: location.state?.category || '',
    categoryId: location.state?.categoryId || '',
    organization: '',
    achievements: '',
    documents: null,
    images: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const categories = [
    'Business & Entrepreneurship',
    'Pharma & Healthcare',
    'Film & Entertainment',
    'Special Recognitions'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'documents') {
        // Validate document type
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
          setErrors(prev => ({
            ...prev,
            documents: 'Please upload a PDF or Word document'
          }));
          return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          setErrors(prev => ({
            ...prev,
            documents: 'File size must be less than 5MB'
          }));
          return;
        }
      }
      if (type === 'images') {
        // Validate image type
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
          setErrors(prev => ({
            ...prev,
            images: 'Please upload a JPEG or PNG image'
          }));
          return;
        }
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
          setErrors(prev => ({
            ...prev,
            images: 'Image size must be less than 2MB'
          }));
          return;
        }
      }
      setFormData(prev => ({
        ...prev,
        [type]: file
      }));
      setErrors(prev => ({
        ...prev,
        [type]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.candidateName.trim()) {
      newErrors.candidateName = 'Candidate name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select an award category';
    }
    
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization/Company name is required';
    }
    
    if (!formData.achievements.trim()) {
      newErrors.achievements = 'Please describe achievements and credentials';
    } else if (formData.achievements.trim().length < 50) {
      newErrors.achievements = 'Please provide at least 50 characters describing achievements';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          candidateName: '',
          email: '',
          phone: '',
          category: '',
          categoryId: '',
          organization: '',
          achievements: '',
          documents: null,
          images: null
        });
        setSubmitStatus(null);
      }, 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nominate for Anand Awards
          </h1>
          <p className="text-xl text-gray-600">
            Submit your nomination for exceptional talent and excellence
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {submitStatus === 'success' ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Nomination Submitted Successfully!
              </h2>
              <p className="text-gray-600 mb-8">
                Thank you for your nomination. We will review your submission and get back to you soon.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-700 hover:to-yellow-600 transition"
              >
                Return to Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Candidate Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.candidateName
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-amber-500'
                  }`}
                  placeholder="Enter nominee's full name"
                />
                {errors.candidateName && (
                  <p className="text-red-500 text-sm mt-1">{errors.candidateName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.email
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-amber-500'
                  }`}
                  placeholder="nominee@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.phone
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-amber-500'
                  }`}
                  placeholder="10-digit phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Award Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.category
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-amber-500'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              {/* Organization */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Organization/Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.organization
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-amber-500'
                  }`}
                  placeholder="Enter organization name"
                />
                {errors.organization && (
                  <p className="text-red-500 text-sm mt-1">{errors.organization}</p>
                )}
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Achievements & Credentials <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  rows="6"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition resize-none ${
                    errors.achievements
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-amber-500'
                  }`}
                  placeholder="Describe the achievements and contributions that make this nominee exceptional (minimum 50 characters)..."
                />
                {errors.achievements && (
                  <p className="text-red-500 text-sm mt-1">{errors.achievements}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">
                  {formData.achievements.length} characters
                </p>
              </div>

              {/* Document Upload */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Supporting Documents (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-400 transition">
                  <input
                    type="file"
                    id="documents"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'documents')}
                    className="hidden"
                  />
                  <label
                    htmlFor="documents"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-gray-600">
                      {formData.documents ? formData.documents.name : 'Upload PDF or Word document (Max 5MB)'}
                    </span>
                  </label>
                </div>
                {errors.documents && (
                  <p className="text-red-500 text-sm mt-1">{errors.documents}</p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Images (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-400 transition">
                  <input
                    type="file"
                    id="images"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={(e) => handleFileChange(e, 'images')}
                    className="hidden"
                  />
                  <label
                    htmlFor="images"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-gray-600">
                      {formData.images ? formData.images.name : 'Upload JPEG or PNG image (Max 2MB)'}
                    </span>
                  </label>
                </div>
                {errors.images && (
                  <p className="text-red-500 text-sm mt-1">{errors.images}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-yellow-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Nomination'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NominationFormPage;

