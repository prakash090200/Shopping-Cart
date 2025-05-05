import React from 'react';
import { CartProvider } from './context/CartContext';
import AppContent from './components/AppContent/AppContent';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <AppContent />
      </div>
    </CartProvider>
  );
}

export default App;
