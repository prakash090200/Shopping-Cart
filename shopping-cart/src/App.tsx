import React from 'react';
import { CartProvider } from './context/CartContext';
import AppContent from './components/AppContent/AppContent';
import './App.css';

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="App">
        <AppContent />
      </div>
    </CartProvider>
  );
};

export default App; 