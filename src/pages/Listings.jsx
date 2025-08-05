// // import { useState, useRef, useEffect } from 'react';
// // import { FiUpload, FiX, FiChevronRight, FiChevronLeft, FiPlus, FiImage, FiVideo, FiMapPin, FiHome, FiDollarSign, FiLayers, FiStar, FiCheckCircle } from 'react-icons/fi';

// // // Constants
// // const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Commercial', 'Land'];
// // const listingTypes = ['For Sale', 'For Rent', 'Pre-sale', 'Foreclosure'];
// // const bedrooms = ['Studio', '1', '2', '3', '4', '5+'];
// // const propertyFeatures = [
// //   'Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden',
// //   'Balcony', 'Furnished', 'Pet Friendly', 'Smart Home', 'View'
// // ];

// // function PropertyListingForm() {
// //   const [formData, setFormData] = useState({
// //     propertyType: '',
// //     listingType: '',
// //     title: '',
// //     location: '',
// //     price: '',
// //     bedrooms: '',
// //     bathrooms: '',
// //     area: '',
// //     description: '',
// //     features: []
// //   });
  
// //   const [images, setImages] = useState([]);
// //   const [videoFile, setVideoFile] = useState(null);
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [activeSection, setActiveSection] = useState('basic');
// //   const [locationQuery, setLocationQuery] = useState('');
// //   const fileInputRef = useRef(null);
// //   const videoInputRef = useRef(null);

