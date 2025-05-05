import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  deleteFromCart: (product: Product) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const calculateDiscountedPrice = (price: number, discountPercentage: number): number => {
    return price - (price * (discountPercentage / 100));
  };

  const addToCart = (product: Product): void => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product: Product): void => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem?.quantity === 1) {
        return prevItems.filter(item => item.id !== product.id);
      }
      return prevItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const deleteFromCart = (product: Product): void => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== product.id));
  };

  const clearCart = (): void => {
    setCartItems([]);
  };

  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = calculateDiscountedPrice(item.price, item.discountPercentage);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const getCartItemsCount = (): number => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const cartContextValue: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}; 