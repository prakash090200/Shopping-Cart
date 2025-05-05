import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, onRemoveFromCart, itemQuantity }) => {
  const calculateDiscountedPrice = (price, discountPercentage) => {
    return price - (price * (discountPercentage / 100));
  };

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <div className="price-section">
        <span className="original-price">${product.price}</span>
        <span className="discounted-price">
          ${calculateDiscountedPrice(product.price, product.discountPercentage).toFixed(2)}
        </span>
      </div>
      <div className="cart-controls">
        {itemQuantity === 0 ? (
          <button 
            className="add-to-cart"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        ) : (
          <div className="quantity-controls">
            <button onClick={() => onRemoveFromCart(product)}>-</button>
            <span>{itemQuantity}</span>
            <button onClick={() => onAddToCart(product)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 