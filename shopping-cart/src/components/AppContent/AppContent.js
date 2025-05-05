import React, { useState } from 'react';
import ProductList from '../ProductList/ProductList';
import Cart from '../Cart/Cart';
import { useCart } from '../../context/CartContext';

const AppContent = () => {
  const [showCart, setShowCart] = useState(false);
  const { getCartItemsCount } = useCart();

  return (
    <div className="app">
      <header>
        <h1>Shopping Cart</h1>
        <button 
          className="cart-toggle"
          onClick={() => setShowCart(!showCart)}
        >
          {showCart ? 'View Products' : 'View Cart'} ({getCartItemsCount()})
        </button>
      </header>
      <main>
        {showCart ? <Cart /> : <ProductList />}
      </main>
    </div>
  );
};

export default AppContent; 