// //   // Location suggestions with debounce
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       if (locationQuery.length > 2) {
// //         const mockSuggestions = [
// //           'Mumbai, Maharashtra',
// //           'Delhi',
// //           'Bangalore, Karnataka',
// //           'Hyderabad, Telangana',
// //           'Chennai, Tamil Nadu'
// //         ].filter(loc => loc.toLowerCase().includes(locationQuery.toLowerCase()));
// //         setSuggestions(mockSuggestions);
// //       }
// //     }, 500);
// //     return () => clearTimeout(timer);
// //   }, [locationQuery]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
    
// //     if (name === 'location') {
// //       setLocationQuery(value);
// //     }
// //   };

// //   const handleFeatureToggle = (feature) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       features: prev.features.includes(feature)
// //         ? prev.features.filter(f => f !== feature)
// //         : [...prev.features, feature]
// //     }));
// //   };

// //   const handleImageUpload = (e) => {
// //     const files = Array.from(e.target.files);
// //     if (files.length + images.length > 12) {
// //       alert('Maximum 12 images allowed');
// //       return;
// //     }
// //     setImages(prev => [...prev, ...files]);
// //   };

// //   const handleVideoUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file.size > 50 * 1024 * 1024) { // 50MB limit
// //       alert('Video file should be less than 50MB');
// //       return;
// //     }
// //     setVideoFile(file);
// //   };

// //   const handleImageDelete = (index) => {
// //     setImages(prev => prev.filter((_, i) => i !== index));
// //   };

// //   const handleVideoDelete = () => {
// //     setVideoFile(null);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
// //     // Form submission logic would go here
// //     console.log('Listing submitted:', { ...formData, images, videoFile });
// //     setTimeout(() => {
// //       setIsSubmitting(false);
// //       alert('Property listed successfully!');
// //     }, 1500);
// //   };

// //   const sections = [
// //     { id: 'basic', label: 'Basic Info', icon: <FiHome className="mr-2" /> },
// //     { id: 'details', label: 'Specifications', icon: <FiLayers className="mr-2" /> },
// //     { id: 'features', label: 'Features', icon: <FiStar className="mr-2" /> },
// //     { id: 'media', label: 'Media', icon: <FiImage className="mr-2" /> },
// //     { id: 'final', label: 'Review', icon: <FiCheckCircle className="mr-2" /> }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Header */}
// //         <div className="text-center mb-10">
// //           <h1 className="text-3xl font-bold text-gray-800 mb-3">
// //             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
// //               Add New Property Listing
// //             </span>
// //           </h1>
// //           <p className="text-lg text-gray-600">Create a professional listing for your property</p>
// //         </div>

// //         {/* Progress Navigation */}
// //         <div className="mb-8 bg-white p-4 rounded-xl shadow-sm">
// //           <nav className="flex items-center justify-center">
// //             <ol className="flex items-center space-x-1 sm:space-x-4 overflow-x-auto w-full">
// //               {sections.map((section, index) => (
// //                 <li key={section.id} className="flex items-center shrink-0">
// //                   <button
// //                     onClick={() => setActiveSection(section.id)}
// //                     className={`flex items-center font-medium text-sm px-3 py-2 rounded-lg transition-colors ${
// //                       activeSection === section.id 
// //                         ? 'bg-indigo-600 text-white shadow-md' 
// //                         : 'text-gray-600 hover:bg-gray-100'
// //                     }`}
// //                   >
// //                     {section.icon}
// //                     <span className="ml-2 hidden sm:inline">{section.label}</span>
// //                   </button>
// //                   {index < sections.length - 1 && (
// //                     <FiChevronRight className="mx-1 text-gray-400 w-4 h-4" />
// //                   )}
// //                 </li>
// //               ))}
// //             </ol>
// //           </nav>
// //         </div>

// //         {/* Form Container */}
// //         <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden">
// //           {/* Visual Progress Indicator */}
// //           <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

// //           <div className="p-6 md:p-8">
// //             {/* Basic Information Section */}
// //             {activeSection === 'basic' && (
// //               <div className="space-y-6">
// //                 <div className="flex items-center mb-6">
// //                   <div className="bg-indigo-100 p-2 rounded-full mr-3">
// //                     <FiHome className="text-indigo-600 text-xl" />
// //                   </div>
// //                   <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   {/* Property Type */}
// //                   <div className="space-y-2">
// //                     <label className="block text-sm font-medium text-gray-700">Property Type*</label>
// //                     <div className="relative">
// //                       <select
// //                         name="propertyType"
// //                         value={formData.propertyType}
// //                         onChange={handleChange}
// //                         className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
// //                         required
// //                       >
// //                         <option value="">Select type</option>
// //                         {propertyTypes.map(type => (
// //                           <option key={type} value={type}>{type}</option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                   </div>

// //                   {/* Listing Type */}
// //                   <div className="space-y-2">
// //                     <label className="block text-sm font-medium text-gray-700">Listing Type*</label>
// //                     <div className="relative">
// //                       <select
// //                         name="listingType"
// //                         value={formData.listingType}
// //                         onChange={handleChange}
// //                         className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
// //                         required
// //                       >
// //                         <option value="">Select listing type</option>
// //                         {listingTypes.map(type => (
// //                           <option key={type} value={type}>{type}</option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                   </div>

// //                   {/* Location */}
// //                   <div className="space-y-2 md:col-span-2">
// //                     <label className="block text-sm font-medium text-gray-700">Location*</label>
// //                     <div className="relative">
// //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                         <FiMapPin className="text-gray-500" />
// //                       </div>
// //                       <input
// //                         type="text"
// //                         name="location"
// //                         value={formData.location}
// //                         onChange={handleChange}
// //                         className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                         placeholder="Enter property address"
// //                         required
// //                       />
// //                     </div>
// //                     {suggestions.length > 0 && (
// //                       <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
// //                         {suggestions.map((suggestion, index) => (
// //                           <li 
// //                             key={index}
// //                             className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-sm text-gray-800 border-b border-gray-100 last:border-0"
// //                             onClick={() => {
// //                               setFormData(prev => ({ ...prev, location: suggestion }));
// //                               setSuggestions([]);
// //                             }}
// //                           >
// //                             {suggestion}
// //                           </li>
// //                         ))}
// //                       </ul>
// //                     )}
// //                   </div>

// //                   {/* Price */}
// //                   <div className="space-y-2">
// //                     <label className="block text-sm font-medium text-gray-700">Price*</label>
// //                     <div className="relative">
// //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                         <FiDollarSign className="text-gray-500" />
// //                       </div>
// //                       <input
// //                         type="number"
// //                         name="price"
// //                         value={formData.price}
// //                         onChange={handleChange}
// //                         className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                         placeholder="0.00"
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Title */}
// //                   <div className="space-y-2 md:col-span-2">
// //                     <label className="block text-sm font-medium text-gray-700">Title*</label>
// //                     <input
// //                       type="text"
// //                       name="title"
// //                       value={formData.title}
// //                       onChange={handleChange}
// //                       className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                       placeholder="Beautiful 3BHK Apartment in Prime Location"
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Specifications Section */}
// //             {activeSection === 'details' && (
// //               <div className="space-y-6">
// //                 <div className="flex items-center mb-6">
// //                   <div className="bg-indigo-100 p-2 rounded-full mr-3">
// //                     <FiLayers className="text-indigo-600 text-xl" />
// //                   </div>
// //                   <h2 className="text-xl font-semibold text-gray-800">Property Specifications</h2>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   {/* Bedrooms */}
// //                   <div className="space-y-2">
// //                     <label className="block text-sm font-medium text-gray-700">Bedrooms*</label>
// //                     <select
// //                       name="bedrooms"
// //                       value={formData.bedrooms}
// //                       onChange={handleChange}
// //                       className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
// //                       required
// //                     >
// //                       <option value="">Select bedrooms</option>
// //                       {bedrooms.map(bed => (
// //                         <option key={bed} value={bed}>{bed}</option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   {/* Bathrooms */}
// //                   <div className="space-y-2">
// //                     <label className="block text-sm font-medium text-gray-700">Bathrooms*</label>
// //                     <input
// //                       type="number"
// //                       name="bathrooms"
// //                       value={formData.bathrooms}
// //                       onChange={handleChange}
// //                       className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                       placeholder="Number of bathrooms"
// //                       min="1"
// //                       required
// //                     />
// //                   </div>

