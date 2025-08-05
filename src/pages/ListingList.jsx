import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSearch, FiPlus, FiEdit2, FiEye, FiTrash2, FiFilter,
  FiChevronLeft, FiChevronRight, FiMapPin, FiHome, FiStar
} from 'react-icons/fi';
import { FaBed, FaBath, FaSwimmingPool, FaDumbbell } from 'react-icons/fa';
import { MdSecurity, MdBalcony, MdPets, MdGrass } from 'react-icons/md';
import { GiHomeGarage, GiSmart } from 'react-icons/gi';
import { BiArea } from 'react-icons/bi';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/listings';

function ListingList() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    propertyType: '',
    listingType: '',
    bedrooms: '',
    priceMin: '',
    priceMax: '',
    location: ''
  });

  // Fetch listings with pagination and filters
  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        search: searchTerm,
        ...filters
      });
      
      const response = await axios.get(`${API_BASE_URL}?${params.toString()}`);
      setListings(response.data.listings);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Failed to load listings. Please try again later.');
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [currentPage, searchTerm, filters]);

  // Create - Navigate to new listing form
  const handleCreate = () => {
    navigate('/listings/new');
  };

  // Read - Navigate to listing details
  const handleView = (id) => {
    navigate(`/listings/${id}`);
  };

  // Update - Navigate to edit form
  const handleEdit = (id) => {
    navigate(`/listings/edit/${id}`);
  };

  // Delete - Remove a listing
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setListings(listings.filter(listing => listing._id !== id));
      // Show success message or refresh data if needed
    } catch (err) {
      alert('Failed to delete listing. Please try again.');
      console.error('Error deleting listing:', err);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      propertyType: '',
      listingType: '',
      bedrooms: '',
      priceMin: '',
      priceMax: '',
      location: ''
    });
    setSearchTerm('');
  };

  // Render feature icons
  const renderFeatureIcon = (feature) => {
    const icons = {
      'Swimming Pool': <FaSwimmingPool className="text-blue-500" />,
      'Gym': <FaDumbbell className="text-red-500" />,
      'Parking': <GiHomeGarage className="text-gray-500" />,
      'Security': <MdSecurity className="text-green-500" />,
      'Garden': <MdGrass className="text-emerald-500" />,
      'Balcony': <MdBalcony className="text-amber-500" />,
      'Furnished': <FiHome className="text-purple-500" />,
      'Pet Friendly': <MdPets className="text-pink-500" />,
      'Smart Home': <GiSmart className="text-indigo-500" />,
      'View': <FiStar className="text-yellow-500" />
    };
    return icons[feature] || <FiStar className="text-gray-400" />;
  };

  // Format price with currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Property Listings</h1>
        <button 
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center transition-colors"
        >
          <FiPlus className="mr-2" /> Add Listing
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              className="pl-10 pr-4 py-2 w-full border rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border rounded bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <FiFilter className="mr-2" /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Property Type</label>
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded bg-gray-700"
              >
                <option value="">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="condo">Condo</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Listing Type</label>
              <select
                name="listingType"
                value={filters.listingType}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded bg-gray-700"
              >
                <option value="">All Listings</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Bedrooms</label>
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded bg-gray-700"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Min Price</label>
              <input
                type="number"
                name="priceMin"
                placeholder="Min"
                value={filters.priceMin}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded bg-gray-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Max Price</label>
              <input
                type="number"
                name="priceMax"
                placeholder="Max"
                value={filters.priceMax}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded bg-gray-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                placeholder="City or Area"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded bg-gray-700"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Listings Table */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        {listings.length === 0 ? (
          <div className="text-center py-8">
            No listings found. Try adjusting your search or filters.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">Property</th>
                <th className="px-6 py-3 text-left">Details</th>
                <th className="px-6 py-3 text-left">Features</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {listings.map(listing => (
                <tr key={listing._id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {listing.images?.[0] && (
                        <img 
                          src={`http://localhost:5000/uploads/${listing.images[0]}`} 
                          className="w-16 h-16 rounded object-cover mr-4"
                          alt="Property"
                        />
                      )}
                      <div>
                        <div className="font-medium">{listing.title}</div>
                        <div className="text-sm text-gray-400 flex items-center">
                          <FiMapPin className="mr-1" /> {listing.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="capitalize">{listing.propertyType}</div>
                      <div className="capitalize text-gray-400">{listing.listingType}</div>
                      <div className="flex items-center mt-2 space-x-4 text-gray-400">
                        <span className="flex items-center">
                          <FaBed className="mr-1" /> {listing.bedrooms}
                        </span>
                        <span className="flex items-center">
                          <FaBath className="mr-1" /> {listing.bathrooms}
                        </span>
                        <span className="flex items-center">
                          <BiArea className="mr-1" /> {listing.area} sqft
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {listing.features?.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center text-xs bg-gray-600 rounded-full px-2 py-1">
                          {renderFeatureIcon(feature)}
                          <span className="ml-1">{feature}</span>
                        </div>
                      ))}
                      {listing.features?.length > 3 && (
                        <div className="text-xs bg-gray-500 rounded-full px-2 py-1">
                          +{listing.features.length - 3} more
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {formatPrice(listing.price)}
                    {listing.listingType === 'rent' && <span className="text-gray-400 text-sm"> /mo</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleView(listing._id)}
                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                        title="View"
                      >
                        <FiEye />
                      </button>
                      <button 
                        onClick={() => handleEdit(listing._id)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => handleDelete(listing._id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {listings.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-1 border rounded disabled:opacity-50 bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <FiChevronLeft className="mr-1" /> Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages} | {listings.length} properties
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-1 border rounded disabled:opacity-50 bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            Next <FiChevronRight className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ListingList;