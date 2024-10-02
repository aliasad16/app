import axios from 'axios';

// Base URL for JSONPlaceholder API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Fetch all users (GET)
export const fetchItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Add a new user (POST)
export const addItem = async (newItem) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, newItem);
    return response.data;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

// Delete a user (DELETE)
export const deleteItem = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

// Update a user (PUT)
export const updateItem = async (id, updatedItem) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, updatedItem);
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};