// //                   {/* Area */}
// //                   <div className="space-y-2">
// //                     <label className="block text-sm font-medium text-gray-700">Area (sq ft)*</label>
// //                     <input
// //                       type="number"
// //                       name="area"
// //                       value={formData.area}
// //                       onChange={handleChange}
// //                       className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                       placeholder="Property area"
// //                       min="1"
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Features Section */}
// //             {activeSection === 'features' && (
// //               <div className="space-y-6">
// //                 <div className="flex items-center mb-6">
// //                   <div className="bg-indigo-100 p-2 rounded-full mr-3">
// //                     <FiStar className="text-indigo-600 text-xl" />
// //                   </div>
// //                   <h2 className="text-xl font-semibold text-gray-800">Property Features</h2>
// //                 </div>

// //                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
// //                   {propertyFeatures.map(feature => (
// //                     <div key={feature} className="flex items-center">
// //                       <input
// //                         type="checkbox"
// //                         id={`feature-${feature}`}
// //                         checked={formData.features.includes(feature)}
// //                         onChange={() => handleFeatureToggle(feature)}
// //                         className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
// //                       />
// //                       <label htmlFor={`feature-${feature}`} className="ml-2 text-sm text-gray-700">
// //                         {feature}
// //                       </label>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Media Section */}
// //             {activeSection === 'media' && (
// //               <div className="space-y-6">
// //                 <div className="flex items-center mb-6">
// //                   <div className="bg-indigo-100 p-2 rounded-full mr-3">
// //                     <FiImage className="text-indigo-600 text-xl" />
// //                   </div>
// //                   <h2 className="text-xl font-semibold text-gray-800">Media Content</h2>
// //                 </div>

// //                 {/* Image Upload */}
// //                 <div className="mb-8">
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">Property Images*</label>
// //                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
// //                     {images.length > 0 ? (
// //                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
// //                         {images.map((img, index) => (
// //                           <div key={index} className="relative group">
// //                             <img 
// //                               src={URL.createObjectURL(img)} 
// //                               alt={`Preview ${index}`}
// //                               className="w-full h-40 object-cover rounded-lg"
// //                             />
// //                             <button
// //                               type="button"
// //                               onClick={() => handleImageDelete(index)}
// //                               className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
// //                             >
// //                               <FiX className="w-4 h-4" />
// //                             </button>
// //                           </div>
// //                         ))}
// //                         {images.length < 12 && (
// //                           <div 
// //                             onClick={() => fileInputRef.current.click()}
// //                             className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors bg-gray-50"
// //                           >
// //                             <FiPlus className="text-gray-400 text-2xl mb-2" />
// //                             <span className="text-sm text-gray-600">Add more</span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     ) : (
// //                       <div 
// //                         onClick={() => fileInputRef.current.click()}
// //                         className="flex flex-col items-center justify-center py-12 cursor-pointer"
// //                       >
// //                         <FiImage className="text-gray-400 text-4xl mb-3" />
// //                         <p className="text-gray-600 mb-1">Click to upload images</p>
// //                         <p className="text-xs text-gray-500">Minimum 3 photos required (max 12)</p>
// //                       </div>
// //                     )}
// //                     <input
// //                       type="file"
// //                       ref={fileInputRef}
// //                       onChange={handleImageUpload}
// //                       multiple
// //                       accept="image/*"
// //                       className="hidden"
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Video Upload */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">Video Tour</label>
// //                   <div className="flex flex-col sm:flex-row gap-4">
// //                     <div className="flex-1">
// //                       <input
// //                         type="text"
// //                         name="videoTour"
// //                         value={formData.videoTour}
// //                         onChange={handleChange}
// //                         className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //                         placeholder="YouTube or Vimeo URL"
// //                       />
// //                     </div>
// //                     <div className="relative">
// //                       <button
// //                         type="button"
// //                         onClick={() => videoInputRef.current.click()}
// //                         className="inline-flex items-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-medium text-gray-800 border border-gray-300"
// //                       >
// //                         <FiVideo className="mr-2" />
// //                         {videoFile ? 'Change Video' : 'Upload Video'}
// //                       </button>
// //                       <input 
// //                         ref={videoInputRef}
// //                         type="file" 
// //                         accept="video/*"
// //                         onChange={handleVideoUpload}
// //                         className="hidden"
// //                       />
// //                       {videoFile && (
// //                         <div className="mt-2 flex items-center">
// //                           <span className="text-sm text-gray-700 truncate">{videoFile.name}</span>
// //                           <button 
// //                             type="button"
// //                             onClick={handleVideoDelete}
// //                             className="ml-2 text-red-600 hover:text-red-800"
// //                           >
// //                             <FiX />
// //                           </button>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Review Section */}
// //             {activeSection === 'final' && (
// //               <div className="space-y-6">
// //                 <div className="flex items-center mb-6">
// //                   <div className="bg-indigo-100 p-2 rounded-full mr-3">
// //                     <FiCheckCircle className="text-indigo-600 text-xl" />
// //                   </div>
// //                   <h2 className="text-xl font-semibold text-gray-800">Review & Submit</h2>
// //                 </div>

