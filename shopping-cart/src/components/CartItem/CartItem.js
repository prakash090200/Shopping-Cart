import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onAddToCart, onRemoveFromCart, onDeleteFromCart }) => {
  const calculateDiscountedPrice = (price, discountPercentage) => {
    return (price - (price * (discountPercentage / 100))).toFixed(2);
  };

  const handleRemove = () => {
    if (item.quantity === 1) {
      onDeleteFromCart(item);
    } else {
      onRemoveFromCart(item);
    }
  };

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="description">{item.description}</p>
        <div className="price-details">
          <span className="original-price">${item.price}</span>
          <span className="discounted-price">
            ${calculateDiscountedPrice(item.price, item.discountPercentage)}
          </span>
        </div>
        <div className="quantity-controls">
          <button 
            className="quantity-button"
            onClick={handleRemove}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="quantity-button"
            onClick={() => onAddToCart(item)}
            aria-label="Increase quantity"
          >
            +
          </button>
          <button 
            className="delete-button"
            onClick={() => onDeleteFromCart(item)}
            aria-label="Delete item"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem; 