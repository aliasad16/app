import React, { useState, useEffect } from 'react';
import { fetchItems, addItem, updateItem, deleteItem } from '../services/Api';  // Correct imports

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ id: '', name: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Fetch all items (users) from JSONPlaceholder API
  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItems(); // Use fetchItems
      setItems(data);
    };
    loadItems();
  }, []);

  // Add a new item
  const handleAddItem = async () => {
    if (!newItem.name || !newItem.email) return;

    try {
      const addedItem = await addItem(newItem);  // Use addItem
      setItems([...items, addedItem]);
      setNewItem({ id: '', name: '', email: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Delete an item
  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);  // Use deleteItem
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Enable edit mode for an item
  const handleEditItem = (item) => {
    setEditMode(true);
    setCurrentItem(item);
    setNewItem({ name: item.name, email: item.email });
  };

  // Update the current item
  const handleUpdateItem = async () => {
    try {
      const updatedItem = await updateItem(currentItem.id, newItem);  // Use updateItem
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
      <h1 className="text-4xl font-bold mb-6">Dashboard </h1>
      
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Item' : 'Add Data'}</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          value={newItem.email}
          onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
        />
        {editMode ? (
          <button
            onClick={handleUpdateItem}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            Update Data
          </button>
        ) : (
          <button
            onClick={handleAddItem}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        )}
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Item List</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">No items to display.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-gray-600">{item.email}</p>
              </div>
              <div className="space-x-2">
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
    </div>
  );
};

export default Dashboard;