// //                 <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
// //                   <h3 className="text-lg font-medium text-blue-800 mb-4">Ready to submit your property listing?</h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// //                     <div>
// //                       <h4 className="font-medium text-gray-800 mb-2">Property Details</h4>
// //                       <div className="space-y-1 text-sm text-gray-600">
// //                         <p><span className="font-medium">Type:</span> {formData.propertyType || 'Not specified'}</p>
// //                         <p><span className="font-medium">Listing:</span> {formData.listingType || 'Not specified'}</p>
// //                         <p><span className="font-medium">Location:</span> {formData.location || 'Not specified'}</p>
// //                         <p><span className="font-medium">Price:</span> {formData.price ? `₹${formData.price}` : 'Not specified'}</p>
// //                       </div>
// //                     </div>
// //                     <div>
// //                       <h4 className="font-medium text-gray-800 mb-2">Specifications</h4>
// //                       <div className="space-y-1 text-sm text-gray-600">
// //                         <p><span className="font-medium">Bedrooms:</span> {formData.bedrooms || 'Not specified'}</p>
// //                         <p><span className="font-medium">Bathrooms:</span> {formData.bathrooms || 'Not specified'}</p>
// //                         <p><span className="font-medium">Area:</span> {formData.area ? `${formData.area} sq ft` : 'Not specified'}</p>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="mb-6">
// //                     <h4 className="font-medium text-gray-800 mb-2">Media Uploads</h4>
// //                     <div className="text-sm text-gray-600">
// //                       <p><span className="font-medium">Images:</span> {images.length} uploaded</p>
// //                       <p><span className="font-medium">Video:</span> {videoFile ? 'Uploaded' : 'Not uploaded'}</p>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-start mb-6">
// //                     <input
// //                       id="terms-checkbox"
// //                       type="checkbox"
// //                       className="h-4 w-4 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
// //                       required
// //                     />
// //                     <label htmlFor="terms-checkbox" className="ml-2 block text-sm text-gray-700">
// //                       I confirm that all information provided is accurate and I agree to the terms of service.
// //                     </label>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Navigation Buttons */}
// //           <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
// //             <div>
// //               {activeSection !== 'basic' && (
// //                 <button
// //                   type="button"
// //                   onClick={() => setActiveSection(sections[sections.findIndex(s => s.id === activeSection) - 1].id)}
// //                   className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 >
// //                   <FiChevronLeft className="mr-2" />
// //                   Previous
// //                 </button>
// //               )}
// //             </div>
            
// //             <div>
// //               {activeSection !== 'final' ? (
// //                 <button
// //                   type="button"
// //                   onClick={() => setActiveSection(sections[sections.findIndex(s => s.id === activeSection) + 1].id)}
// //                   className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 >
// //                   Next
// //                   <FiChevronRight className="ml-2" />
// //                 </button>
// //               ) : (
// //                 <button
// //                   type="submit"
// //                   disabled={isSubmitting || images.length < 3}
// //                   className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
// //                 >
// //                   {isSubmitting ? (
// //                     <>
// //                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                       </svg>
// //                       Submitting...
// //                     </>
// //                   ) : (
// //                     'Publish Listing'
// //                   )}
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default PropertyListingForm;











