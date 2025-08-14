import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiUpload,
  FiX,
  FiPlus,
  FiImage,
  FiVideo,
  FiCheckCircle,
  FiHome,
  FiDollarSign,
  FiMapPin,
  FiLayers,
  FiCheck,
  FiTrash2,
} from "react-icons/fi";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { propertyValidationSchema } from "../utils/validationSchemas/propertySchema";
import { useDataTableMutation } from "../services/tableApi";
import { toast } from "react-toastify";
import {
  usePropertyUpdateMutation,
  useSetPropertyMutation,
} from "../services/propertyApi";

const initialValues = {
  agent_email: "agent1@example.com",
  property_type: "",
  property_category: "",
  title: "",
  location: "",
  size_sqft: "",
  carpet_area: "",
  buildup_area: "",
  bhk: "",
  floor: "",
  total_floor: "",
  facing: "",
  furnishing: "",
  price: "",
  maintenance: "",
  expected_value: "",
  availability: "",
  builder: [],
  description: "",
  covered_parking: "",
  open_parking: "",
  bathroom: [],
  brokerage: "",
  images: [],
  video: "",
  facilities: [],
  property_age: "",
};

function PropertyListingForm() {
  const loction = useLocation();
  console.log(loction, "location");
  const navigate = useNavigate();
  const [dataTable] = useDataTableMutation();
  const [setProperty] = useSetPropertyMutation();
  const [propertyUpdate] = usePropertyUpdateMutation();

  const isPreview = location.state?.isPropertyPreview;
  const previewData = location.state?.propertyPreview;
  const editData = location.state?.propertyList;

  const [currentStep, setCurrentStep] = useState(1);
  const [imageFiles, setImageFiles] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyCategories, setPropertyCategories] = useState([]);
  const [facingOptions, setFacingOptions] = useState([]);
  const [furnishingOptions, setFurnishingOptions] = useState([]);
  const [parkingOptions, setParkingOptions] = useState([]);
  const [availabilityOptions, setAvailabilityOptions] = useState([]);
  const [brokerageOptions, setBrokerageOptions] = useState([]);
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [builder, setBuider] = useState([]);
  const [bathroomType, setBathroomType] = useState([]);
  const [isLoadingDropdowns, setIsLoadingDropdowns] = useState(true);

  const getFormInitialValues = () => {
    if (isPreview && previewData) {
      // Preview mode: use preview data, ensure all fields are populated
      const previewValues = { ...initialValues };
      Object.keys(previewData).forEach((key) => {
        if (previewData[key] !== undefined && previewData[key] !== null) {
          previewValues[key] = previewData[key];
        }
      });
      return previewValues;
    } else if (editData) {
      // Edit mode: use edit data, fallback to empty string for missing fields
      const editValues = { ...initialValues };
      Object.keys(editData).forEach((key) => {
        if (editData[key] !== undefined && editData[key] !== null) {
          editValues[key] = editData[key];
        }
      });
      return editValues;
    } else {
      // New property mode: use default initial values
      return initialValues;
    }
  };
  const [formInitialValues, setFormInitialValues] = useState(
    getFormInitialValues()
  );

  const getFieldProps = () => {
    if (isPreview) {
      return { disabled: true, readOnly: true };
    }
    return {};
  };

  const fieldProps = getFieldProps();

  useEffect(() => {
    // Update form initial values when preview/edit data changes
    const newInitialValues = getFormInitialValues();
    setFormInitialValues(newInitialValues);

    // Set initial image files
    if (isPreview && previewData?.images) {
      setImageFiles(
        Array.isArray(previewData.images) ? previewData.images : []
      );
    } else if (editData?.images) {
      setImageFiles(Array.isArray(editData.images) ? editData.images : []);
    } else {
      setImageFiles([]);
    }
  }, [isPreview, previewData, editData]);

  useEffect(() => {
    const fetchDropDownData = async () => {
      try {
        setIsLoadingDropdowns(true);
        const propertyRes = await dataTable({
          table_name: "PropertyType",
        }).unwrap();
        const propertyCatRes = await dataTable({
          table_name: "PropertyCategory",
        }).unwrap();
        const facingOptionsRes = await dataTable({
          table_name: "PropertyFacing",
        }).unwrap();
        const furnishingOptionsRes = await dataTable({
          table_name: "PropertyFurnishing",
        }).unwrap();
        const parkingOptionsRes = await dataTable({
          table_name: "ParkingType",
        }).unwrap();
        const availabilityOptionsRes = await dataTable({
          table_name: "PropertyAvailability",
        }).unwrap();

        const brokerageOptionsRes = await dataTable({
          table_name: "BrokerageOption",
        }).unwrap();
        const facilitiesListRes = await dataTable({
          table_name: "Facility",
        }).unwrap();
        const bathroomTypeRes = await dataTable({
          table_name: "BathroomType",
        }).unwrap();
        const builderRes = await dataTable({
          table_name: "Builder",
        }).unwrap();

        setPropertyTypes(propertyRes?.data || propertyRes || []);
        setPropertyCategories(propertyCatRes?.data || propertyCatRes || []);
        setFacingOptions(facingOptionsRes?.data || facingOptionsRes || []);
        setFurnishingOptions(
          furnishingOptionsRes?.data || furnishingOptionsRes || []
        );
        setParkingOptions(parkingOptionsRes?.data || parkingOptionsRes || []);
        setAvailabilityOptions(
          availabilityOptionsRes?.data || availabilityOptionsRes || []
        );
        setBrokerageOptions(
          brokerageOptionsRes?.data || brokerageOptionsRes || []
        );
        setFacilitiesList(facilitiesListRes?.data || facilitiesListRes || []);
        setBathroomType(bathroomTypeRes?.data || bathroomTypeRes || []);
        setBuider(builderRes?.data || builderRes || []);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        toast.error("Failed to load dropdown options", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        setPropertyTypes([
          {
            id: 4,
            name: "Commercial",
          },
          {
            id: 1,
            name: "Flat",
          },
          {
            id: 3,
            name: "Plot",
          },
          {
            id: 2,
            name: "Villa",
          },
        ]);
        setPropertyCategories([
          {
            id: 1,
            name: "Rent",
          },
          {
            id: 3,
            name: "Resale",
          },
          {
            id: 2,
            name: "Sale",
          },
        ]);
        setFacingOptions([
          {
            id: 1,
            name: "East",
          },
          {
            id: 2,
            name: "Eastwest",
          },
          {
            id: 3,
            name: "North",
          },
          {
            id: 4,
            name: "Northsouth",
          },
          {
            id: 5,
            name: "South",
          },
          {
            id: 6,
            name: "Southnorth",
          },
          {
            id: 7,
            name: "West",
          },
          {
            id: 8,
            name: "Westeast",
          },
        ]);
        setFurnishingOptions([
          {
            id: 1,
            name: "Furnished",
          },
          {
            id: 2,
            name: "Semi-Furnished",
          },
          {
            id: 3,
            name: "Unfurnished",
          },
        ]);
        setParkingOptions([
          {
            id: 8,
            name: "3+",
          },
          {
            id: 3,
            name: "Double",
          },
          {
            id: 1,
            name: "None",
          },
          {
            id: 2,
            name: "Single",
          },
          {
            id: 9,
            name: "Undisclosed",
          },
        ]);
        setAvailabilityOptions([
          {
            id: 1,
            name: "Available",
          },
          {
            id: 2,
            name: "Pending",
          },
          {
            id: 3,
            name: "Sold",
          },
        ]);
        setBrokerageOptions([
          {
            id: 1,
            name: "No",
          },
          {
            id: 2,
            name: "Yes",
          },
        ]);
        setFacilitiesList([
          {
            id: 10,
            name: "24x7 Security",
          },
          {
            id: 26,
            name: "ATM",
          },
          {
            id: 16,
            name: "CCTV",
          },
          {
            id: 13,
            name: "Children's Play Area",
          },
          {
            id: 6,
            name: "Clubhouse",
          },
          {
            id: 19,
            name: "Community Hall",
          },
          {
            id: 8,
            name: "Covered Parking",
          },
          {
            id: 23,
            name: "Fire Safety",
          },
          {
            id: 4,
            name: "Gym",
          },
          {
            id: 15,
            name: "Intercom",
          },
          {
            id: 17,
            name: "Jogging Track",
          },
          {
            id: 25,
            name: "Landscape Garden",
          },
          {
            id: 12,
            name: "Lift",
          },
          {
            id: 3,
            name: "Market",
          },
          {
            id: 2,
            name: "Metro",
          },
          {
            id: 9,
            name: "Open Parking",
          },
          {
            id: 11,
            name: "Park",
          },
          {
            id: 20,
            name: "Piped Gas",
          },
          {
            id: 7,
            name: "Power Backup",
          },
          {
            id: 14,
            name: "Rainwater Harvesting",
          },
          {
            id: 1,
            name: "School",
          },
          {
            id: 27,
            name: "Security",
          },
          {
            id: 21,
            name: "Shopping Center",
          },
          {
            id: 18,
            name: "Sports Facility",
          },
          {
            id: 5,
            name: "Swimming Pool",
          },
          {
            id: 24,
            name: "Visitor Parking",
          },
          {
            id: 22,
            name: "Wi‑Fi",
          },
        ]);
        setBathroomType([
          {
            id: 1,
            name: "1",
          },
          {
            id: 2,
            name: "2",
          },
          {
            id: 3,
            name: "3",
          },
          {
            id: 4,
            name: "4",
          },
          {
            id: 5,
            name: "5+",
          },
        ]);
        setBuider([
          {
            id: 1,
            name: "DLF Builder",
          },
          {
            id: 2,
            name: "Emaar",
          },
          {
            id: 3,
            name: "Godrej",
          },
          {
            id: 4,
            name: "M3M",
          },
        ]);
      } finally {
        setIsLoadingDropdowns(false);
      }
    };
    fetchDropDownData();
  }, [dataTable]);

  // Handle file input for Formik
  const handleImageChange = (e, setFieldValue) => {
    // Disable image upload in preview mode
    if (isPreview) return;

    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 12) {
      alert("Maximum 12 images allowed");
      return;
    }

    const urls = files.map((file) => URL.createObjectURL(file));
    setImageFiles((prev) => [...prev, ...urls]);
    setFieldValue("images", [...imageFiles, ...urls]);
  };

  const removeImage = (idx, setFieldValue) => {
    // Disable image removal in preview mode
    if (isPreview) return;

    const newFiles = imageFiles.filter((_, i) => i !== idx);
    setImageFiles(newFiles);
    setFieldValue("images", newFiles);
  };

  const toggleFacility = (facility, values, setFieldValue) => {
    // Disable facility toggle in preview mode
    if (isPreview) return;

    const facilities = values.facilities.includes(facility.name)
      ? values.facilities.filter((f) => f !== facility.name)
      : [...values.facilities, facility.name];
    setFieldValue("facilities", facilities);
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (isPreview) {
      console.log("Cannot submit in preview mode");
      return;
    }
    try {
      const payload = {
        client_id: 1,
        agent_email: values.agent_email,
        property_type: values.property_type,
        property_category: values.property_category,
        title: values.title,
        location: values.location,
        size_sqft: values.size_sqft,
        carpet_area: values.carpet_area,
        buildup_area: values.buildup_area,
        bhk: values.bhk,
        floor: values.floor,
        total_floor: values.total_floor,
        facing: values.facing,
        furnishing: values.furnishing,
        price: values.price,
        maintenance: values.maintenance,
        expected_value: values.expected_value,
        availability: values.availability,
        builder: values.builder,
        description: values.description,
        covered_parking: values.covered_parking,
        open_parking: values.open_parking,
        bathroom: values.bathroom,
        brokerage: values.brokerage,
        // images: values.images,
        video: values.video,
        facilities: values.facilities,
        property_age: values.property_age,
      };
      let res;
      if (editData) {
        // Update existing property
        res = await propertyUpdate({ ...payload, id: editData.id }).unwrap();
      } else {
        // Create new property
        res = await setProperty(payload).unwrap();
      }
      console.log("Property submitted successfully:", res);
      if (res?.message) {
        toast.success("Lead saved successfully!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        setImageFiles([]);
        resetForm();
        setTimeout(() => {
          navigate("/listinglist");
        }, 1000);
      }
    } catch (err) {
      alert("Failed to submit listing. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] rounded-2xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-12 relative w-full overflow-x-auto">
        {/* Show mode indicator */}
        {isPreview && (
          <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
            <p className="text-blue-800 font-medium">
              📋 Preview Mode - Data is read-only
            </p>
          </div>
        )}
        {editData && !isPreview && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800 font-medium">
              ✏️ Edit Mode - Updating existing property
            </p>
          </div>
        )}
        {/* Progress Steps */}
        <div className="flex justify-between min-w-0 w-full relative">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className="flex flex-col items-center z-10 min-w-[60px]"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step
                    ? "bg-indigo-600 text-white"
                    : "bg-white border-2 border-gray-300 text-gray-500"
                }`}
              >
                {currentStep > step ? <FiCheck size={18} /> : step}
              </div>
              <span
                className={`mt-2 text-xs sm:text-sm font-medium text-center ${
                  currentStep >= step ? "text-indigo-400" : "text-gray-500"
                }`}
                style={{ maxWidth: 80 }}
              >
                {step === 1
                  ? "Basic Details 1"
                  : step === 2
                  ? "Basic Details 2"
                  : step === 3
                  ? "Basic Details 3"
                  : step === 4
                  ? "Media"
                  : "Review"}
              </span>
            </div>
          ))}
          <div className="absolute top-5 left-0 right-0 h-1 border-gray-300 -z-1 w-full max-w-full">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{
                width: `${((currentStep - 1) / 4) * 100}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="bg-[#ffffff] rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <Formik
            initialValues={formInitialValues}
            validationSchema={isPreview ? undefined : propertyValidationSchema}
            onSubmit={handleSubmit}
            key={`${isPreview}-${!!previewData}-${!!editData}`}
            enableReinitialize
          >
            {({
              values,
              setFieldValue,
              isSubmitting,
              errors,
              touched,
              handleChange,
            }) => (
              <Form>
                {/* Step 1: Property Details */}
                {currentStep === 1 && (
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Property Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Agent Email */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Agent Email
                        </label>
                        <Field
                          type="email"
                          name="agent_email"
                          className="w-full px-4 py-3 border-gray-300 border placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-white rounded-lg text-gray-900"
                          placeholder="agent@example.com"
                          {...fieldProps}
                        />
                        {!isPreview && (
                          <ErrorMessage
                            name="agent_email"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Property Type */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiHome className="mr-2" /> Property Type
                        </label>
                        <Field
                          as="select"
                          name="property_type"
                          className="w-full px-4 py-3 border-gray-300 border  bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          {...fieldProps}
                        >
                          <option value="" className="bg-gray-800">
                            {isLoadingDropdowns
                              ? "Loading..."
                              : "Select property type"}
                          </option>
                          {propertyTypes.map((type) => (
                            <option key={type?.id} value={type?.name}>
                              {type?.name}
                            </option>
                          ))}
                        </Field>
                        {!isPreview && (
                          <ErrorMessage
                            name="property_type"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Property Category */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Property Category
                        </label>
                        <Field
                          as="select"
                          name="property_category"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          {...fieldProps}
                        >
                          <option value="" className="bg-gray-800">
                            {isLoadingDropdowns
                              ? "Loading..."
                              : "Select category"}
                          </option>
                          {propertyCategories.map((cat) => (
                            <option key={cat?.id} value={cat?.name}>
                              {cat?.name}
                            </option>
                          ))}
                        </Field>
                        {!isPreview && (
                          <ErrorMessage
                            name="property_category"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Title */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Title
                        </label>
                        <Field
                          type="text"
                          name="title"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          placeholder="Luxury 3BHK Apartment"
                          {...fieldProps}
                        />
                        {!isPreview && (
                          <ErrorMessage
                            name="title"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Location */}
                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiMapPin className="mr-2" /> Location
                        </label>
                        <Field
                          type="text"
                          name="location"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          placeholder="DLF Phase 5, Gurgaon"
                          {...fieldProps}
                        />
                        {!isPreview && (
                          <ErrorMessage
                            name="location"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Size Sqft */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Size (sqft)
                        </label>
                        <Field
                          type="number"
                          name="size_sqft"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          placeholder="1800"
                          {...fieldProps}
                        />
                        {!isPreview && (
                          <ErrorMessage
                            name="size_sqft"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Carpet Area */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Carpet Area
                        </label>
                        <Field
                          type="number"
                          name="carpet_area"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          placeholder="1600"
                          {...fieldProps}
                        />
                        {!isPreview && (
                          <ErrorMessage
                            name="carpet_area"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Buildup Area */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Buildup Area
                        </label>
                        <Field
                          type="number"
                          name="buildup_area"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          placeholder="1750"
                          {...fieldProps}
                        />
                        {!isPreview && (
                          <ErrorMessage
                            name="buildup_area"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* BHK */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          BHK
                        </label>
                        <Field
                          type="number"
                          name="bhk"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          placeholder="3"
                          {...fieldProps}
                        />
                        {!isPreview && (
                          <ErrorMessage
                            name="bhk"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                      >
                        Next: Add Details <FiPlus className="ml-2" />
                      </button>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Floor */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Floor
                        </label>
                        <Field
                          type="number"
                          name="floor"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          placeholder="5"
                          {...fieldProps}
                        />
                        {!isPreview && (
                          <ErrorMessage
                            name="floor"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Total Floor */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Total Floor
                        </label>
                        <Field
                          type="number"
                          name="total_floor"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          placeholder="20"
                          {...fieldProps}
                        />
                        {!isPreview && (
                          <ErrorMessage
                            name="total_floor"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Facing */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Facing
                        </label>
                        <Field
                          as="select"
                          name="facing"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          {...fieldProps}
                        >
                          <option value="" className="bg-gray-800">
                            {isLoadingDropdowns
                              ? "Loading..."
                              : "Select facing"}
                          </option>
                          {facingOptions.map((f) => (
                            <option key={f?.id} value={f?.name}>
                              {f?.name}
                            </option>
                          ))}
                        </Field>
                        {!isPreview && (
                          <ErrorMessage
                            name="facing"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Furnishing */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Furnishing
                        </label>
                        <Field
                          as="select"
                          name="furnishing"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          {...fieldProps}
                        >
                          <option value="" className="bg-gray-800">
                            {isLoadingDropdowns
                              ? "Loading..."
                              : "Select furnishing"}
                          </option>
                          {furnishingOptions.map((f) => (
                            <option key={f?.id} value={f?.name}>
                              {f?.name}
                            </option>
                          ))}
                        </Field>
                        {!isPreview && (
                          <ErrorMessage
                            name="furnishing"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Price */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiDollarSign className="mr-2" /> Price (INR)
                        </label>
                        <Field
                          type="number"
                          name="price"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          placeholder="15000000"
                          {...fieldProps}
                        />
                        {!isPreview && (
                          <ErrorMessage
                            name="price"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Maintenance */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Maintenance
                        </label>
                        <Field
                          type="number"
                          name="maintenance"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          placeholder="5000"
                          {...fieldProps}
                        />
                        {!isPreview && (
                          <ErrorMessage
                            name="maintenance"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Expected Value */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Expected Value
                        </label>
                        <Field
                          type="number"
                          name="expected_value"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          placeholder="15500000"
                          {...fieldProps}
                        />
                        {!isPreview && (
                          <ErrorMessage
                            name="expected_value"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Availability */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Availability
                        </label>
                        <Field
                          as="select"
                          name="availability"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          {...fieldProps}
                        >
                          <option value="" className="bg-gray-800">
                            {isLoadingDropdowns
                              ? "Loading..."
                              : "Select availability"}
                          </option>
                          {availabilityOptions.map((a) => (
                            <option key={a?.id} value={a?.name}>
                              {a?.name}
                            </option>
                          ))}
                        </Field>
                        {!isPreview && (
                          <ErrorMessage
                            name="availability"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Builder */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Builder
                        </label>
                        <Field
                          as="select"
                          name="builder"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          {...fieldProps}
                        >
                          <option value="" className="bg-gray-800">
                            {isLoadingDropdowns
                              ? "Loading..."
                              : "Select Builder"}
                          </option>
                          {builder.map((a) => (
                            <option key={a?.id} value={a?.name}>
                              {a?.name}
                            </option>
                          ))}
                        </Field>
                        {!isPreview && (
                          <ErrorMessage
                            name="builder"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border  text-gray-800 rounded-lg hover:border-gray-300 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                      >
                        Next: Add Details <FiPlus className="ml-2" />
                      </button>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Covered Parking */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Covered Parking
                        </label>
                        <Field
                          as="select"
                          name="covered_parking"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          {...fieldProps}
                        >
                          <option value="" className="bg-gray-800">
                            {isLoadingDropdowns
                              ? "Loading..."
                              : "Select Parking"}
                          </option>
                          {parkingOptions.map((p) => (
                            <option key={p?.id} value={p?.name}>
                              {p?.name}
                            </option>
                          ))}
                        </Field>
                        {!isPreview && (
                          <ErrorMessage
                            name="covered_parking"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Open Parking */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Open Parking
                        </label>
                        <Field
                          as="select"
                          name="open_parking"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          {...fieldProps}
                        >
                          <option value="" className="bg-gray-800">
                            {isLoadingDropdowns
                              ? "Loading..."
                              : "Select Parking"}
                          </option>
                          {parkingOptions.map((p) => (
                            <option key={p?.id} value={p?.name}>
                              {p?.name}
                            </option>
                          ))}
                        </Field>
                        {!isPreview && (
                          <ErrorMessage
                            name="open_parking"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Bathroom */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Bathroom
                        </label>
                        <Field
                          as="select"
                          name="bathroom"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          {...fieldProps}
                        >
                          <option value="" className="bg-gray-800">
                            {isLoadingDropdowns
                              ? "Loading..."
                              : "Select Bathroom type"}
                          </option>
                          {bathroomType.map((a) => (
                            <option key={a?.id} value={a?.name}>
                              {a?.name}
                            </option>
                          ))}
                        </Field>
                        {!isPreview && (
                          <ErrorMessage
                            name="bathroom"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>

                      {/* Brokerage */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Brokerage
                        </label>
                        <Field
                          as="select"
                          name="brokerage"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          {...fieldProps}
                        >
                          <option value="" className="bg-gray-800">
                            {isLoadingDropdowns
                              ? "Loading..."
                              : "Select Brokerage"}
                          </option>
                          {brokerageOptions.map((b) => (
                            <option key={b?.id} value={b?.name}>
                              {b?.name}
                            </option>
                          ))}
                        </Field>
                        {!isPreview && (
                          <ErrorMessage
                            name="brokerage"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Property Age */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Property Age (years)
                        </label>
                        <Field
                          type="number"
                          name="property_age"
                          className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                          placeholder="2"
                          {...fieldProps}
                        />
                        {!isPreview && (
                          <ErrorMessage
                            name="property_age"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                      {/* Facilities */}
                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-800">
                          Facilities
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {facilitiesList.map((facility) => (
                            <button
                              type="button"
                              key={facility.id}
                              onClick={() =>
                                toggleFacility(facility, values, setFieldValue)
                              }
                              className={`px-3 py-1 rounded-full text-sm flex items-center ${
                                values.facilities.includes(facility.name)
                                  ? "bg-indigo-600 text-white border border-indigo-600"
                                  : "bg-gray-100 text-gray-800 border border-gray-300"
                              }`}
                              disabled={isPreview}
                            >
                              {facility.name}
                              {values.facilities.includes(facility.name) && (
                                <FiCheckCircle className="ml-1" />
                              )}
                            </button>
                          ))}
                        </div>
                        {!isPreview && (
                          <ErrorMessage
                            name="facilities"
                            component="div"
                            className="text-red-400 text-xs"
                          />
                        )}
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border  text-gray-800 rounded-lg hover:border-gray-300 transition-colors"
                      >
                        Back
                      </button>
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

                {/* Step 4: Media Upload */}
                {currentStep === 4 && (
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-600 mb-6">
                      Media Upload
                    </h2>
                    {/* Images Upload */}
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-500 mb-3 flex items-center">
                        <FiImage className="mr-2" /> Property Images (Max 12)
                      </label>
                      <div className="border-2 border-dashed  rounded-lg p-6 text-center bg-gray-100">
                        <div className="flex flex-col items-center justify-center">
                          <FiUpload className="w-10 h-10 text-gray-400 mb-3" />
                          <p className="text-sm text-gray-400">
                            <span className="font-medium text-indigo-400">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG up to 5MB each
                          </p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, setFieldValue)}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="mt-4 inline-block px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:border-gray-300 cursor-pointer border "
                        >
                          Select Images
                        </label>
                        {/* <ErrorMessage
                          name="images"
                          component="div"
                          className="text-red-400 text-xs mt-2"
                        /> */}
                      </div>
                      {/* Image Previews */}
                      {imageFiles.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-sm font-medium text-gray-800 mb-3">
                            Selected Images ({imageFiles.length}/12)
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {imageFiles.map((img, idx) => (
                              <div key={idx} className="relative group">
                                <img
                                  src={img}
                                  alt="Preview"
                                  className="w-full h-32 object-cover rounded-lg border "
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeImage(idx, setFieldValue)
                                  }
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
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-800">
                        Video
                      </label>
                      <Field
                        type="text"
                        name="video"
                        className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                        placeholder="https://www.youtube.com/watch?v=example"
                        {...fieldProps}
                      />
                      {!isPreview && (
                        <ErrorMessage
                          name="video"
                          component="div"
                          className="text-red-400 text-xs"
                        />
                      )}
                    </div>
                    {/* Description */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-800">
                        Description
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        rows={4}
                        className="w-full px-4 py-3 border-gray-300 border bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400  rounded-lg text-gray-900"
                        placeholder="A spacious and luxurious 3BHK apartment with all modern amenities."
                        {...fieldProps}
                      />
                      {!isPreview && (
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-red-400 text-xs"
                        />
                      )}
                    </div>
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-gray-500 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
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
                {currentStep === 5 && (
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Review Your Listing
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Property Details Summary */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-700">
                          Property Details
                        </h3>
                        <div className="space-y-2 text-gray-200 text-sm">
                          <div>
                            <span className="text-gray-400">Agent Email: </span>
                            {values.agent_email}
                          </div>
                          <div>
                            <span className="text-gray-400">Type: </span>
                            {values.property_type}
                          </div>
                          <div>
                            <span className="text-gray-400">Category: </span>
                            {values.property_category}
                          </div>
                          <div>
                            <span className="text-gray-400">Title: </span>
                            {values.title}
                          </div>
                          <div>
                            <span className="text-gray-400">Location: </span>
                            {values.location}
                          </div>
                          <div>
                            <span className="text-gray-400">Size: </span>
                            {values.size_sqft} sqft
                          </div>
                          <div>
                            <span className="text-gray-400">Carpet Area: </span>
                            {values.carpet_area}
                          </div>
                          <div>
                            <span className="text-gray-400">
                              Buildup Area:{" "}
                            </span>
                            {values.buildup_area}
                          </div>
                          <div>
                            <span className="text-gray-400">BHK: </span>
                            {values.bhk}
                          </div>
                          <div>
                            <span className="text-gray-400">Floor: </span>
                            {values.floor}
                          </div>
                          <div>
                            <span className="text-gray-400">Total Floor: </span>
                            {values.total_floor}
                          </div>
                          <div>
                            <span className="text-gray-400">Facing: </span>
                            {values.facing}
                          </div>
                          <div>
                            <span className="text-gray-400">Furnishing: </span>
                            {values.furnishing}
                          </div>
                          <div>
                            <span className="text-gray-400">Price: </span>₹
                            {values.price}
                          </div>
                          <div>
                            <span className="text-gray-400">Maintenance: </span>
                            ₹{values.maintenance}
                          </div>
                          <div>
                            <span className="text-gray-400">
                              Expected Value:{" "}
                            </span>
                            ₹{values.expected_value}
                          </div>
                          <div>
                            <span className="text-gray-400">
                              Availability:{" "}
                            </span>
                            {values.availability}
                          </div>
                          <div>
                            <span className="text-gray-400">Builder: </span>
                            {values.builder}
                          </div>
                          <div>
                            <span className="text-gray-400">Description: </span>
                            {values.description}
                          </div>
                          <div>
                            <span className="text-gray-400">
                              Covered Parking:{" "}
                            </span>
                            {values.covered_parking}
                          </div>
                          <div>
                            <span className="text-gray-400">
                              Open Parking:{" "}
                            </span>
                            {values.open_parking}
                          </div>
                          <div>
                            <span className="text-gray-400">Bathroom: </span>
                            {values.bathroom}
                          </div>
                          <div>
                            <span className="text-gray-400">Brokerage: </span>
                            {values.brokerage}
                          </div>
                          <div>
                            <span className="text-gray-400">
                              Property Age:{" "}
                            </span>
                            {values.property_age}
                          </div>
                        </div>
                      </div>
                      {/* Facilities & Media Summary */}
                      <div>
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-700">
                            Facilities
                          </h3>
                          {values.facilities.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {values.facilities.map((facility) => (
                                <span
                                  key={facility}
                                  className="px-3 py-1 border-gray-300 text-indigo-300 rounded-full text-sm flex items-center border "
                                >
                                  <FiCheck className="mr-1" /> {facility}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500">
                              No facilities selected
                            </p>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-700">
                            Media
                          </h3>
                          <div className="mb-4">
                            <p className="text-sm text-gray-400 mb-2">
                              Images ({imageFiles.length})
                            </p>
                            {imageFiles.length > 0 ? (
                              <div className="grid grid-cols-3 gap-2">
                                {imageFiles.slice(0, 3).map((img, idx) => (
                                  <img
                                    key={idx}
                                    src={img}
                                    alt="Preview"
                                    className="w-full h-20 object-cover rounded border "
                                  />
                                ))}
                                {imageFiles.length > 3 && (
                                  <div className="border-gray-300 rounded border  flex items-center justify-center text-xs text-gray-400">
                                    +{imageFiles.length - 3} more
                                  </div>
                                )}
                              </div>
                            ) : (
                              <p className="text-gray-500">No images added</p>
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-2">Video</p>
                            {values.video ? (
                              <div className="flex items-center text-indigo-400">
                                <FiVideo className="mr-2" />
                                <span className="text-gray-800">
                                  {values.video}
                                </span>
                              </div>
                            ) : (
                              <p className="text-gray-500">
                                No video Link Added
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border  text-gray-800 rounded-lg hover:border-gray-300 transition-colors"
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
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          "Submit Listing"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default PropertyListingForm;
