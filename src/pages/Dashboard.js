import React, { useState, useEffect } from 'react';
import { fetchItems, addItem, updateItem, deleteItem } from '../services/Api'; 

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ id: '', name: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch all items 
  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      const data = await fetchItems(); 
      setItems(data);
      setLoading(false);
    };
    loadItems();
  }, []);

  // Validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Add a new item
  const handleAddItem = async () => {
    if (!newItem.name || !validateEmail(newItem.email)) {
      setErrorMessage('Please provide a valid name and email.');
      setTimeout(() => setErrorMessage(''), 3000); 
      return;
    }

    try {
      const addedItem = await addItem(newItem); 
      setItems([...items, addedItem]);
      setNewItem({ id: '', name: '', email: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Delete an item 
  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id); 
        setItems(items.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

// Enable edit mode 
const handleEditItem = (item) => {
  setEditMode(true);
  setCurrentItem(item);
  setNewItem({ name: item.name, email: item.email });

  
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
};

  // Update the current item
  const handleUpdateItem = async () => {
    try {
      const updatedItem = await updateItem(currentItem.id, newItem); 
      setItems(
        items.map((item) =>
          item.id === currentItem.id ? updatedItem : item
        )
      );
      setEditMode(false);
      setNewItem({ id: '', name: '', email: '' });
      setCurrentItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-500 text-white py-2 px-4 mb-4 rounded-md">
          {errorMessage}
        </div>
      )}

      {/* Form for adding or updating items */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Item' : 'Add Data'}</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
          value={newItem.email}
          onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
        />
        {editMode ? (
          <button
            onClick={handleUpdateItem}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Update Data
          </button>
        ) : (
          <button
            onClick={handleAddItem}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Submit
          </button>
        )}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center text-gray-500">Loading items...</div>
      ) : (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Item List</h2>
          {items.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>No items to display.</p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                onClick={() => setEditMode(false)}
              >
                Add New Item
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <p className="font-bold text-lg">{item.name}</p>
                <p className="text-gray-600">{item.email}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