// import { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   FiUpload, FiX, FiPlus, FiImage, FiVideo, FiCheckCircle 
// } from 'react-icons/fi';
// import axios from 'axios';

// const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Commercial', 'Land'];
// const listingTypes = ['For Sale', 'For Rent', 'Pre-sale', 'Foreclosure'];
// const bedroomsOptions = ['Studio', '1', '2', '3', '4', '5+'];
// const featuresList = [
//   'Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden',
//   'Balcony', 'Furnished', 'Pet Friendly', 'Smart Home', 'View'
// ];

// function PropertyListingForm() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     propertyType: '',
//     listingType: '',
//     title: '',
//     location: '',
//     price: '',
//     bedrooms: '',
//     bathrooms: '',
//     area: '',
//     description: '',
//     features: []
//   });

//   const [images, setImages] = useState([]);
//   const [videoFile, setVideoFile] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Handle change for text/select inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Toggle features in formData.features array
//   const toggleFeature = (feature) => {
//     setFormData(prev => {
//       const hasFeature = prev.features.includes(feature);
//       return {
//         ...prev,
//         features: hasFeature 
//           ? prev.features.filter(f => f !== feature)
//           : [...prev.features, feature]
//       };
//     });
//   };

//   // Add images, max 12
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + images.length > 12) {
//       alert('Maximum 12 images allowed');
//       return;
//     }
//     setImages(prev => [...prev, ...files]);
//   };

//   // Remove image preview by index
//   const removeImage = (index) => {
//     setImages(prev => prev.filter((_, i) => i !== index));
//   };

//   // Handle video upload (single file)
//   const handleVideoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size > 50 * 1024 * 1024) {
//       alert('Video file should be less than 50MB');
//       return;
//     }
//     setVideoFile(file);
//   };

//   // Remove selected video
//   const removeVideo = () => {
//     setVideoFile(null);
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const dataToSend = new FormData();

//       // Append all form fields
//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === 'features') {
//           dataToSend.append(key, JSON.stringify(value));
//         } else {
//           dataToSend.append(key, value);
//         }
//       });

//       // Append images
//       images.forEach(image => dataToSend.append('images', image));

//       // Append video if any
//       if (videoFile) {
//         dataToSend.append('video', videoFile);
//       }

//       // Use full backend URL here if no proxy setup
//       await axios.post('http://localhost:5000/api/listings', dataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       alert('Property listed successfully!');
//       navigate('/listings');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to submit listing. Try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-800 shadow rounded">
//       <h2 className="text-xl font-semibold mb-6">Add New Property Listing</h2>
//       <form onSubmit={handleSubmit}>

//         {/* Property Type */}
//         <label className="block mb-2 font-medium">Property Type</label>
//         <select 
//           name="propertyType" 
//           value={formData.propertyType} 
//           onChange={handleChange} 
//           required
//           className="w-full mb-4 p-2 border rounded"
//         >
//           <option value="">Select property type</option>
//           {propertyTypes.map(type => (
//             <option key={type} value={type}>{type}</option>
//           ))}
//         </select>

//         {/* Listing Type */}
//         <label className="block mb-2 font-medium">Listing Type</label>
//         <select 
//           name="listingType" 
//           value={formData.listingType} 
//           onChange={handleChange} 
//           required
//           className="w-full mb-4 p-2 border rounded"
//         >
//           <option value="">Select listing type</option>
//           {listingTypes.map(type => (
//             <option key={type} value={type}>{type}</option>
//           ))}
//         </select>

//         {/* Title */}
//         <label className="block mb-2 font-medium">Title</label>
//         <input 
//           type="text" 
//           name="title" 
//           value={formData.title} 
//           onChange={handleChange} 
//           required 
//           className="w-full mb-4 p-2 border rounded" 
//           placeholder="Enter property title"
//         />

//         {/* Location */}
//         <label className="block mb-2 font-medium">Location</label>
//         <input 
//           type="text" 
//           name="location" 
//           value={formData.location} 
//           onChange={handleChange} 
//           required 
//           className="w-full mb-4 p-2 border rounded" 
//           placeholder="Enter location"
//         />

//         {/* Price */}
//         <label className="block mb-2 font-medium">Price (INR)</label>
//         <input 
//           type="number" 
//           name="price" 
//           value={formData.price} 
//           onChange={handleChange} 
//           required 
//           min={0}
//           className="w-full mb-4 p-2 border rounded" 
//           placeholder="Enter price"
//         />

//         {/* Bedrooms */}
//         <label className="block mb-2 font-medium">Bedrooms</label>
//         <select 
//           name="bedrooms" 
//           value={formData.bedrooms} 
//           onChange={handleChange} 
//           required
//           className="w-full mb-4 p-2 border rounded"
//         >
//           <option value="">Select bedrooms</option>
//           {bedroomsOptions.map(b => (
//             <option key={b} value={b}>{b}</option>
//           ))}
//         </select>

//         {/* Bathrooms */}
//         <label className="block mb-2 font-medium">Bathrooms</label>
//         <input 
//           type="number" 
//           name="bathrooms" 
//           value={formData.bathrooms} 
//           onChange={handleChange} 
//           required 
//           min={0}
//           className="w-full mb-4 p-2 border rounded" 
//           placeholder="Enter number of bathrooms"
//         />

//         {/* Area */}
//         <label className="block mb-2 font-medium">Area (sqft)</label>
//         <input 
//           type="number" 
//           name="area" 
//           value={formData.area} 
//           onChange={handleChange} 
//           required 
//           min={0}
//           className="w-full mb-4 p-2 border rounded" 
//           placeholder="Enter area in sqft"
//         />

//         {/* Description */}
//         <label className="block mb-2 font-medium">Description</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           rows={4}
//           className="w-full mb-4 p-2 border rounded"
//           placeholder="Write a detailed description"
//         />

//         {/* Features */}
//         <label className="block mb-2 font-medium">Features</label>
//         <div className="flex flex-wrap gap-3 mb-4">
//           {featuresList.map(feature => (
//             <button
//               type="button"
//               key={feature}
//               onClick={() => toggleFeature(feature)}
//               className={`px-3 py-1 rounded border ${
//                 formData.features.includes(feature)
//                   ? 'bg-indigo-600 text-white border-indigo-600'
//                   : 'bg-white text-gray-700 border-gray-300'
//               }`}
//             >
//               {feature}
//               {formData.features.includes(feature) && <FiCheckCircle className="inline ml-1" />}
//             </button>
//           ))}
//         </div>

//         {/* Images Upload */}
//         <label className="block mb-2 font-medium">Upload Images (Max 12)</label>
//         <input 
//           type="file" 
//           multiple 
//           accept="image/*" 
//           onChange={handleImageUpload} 
//           className="mb-4"
//         />
//         <div className="flex flex-wrap gap-4 mb-6">
//           {images.map((img, idx) => (
//             <div key={idx} className="relative">
//               <img 
//                 src={URL.createObjectURL(img)} 
//                 alt="Preview" 
//                 className="w-24 h-24 object-cover rounded border" 
//               />
//               <button 
//                 type="button"
//                 onClick={() => removeImage(idx)}
//                 className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-800"
//               >
//                 <FiX />
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Video Upload */}
//         <label className="block mb-2 font-medium">Upload Video (Max 50MB)</label>
//         <input 
//           type="file" 
//           accept="video/*" 
//           onChange={handleVideoUpload} 
//           className="mb-4"
//         />
//         {videoFile && (
//           <div className="mb-6 flex items-center gap-4">
//             <video 
//               src={URL.createObjectURL(videoFile)} 
//               controls 
//               className="w-64 rounded border"
//             />
//             <button
//               type="button"
//               onClick={removeVideo}
//               className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
//             >
//               Remove Video
//             </button>
//           </div>
//         )}

