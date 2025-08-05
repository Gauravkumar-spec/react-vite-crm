import React, { useState } from 'react';
import axios from 'axios';
import { 
  FiUser, FiPhone, FiMail, FiHome, 
  FiDollarSign, FiMapPin, FiCalendar, 
  FiGlobe, FiFileText, FiSave 
} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Leads = () => {
  const [lead, setLead] = useState({
    name: '',
    mobile: '',
    email: '',
    requirement: '',
    budgetMin: '',
    budgetMax: '',
    location: '',
    propertyType: '',
    followUpDate: '',
    source: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('http://localhost:5000/api/leads/add', lead);
      toast.success('Lead saved successfully!', {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      
      // Reset form
      setLead({
        name: '',
        mobile: '',
        email: '',
        requirement: '',
        budgetMin: '',
        budgetMax: '',
        location: '',
        propertyType: '',
        followUpDate: '',
        source: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error saving lead:', error);
      toast.error('Failed to save lead. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-400">New Lead Capture</h2>
          <p className="mt-2 text-lg text-gray-300">
            Fill in the details below to add a new lead
          </p>
        </div>
        
        <div className="bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              {/* Name */}
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-blue-300">
                  <FiUser className="inline mr-2" />
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={lead.name}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-blue-300">
                  <FiPhone className="inline mr-2" />
                  Mobile Number
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    value={lead.mobile}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-300">
                  <FiMail className="inline mr-2" />
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={lead.email}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Property Details */}
              <div>
                <label htmlFor="requirement" className="block text-sm font-medium text-blue-300">
                  <FiHome className="inline mr-2" />
                  Requirement
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="requirement"
                    id="requirement"
                    value={lead.requirement}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-blue-300">
                  <FiHome className="inline mr-2" />
                  Property Type
                </label>
                <div className="mt-1">
                  <select
                    name="propertyType"
                    id="propertyType"
                    value={lead.propertyType}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white"
                  >
                    <option value="" className="bg-gray-800">Select property type</option>
                    <option value="Residential" className="bg-gray-800">Residential</option>
                    <option value="Commercial" className="bg-gray-800">Commercial</option>
                    <option value="Land" className="bg-gray-800">Land</option>
                    <option value="Industrial" className="bg-gray-800">Industrial</option>
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label htmlFor="budgetMin" className="block text-sm font-medium text-blue-300">
                  <FiDollarSign className="inline mr-2" />
                  Minimum Budget
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="budgetMin"
                    id="budgetMin"
                    value={lead.budgetMin}
                    onChange={handleChange}
                    className="py-3 pl-7 pr-4 block w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="budgetMax" className="block text-sm font-medium text-blue-300">
                  <FiDollarSign className="inline mr-2" />
                  Maximum Budget
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="budgetMax"
                    id="budgetMax"
                    value={lead.budgetMax}
                    onChange={handleChange}
                    className="py-3 pl-7 pr-4 block w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-blue-300">
                  <FiMapPin className="inline mr-2" />
                  Preferred Location
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={lead.location}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Follow-up and Source */}
              <div>
                <label htmlFor="followUpDate" className="block text-sm font-medium text-blue-300">
                  <FiCalendar className="inline mr-2" />
                  Follow-up Date
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="followUpDate"
                    id="followUpDate"
                    value={lead.followUpDate}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="source" className="block text-sm font-medium text-blue-300">
                  <FiGlobe className="inline mr-2" />
                  Lead Source
                </label>
                <div className="mt-1">
                  <select
                    name="source"
                    id="source"
                    value={lead.source}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white"
                  >
                    <option value="" className="bg-gray-800">Select source</option>
                    <option value="Website" className="bg-gray-800">Website</option>
                    <option value="Referral" className="bg-gray-800">Referral</option>
                    <option value="Walk-in" className="bg-gray-800">Walk-in</option>
                    <option value="Social Media" className="bg-gray-800">Social Media</option>
                    <option value="Advertisement" className="bg-gray-800">Advertisement</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="sm:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-blue-300">
                  <FiFileText className="inline mr-2" />
                  Additional Notes
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={lead.notes}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                <FiSave className="mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Lead'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Leads;