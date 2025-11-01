import React, { useEffect, useState, FormEvent } from 'react';

interface Item {
  id: number;
  name: string;
  description?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemDescription, setNewItemDescription] = useState<string>('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/items`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Item[] = await response.json();
      setItems(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching items:', err);
      setError(err.message || 'Failed to fetch items');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreateItem = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!newItemName.trim()) {
      setError('Item name cannot be empty.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItemName, description: newItemDescription }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setNewItemName('');
      setNewItemDescription('');
      fetchItems(); // Refresh the list
    } catch (err: any) {
      console.error('Error creating item:', err);
      setError(err.message || 'Failed to create item');
    }
  };

  const handleEditClick = (item: Item) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditDescription(item.description || '');
  };

  const handleUpdateItem = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!editingItem) return;
    if (!editName.trim()) {
      setError('Item name cannot be empty.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/items/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName, description: editDescription }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setEditingItem(null);
      fetchItems(); // Refresh the list
    } catch (err: any) {
      console.error('Error updating item:', err);
      setError(err.message || 'Failed to update item');
    }
  };

  const handleDeleteItem = async (id: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      fetchItems(); // Refresh the list
    } catch (err: any) {
      console.error('Error deleting item:', err);
      setError(err.message || 'Failed to delete item');
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Manage Items</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.15a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      )}

      <form onSubmit={handleCreateItem} className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h3 className="text-xl font-medium mb-3 text-gray-700">Add New Item</h3>
        <div className="mb-3">
          <label htmlFor="newItemName" className="block text-gray-700 text-sm font-bold mb-1">Name:</label>
          <input
            type="text"
            id="newItemName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newItemDescription" className="block text-gray-700 text-sm font-bold mb-1">Description (Optional):</label>
          <input
            type="text"
            id="newItemDescription"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Item
        </button>
      </form>

      <h3 className="text-xl font-medium mb-3 text-gray-700">Current Items</h3>
      {items.length === 0 ? (
        <p className="text-gray-600">No items found. Add some above!</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
              {editingItem?.id === item.id ? (
                <form onSubmit={handleUpdateItem} className="flex-grow flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description"
                  />
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex-grow">
                  <p className="text-lg font-medium text-gray-900">{item.name}</p>
                  {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                </div>
              )}

              {editingItem?.id !== item.id && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