//         {/* Submit */}
//         <button 
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
//         >
//           {isSubmitting ? 'Submitting...' : 'Submit Listing'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default PropertyListingForm;













import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUpload, FiX, FiPlus, FiImage, FiVideo, 
  FiCheckCircle, FiHome, FiDollarSign, FiMapPin, 
  FiLayers, FiGrid, FiCheck, FiTrash2
} from 'react-icons/fi';
import axios from 'axios';

const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Commercial', 'Land'];
const listingTypes = ['For Sale', 'For Rent', 'Pre-sale', 'Foreclosure'];
const bedroomsOptions = ['Studio', '1', '2', '3', '4', '5+'];
const featuresList = [
  'Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden',
  'Balcony', 'Furnished', 'Pet Friendly', 'Smart Home', 'View'
];

function PropertyListingForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    propertyType: '',
    listingType: '',
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    features: []
  });

  const [images, setImages] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (feature) => {
    setFormData(prev => {
      const hasFeature = prev.features.includes(feature);
      return {
        ...prev,
        features: hasFeature 
          ? prev.features.filter(f => f !== feature)
          : [...prev.features, feature]
      };
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 12) {
      alert('Maximum 12 images allowed');
      return;
    }
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 50 * 1024 * 1024) {
      alert('Video file should be less than 50MB');
      return;
    }
    setVideoFile(file);
  };

  const removeVideo = () => {
    setVideoFile(null);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'features') {
          dataToSend.append(key, JSON.stringify(value));
        } else {
          dataToSend.append(key, value);
        }
      });
      images.forEach(image => dataToSend.append('images', image));
      if (videoFile) dataToSend.append('video', videoFile);

      await axios.post('http://localhost:5000/api/listings', dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/listings/success');
    } catch (err) {
      console.error(err);
      alert('Failed to submit listing. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-800 border-2 border-gray-600 text-gray-400'}`}>
                {currentStep > step ? <FiCheck size={18} /> : step}
              </div>
              <span className={`mt-2 text-sm font-medium ${currentStep >= step ? 'text-indigo-400' : 'text-gray-500'}`}>
                {step === 1 ? 'Details' : step === 2 ? 'Media' : 'Review'}
              </span>
            </div>
          ))}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-700 -z-1">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300" 
              style={{ width: `${(currentStep - 1) * 50}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Property Details */}
            {currentStep === 1 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-6">Property Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Property Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 flex items-center">
                      <FiHome className="mr-2" /> Property Type
                    </label>
                    <select 
                      name="propertyType" 
                      value={formData.propertyType} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100"
                    >
                      <option value="" className="text-gray-400">Select property type</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type} className="text-gray-100">{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Listing Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 flex items-center">
                      <FiLayers className="mr-2" /> Listing Type
                    </label>
                    <select 
                      name="listingType" 
                      value={formData.listingType} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100"
                    >
                      <option value="" className="text-gray-400">Select listing type</option>
                      {listingTypes.map(type => (
                        <option key={type} value={type} className="text-gray-100">{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Title */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300">Title</label>
                    <input 
                      type="text" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100" 
                      placeholder="Modern luxury apartment with sea view"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 flex items-center">
                      <FiMapPin className="mr-2" /> Location
                    </label>
                    <input 
                      type="text" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100" 
                      placeholder="123 Main St, Downtown, City"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 flex items-center">
                      <FiDollarSign className="mr-2" /> Price (INR)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">₹</span>
                      <input 
                        type="number" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleChange} 
                        required 
                        min={0}
                        className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100" 
                        placeholder="5,000,000"
                      />
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Bedrooms</label>
                    <select 
                      name="bedrooms" 
                      value={formData.bedrooms} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100"
                    >
                      <option value="" className="text-gray-400">Select bedrooms</option>
                      {bedroomsOptions.map(b => (
                        <option key={b} value={b} className="text-gray-100">{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Bathrooms */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Bathrooms</label>
                    <input 
                      type="number" 
                      name="bathrooms" 
                      value={formData.bathrooms} 
                      onChange={handleChange} 
                      required 
                      min={0}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100" 
                      placeholder="2"
                    />
                  </div>

                  {/* Area */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Area (sqft)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        name="area" 
                        value={formData.area} 
                        onChange={handleChange} 
                        required 
                        min={0}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100" 
                        placeholder="1200"
                      />
                      <span className="absolute right-3 top-3 text-gray-400">sqft</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100"
                      placeholder="Describe the property in detail..."
                    />
                  </div>

                  {/* Features */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300">Features</label>
                    <div className="flex flex-wrap gap-2">
                      {featuresList.map(feature => (
                        <button
                          type="button"
                          key={feature}
                          onClick={() => toggleFeature(feature)}
                          className={`px-3 py-1 rounded-full text-sm flex items-center ${
                            formData.features.includes(feature)
                              ? 'bg-indigo-600 text-white border border-indigo-600'
                              : 'bg-gray-700 text-gray-300 border border-gray-600'
                          }`}
                        >
                          {feature}
                          {formData.features.includes(feature) && <FiCheckCircle className="ml-1" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    Next: Add Media <FiPlus className="ml-2" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Media Upload */}
            {currentStep === 2 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-6">Media Upload</h2>
                
                {/* Images Upload */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                    <FiImage className="mr-2" /> Property Images (Max 12)
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-700/50">
                    <div className="flex flex-col items-center justify-center">
                      <FiUpload className="w-10 h-10 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-400">
                        <span className="font-medium text-indigo-400">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB each</p>
                    </div>
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                      id="image-upload"
                    />
                    <label 
                      htmlFor="image-upload" 
                      className="mt-4 inline-block px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 cursor-pointer border border-gray-600"
                    >
                      Select Images
                    </label>
                  </div>

                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-300 mb-3">Selected Images ({images.length}/12)</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {images.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img 
                              src={URL.createObjectURL(img)} 
                              alt="Preview" 
                              className="w-full h-32 object-cover rounded-lg border border-gray-600" 
                            />
                            <button 
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FiX size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                    <FiVideo className="mr-2" /> Property Video (Optional, Max 50MB)
                  </label>
                  {!videoFile ? (
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-700/50">
                      <div className="flex flex-col items-center justify-center">
                        <FiVideo className="w-10 h-10 text-gray-400 mb-3" />
                        <p className="text-sm text-gray-400">
                          <span className="font-medium text-indigo-400">Click to upload</span> a video tour
                        </p>
                        <p className="text-xs text-gray-500 mt-1">MP4, MOV up to 50MB</p>
                      </div>
                      <input 
                        type="file" 
                        accept="video/*" 
                        onChange={handleVideoUpload} 
                        className="hidden" 
                        id="video-upload"
                      />
                      <label 
                        htmlFor="video-upload" 
                        className="mt-4 inline-block px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 cursor-pointer border border-gray-600"
                      >
                        Select Video
                      </label>
                    </div>
                  ) : (
                    <div className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-gray-300">
                          <FiVideo className="text-indigo-400 mr-2" />
                          <span className="text-sm font-medium">{videoFile.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeVideo}
                          className="text-red-400 hover:text-red-300 flex items-center text-sm"
                        >
                          <FiTrash2 className="mr-1" /> Remove
                        </button>
                      </div>
                      <video 
                        src={URL.createObjectURL(videoFile)} 
                        controls 
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    Next: Review & Submit <FiCheck className="ml-2" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {currentStep === 3 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-6">Review Your Listing</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Property Details Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-4 pb-2 border-b border-gray-700">Property Details</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">Property Type</p>
                        <p className="font-medium text-gray-200">{formData.propertyType || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Listing Type</p>
                        <p className="font-medium text-gray-200">{formData.listingType || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Title</p>
                        <p className="font-medium text-gray-200">{formData.title || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="font-medium text-gray-200">{formData.location || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Price</p>
                        <p className="font-medium text-gray-200">
                          {formData.price ? `₹${Number(formData.price).toLocaleString()}` : 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Bedrooms</p>
                        <p className="font-medium text-gray-200">{formData.bedrooms || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Bathrooms</p>
                        <p className="font-medium text-gray-200">{formData.bathrooms || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Area</p>
                        <p className="font-medium text-gray-200">
                          {formData.area ? `${formData.area} sqft` : 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Description</p>
                        <p className="font-medium text-gray-200">{formData.description || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Features & Media Summary */}
                  <div>
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-100 mb-4 pb-2 border-b border-gray-700">Features</h3>
                      {formData.features.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {formData.features.map(feature => (
                            <span key={feature} className="px-3 py-1 bg-gray-700 text-indigo-300 rounded-full text-sm flex items-center border border-gray-600">
                              <FiCheck className="mr-1" /> {feature}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No features selected</p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 mb-4 pb-2 border-b border-gray-700">Media</h3>
                      <div className="mb-4">
                        <p className="text-sm text-gray-400 mb-2">Images ({images.length})</p>
                        {images.length > 0 ? (
                          <div className="grid grid-cols-3 gap-2">
                            {images.slice(0, 3).map((img, idx) => (
                              <img 
                                key={idx} 
                                src={URL.createObjectURL(img)} 
                                alt="Preview" 
                                className="w-full h-20 object-cover rounded border border-gray-600" 
                              />
                            ))}
                            {images.length > 3 && (
                              <div className="bg-gray-700 rounded border border-gray-600 flex items-center justify-center text-xs text-gray-400">
                                +{images.length - 3} more
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-500">No images added</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Video</p>
                        {videoFile ? (
                          <div className="flex items-center text-indigo-400">
                            <FiVideo className="mr-2" />
                            <span className="text-gray-300">{videoFile.name}</span>
                          </div>
                        ) : (
                          <p className="text-gray-500">No video added</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Listing'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default PropertyListingForm;