import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiHome,
  FiDollarSign,
  FiMapPin,
  FiCalendar,
  FiGlobe,
  FiFileText,
  FiSave,
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { leadValidationSchema } from "../utils/validationSchemas/leadSchema";
import { useSetLeadMutation } from "../services/leadApi";
import { useNavigate } from "react-router-dom";
import { useDataTableMutation } from "../services/tableApi";

const Leads = () => {
  const [setLead] = useSetLeadMutation();
  const [dataTable] = useDataTableMutation();
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState([]);
  const [leadSource, setLeadSource] = useState([]);
  const [isLoadingDropdowns, setIsLoadingDropdowns] = useState(true);

  const initialValues = {
    name: "",
    mobile: "",
    email: "",
    requirement: "",
    budgetMin: "",
    budgetMax: "",
    location: "",
    propertyType: "",
    followUpDate: "",
    source: "",
    notes: "",
  };

  useEffect(() => {
    const fetchDropDownData = async () => {
      try {
        setIsLoadingDropdowns(true);
        const propertyRes = await dataTable({
          table_name: "PropertyType",
        }).unwrap();
        const leadSourceRes = await dataTable({
          table_name: "LeadSource",
        }).unwrap();
        setPropertyType(propertyRes?.data || propertyRes || []);
        setLeadSource(leadSourceRes?.data || leadSourceRes || []);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        toast.error("Failed to load dropdown options", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });

        setPropertyType([
          { id: 1, name: "Residential" },
          { id: 2, name: "Commercial" },
          { id: 3, name: "Land" },
          { id: 4, name: "Industrial" },
        ]);

        setLeadSource([
          { id: 1, name: "Website" },
          { id: 2, name: "Referral" },
          { id: 3, name: "Walk-in" },
          { id: 4, name: "Social Media" },
          { id: 5, name: "Advertisement" },
        ]);
      } finally {
        setIsLoadingDropdowns(false);
      }
    };
    fetchDropDownData();
  }, [dataTable]);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const payload = {
        name: values.name,
        mobile: values.mobile,
        email: values.email,
        requirement: values.requirement,
        budget_min: values.budgetMin,
        budget_max: values.budgetMax,
        preferred_location: values.location,
        property_type: values.propertyType,
        follow_up_date: values.followUpDate,
        source: values.source,
        notes: values.notes,
        agent_email: values.agentEmail || "appu@example.com", // optional
        client_id: 1,
      };

      const res = await setLead(payload).unwrap();
      console.log(res, "formsubmit");
      if (res?.originalStatus == 201) {
        toast.success("Lead saved successfully!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        resetForm();
        setTimeout(() => {
          navigate("/leadlist");
        }, 300);
      }
    } catch (error) {
      console.error("Error saving lead:", error);
      toast.error("Failed to save lead. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setSubmitting(false); // Ends Formik submitting state
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-400">
            New Lead Capture
          </h2>
          <p className="mt-2 text-lg text-gray-300">
            Fill in the details below to add a new lead
          </p>
        </div>

        <div className="bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8 border border-gray-700">
          <Formik
            initialValues={initialValues}
            validationSchema={leadValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-blue-300"
                    >
                      <FiUser className="inline mr-2" />
                      Full Name
                    </label>
                    <div className="mt-1">
                      <Field
                        type="text"
                        name="name"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  {/* Contact Information */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-blue-300"
                    >
                      <FiPhone className="inline mr-2" />
                      Mobile Number
                    </label>
                    <div className="mt-1">
                      <Field
                        type="tel"
                        name="mobile"
                        id="mobile"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                      />
                    </div>
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-blue-300"
                    >
                      <FiMail className="inline mr-2" />
                      Email Address
                    </label>
                    <div className="mt-1">
                      <Field
                        type="email"
                        name="email"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  {/* Property Details */}
                  <div>
                    <label
                      htmlFor="requirement"
                      className="block text-sm font-medium text-blue-300"
                    >
                      <FiHome className="inline mr-2" />
                      Requirement
                    </label>
                    <div className="mt-1">
                      <Field
                        type="text"
                        name="requirement"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                      />
                    </div>
                    <ErrorMessage
                      name="requirement"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="propertyType"
                      className="block text-sm font-medium text-blue-300"
                    >
                      <FiHome className="inline mr-2" />
                      Property Type
                    </label>
                    <div className="mt-1">
                      <Field
                        as="select"
                        name="propertyType"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white"
                      >
                        <option value="" className="bg-gray-800">
                          {isLoadingDropdowns ? "Loading..." : "Select property type"}
                        </option>
                        {propertyType.map((type) => (
                          <option 
                            key={type?.id} 
                            value={type?.name} 
                            className="bg-gray-800"
                          >
                            {type?.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <ErrorMessage
                      name="propertyType"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label
                      htmlFor="budgetMin"
                      className="block text-sm font-medium text-blue-300"
                    >
                      <FiDollarSign className="inline mr-2" />
                      Minimum Budget
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 sm:text-sm">$</span>
                      </div>
                      <Field
                        type="number"
                        name="budgetMin"
                        // id="budgetMin"
                        // value={lead.budgetMin}
                        // onChange={handleChange}
                        className="py-3 pl-7 pr-4 block w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        placeholder="0.00"
                      />
                    </div>
                    <ErrorMessage
                      name="budgetMin"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="budgetMax"
                      className="block text-sm font-medium text-blue-300"
                    >
                      <FiDollarSign className="inline mr-2" />
                      Maximum Budget
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 sm:text-sm">$</span>
                      </div>
                      <Field
                        type="number"
                        name="budgetMax"
                        // id="budgetMax"
                        // value={lead.budgetMax}
                        // onChange={handleChange}
                        className="py-3 pl-7 pr-4 block w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        placeholder="0.00"
                      />
                    </div>
                    <ErrorMessage
                      name="budgetMax"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-blue-300"
                    >
                      <FiMapPin className="inline mr-2" />
                      Preferred Location
                    </label>
                    <div className="mt-1">
                      <Field
                        type="text"
                        name="location"
                        // id="location"
                        // value={lead.location}
                        // onChange={handleChange}
                        className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                      />
                    </div>
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  {/* Follow-up and Source */}
                  <div>
                    <label
                      htmlFor="followUpDate"
                      className="block text-sm font-medium text-blue-300"
                    >
                      <FiCalendar className="inline mr-2" />
                      Follow-up Date
                    </label>
                    <div className="mt-1">
                      <Field
                        type="date"
                        name="followUpDate"
                        // id="followUpDate"
                        // value={lead.followUpDate}
                        // onChange={handleChange}
                        className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white"
                      />
                    </div>
                    <ErrorMessage
                      name="followUpDate"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="source"
                      className="block text-sm font-medium text-blue-300"
                    >
                      <FiGlobe className="inline mr-2" />
                      Lead Source
                    </label>
                    <div className="mt-1">
                      <Field
                        as="select"
                        name="source"
                        disabled={isLoadingDropdowns}
                        className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white"
                      >
                        <option value="" className="bg-gray-800">
                          {isLoadingDropdowns ? "Loading..." : "Select source"}
                        </option>
                        {leadSource.map((source) => (
                          <option 
                            key={source?.id} 
                            value={source?.name} 
                            className="bg-gray-800"
                          >
                            {source?.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <ErrorMessage
                      name="source"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium text-blue-300"
                    >
                      <FiFileText className="inline mr-2" />
                      Additional Notes
                    </label>
                    <div className="mt-1">
                      <Field
                        as="textarea"
                        // id="notes"
                        name="notes"
                        rows={4}
                        // value={lead.notes}
                        // onChange={handleChange}
                        className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
                      />
                    </div>
                    <ErrorMessage
                      name="notes"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    <FiSave className="mr-2" />
                    {isSubmitting ? "Saving..." : "Save Lead"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Leads;
