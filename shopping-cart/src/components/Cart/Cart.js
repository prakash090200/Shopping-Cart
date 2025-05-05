import React from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from '../CartItem/CartItem';
import './Cart.css';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, deleteFromCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return <div className="empty-cart">Your cart is empty</div>;
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            onDeleteFromCart={deleteFromCart}
          />
        ))}
      </div>
      <div className="cart-total">
        <h3>Total: ${getCartTotal().toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart; 