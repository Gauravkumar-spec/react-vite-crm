import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/listings';

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/${id}`)
      .then(res => {
        setListing(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!listing) return <div>Listing not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <p>{listing.location}</p>
      <p>{listing.propertyType} - {listing.listingType}</p>
      <p>Bedrooms: {listing.bedrooms}</p>
      <p>Bathrooms: {listing.bathrooms}</p>
      <p>Area: {listing.area} sqft</p>
      <p>Price: ₹{listing.price}</p>
      {/* Show more fields or images as you want */}
    </div>
  );
}
