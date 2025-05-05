import React from 'react';
import { Product } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (product: Product) => void;
  itemQuantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onRemoveFromCart, itemQuantity }) => {
  const calculateDiscountedPrice = (price: number, discountPercentage: number): number => {
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