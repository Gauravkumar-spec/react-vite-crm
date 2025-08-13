import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/listings';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    propertyType: '',
    listingType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    price: ''
    // Add other fields as needed
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/${id}`)
      .then(res => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/${id}`, formData);
      alert('Listing updated!');
      navigate('/listings');  // Go back to listings page after update
    } catch (error) {
      alert('Failed to update listing.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <label>Title</label>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />
      <label>Location</label>
      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />
      {/* Add other inputs similarly */}
      <label>Price</label>
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />

      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Update Listing
      </button>
    </form>
  );
}
