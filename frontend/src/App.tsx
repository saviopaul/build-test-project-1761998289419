import React from 'react';
import ItemList from './components/ItemList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow p-4 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Test Project - Item Management</h1>
      </header>
      <main className="container mx-auto">
        <ItemList />
      </main>
    </div>
  );
}

export default App;
