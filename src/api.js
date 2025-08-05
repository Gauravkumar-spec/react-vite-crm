import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend base URL
});

export const getListings = () => api.get('/listings');
export const addListing = (formData) => api.post('/listings', formData);

export default api;
