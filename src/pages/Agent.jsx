import { useState, useRef } from 'react';
import axios from 'axios';

function Agent() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    experience: '',
    bio: '',
    languages: [],
    licenseNumber: '',
    socialMedia: {
      facebook: '',
      linkedin: '',
      instagram: ''
    }
  });
  
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const fileInputRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested social media fields
    if (name.startsWith('socialMedia.')) {
      const socialMediaField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialMediaField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle language addition
  const handleAddLanguage = () => {
    if (selectedLanguage && !formData.languages.includes(selectedLanguage)) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, selectedLanguage]
      }));
      setSelectedLanguage('');
    }
  };

  // Handle language removal
  const handleRemoveLanguage = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== language)
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    const data = new FormData();
    
    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'socialMedia') {
        data.append(key, JSON.stringify(value));
      } else if (key === 'languages') {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });
    
    if (image) data.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/agents', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccessMessage('Agent registered successfully!');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        experience: '',
        bio: '',
        languages: [],
        licenseNumber: '',
        socialMedia: {
          facebook: '',
          linkedin: '',
          instagram: ''
        }
      });
      setImage(null);
      setCurrentStep(1);
    } catch (err) {
      console.error('Error adding agent:', err);
      setErrorMessage(err.response?.data?.message || 'Failed to register agent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progress steps
  const steps = [
    { id: 1, name: 'Personal Info' },
    { id: 2, name: 'Professional Details' },
    { id: 3, name: 'Profile Setup' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 flex items-center justify-center">
      {/* Background elements */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-blue-500 filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-purple-500 filter blur-3xl"></div>
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-4xl z-10">
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
          {/* Progress bar */}
          <div className="h-1 bg-gray-700">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" 
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="p-8">
            {/* Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl transform rotate-45 shadow-lg"></div>
                <svg className="absolute inset-0 m-auto text-white w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                Agent Registration
              </h1>
              <p className="text-center text-gray-400">Join our network of professional real estate agents</p>
            </div>

            {/* Progress steps */}
            <div className="flex justify-between mb-8">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= step.id ? 'border-blue-500 bg-blue-500/20' : 'border-gray-600'} transition-all`}
                  >
                    {currentStep > step.id ? (
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : (
                      <span className={`font-medium ${currentStep >= step.id ? 'text-blue-400' : 'text-gray-400'}`}>{step.id}</span>
                    )}
                  </div>
                  <span className={`mt-2 text-sm ${currentStep >= step.id ? 'text-blue-400' : 'text-gray-500'}`}>{step.name}</span>
                </div>
              ))}
            </div>

            {/* Status messages */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-900/40 border border-green-700/30 rounded-lg text-green-300 backdrop-blur-sm flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-900/40 border border-red-700/30 rounded-lg text-red-300 backdrop-blur-sm flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {errorMessage}
              </div>
            )}

            {/* Multi-step form */}
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-xl font-semibold text-gray-200 mb-4">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Full Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Email*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number*</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (123) 456-7890"
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Languages Spoken</label>
                      <div className="flex space-x-2">
                        <select
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value)}
                          className="flex-grow px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                        >
                          <option value="">Select language</option>
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="Mandarin">Mandarin</option>
                          <option value="Arabic">Arabic</option>
                          <option value="Russian">Russian</option>
                          <option value="Portuguese">Portuguese</option>
                          <option value="German">German</option>
                          <option value="Japanese">Japanese</option>
                          <option value="Hindi">Hindi</option>
                        </select>
                        <button
                          type="button"
                          onClick={handleAddLanguage}
                          className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      
                      {formData.languages.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {formData.languages.map((language) => (
                            <span 
                              key={language} 
                              className="inline-flex items-center px-3 py-1 rounded-full bg-gray-700 text-gray-200 text-sm"
                            >
                              {language}
                              <button
                                type="button"
                                onClick={() => handleRemoveLanguage(language)}
                                className="ml-2 text-gray-400 hover:text-white"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
                      disabled={!formData.name || !formData.email || !formData.phone}
                    >
                      Next
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Professional Details */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-xl font-semibold text-gray-200 mb-4">Professional Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Specialty*</label>
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      >
                        <option value="">Select your specialty</option>
                        <option value="Residential">Residential Properties</option>
                        <option value="Commercial">Commercial Properties</option>
                        <option value="Luxury">Luxury Homes</option>
                        <option value="Rental">Rental Properties</option>
                        <option value="Investment">Investment Properties</option>
                        <option value="Land">Land & Development</option>
                        <option value="International">International Properties</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Years of Experience*</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      >
                        <option value="">Select experience</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">License Number</label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        placeholder="RE-12345678"
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">LinkedIn Profile</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg bg-gray-700 text-gray-400 border border-r-0 border-gray-600">
                          linkedin.com/in/
                        </span>
                        <input
                          type="text"
                          name="socialMedia.linkedin"
                          value={formData.socialMedia.linkedin}
                          onChange={handleChange}
                          placeholder="your-profile"
                          className="flex-grow px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-r-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Professional Bio*</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about your professional background, achievements, and approach..."
                      required
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                    ></textarea>
                    <p className="mt-1 text-xs text-gray-500">Minimum 100 characters</p>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
                      disabled={!formData.specialty || !formData.experience || !formData.bio}
                    >
                      Next
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Profile Setup */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-xl font-semibold text-gray-200 mb-4">Profile Setup</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-1">Profile Photo*</label>
                      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                        <div 
                          className={`relative w-32 h-32 rounded-full overflow-hidden border-2 ${image ? 'border-blue-500' : 'border-dashed border-gray-600'} bg-gray-700/50 flex items-center justify-center cursor-pointer`}
                          onClick={triggerFileInput}
                        >
                          {image ? (
                            <img 
                              src={URL.createObjectURL(image)} 
                              alt="Profile preview" 
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center p-4">
                              <svg className="w-10 h-10 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                              </svg>
                              <span className="text-xs text-gray-400 mt-1">Click to upload</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-300 mb-2">Upload a professional headshot (JPG or PNG, max 5MB)</p>
                          <p className="text-xs text-gray-500">Recommended size: 500x500 pixels</p>
                          <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                          {image && (
                            <button
                              type="button"
                              onClick={() => setImage(null)}
                              className="mt-3 px-3 py-1 bg-red-600/30 hover:bg-red-600/40 text-red-400 text-sm rounded-lg transition-colors flex items-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                              Remove photo
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Facebook Profile</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg bg-gray-700 text-gray-400 border border-r-0 border-gray-600">
                          facebook.com/
                        </span>
                        <input
                          type="text"
                          name="socialMedia.facebook"
                          value={formData.socialMedia.facebook}
                          onChange={handleChange}
                          placeholder="your-profile"
                          className="flex-grow px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-r-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Instagram Profile</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg bg-gray-700 text-gray-400 border border-r-0 border-gray-600">
                          instagram.com/
                        </span>
                        <input
                          type="text"
                          name="socialMedia.instagram"
                          value={formData.socialMedia.instagram}
                          onChange={handleChange}
                          placeholder="your-profile"
                          className="flex-grow px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-r-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-700/50">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="mt-1 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                        I agree to the <a href="#" className="text-blue-400 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>. I confirm that all information provided is accurate.
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !image}
                      className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 overflow-hidden relative group ${
                        isSubmitting || !image ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20'
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          'Complete Registration'
                        )}
                      </span>
                      {!isSubmitting && image && (
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Agent;