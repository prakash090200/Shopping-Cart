import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

const ProductList = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { cartItems, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProductData(data.products);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  const getItemQuantity = (productId) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (errorMessage) return <div className="error">Error: {errorMessage}</div>;

  return (
    <div className="product-list">
      {productData.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          itemQuantity={getItemQuantity(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList; 