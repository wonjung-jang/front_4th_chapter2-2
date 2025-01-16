// useCart.ts
import { useState } from 'react';
import { updateCartItemQuantity } from '../../../pages/cart/lib/cart.ts';
import { ICartItem, IProduct } from '../../../shared/types';

export const useCart = () => {
  const [cart, setCart] = useState<ICartItem[]>([]);

  const getRemainingStock = (product: IProduct) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const addToCart = (product: IProduct) => {
    const remainingStock = getRemainingStock(product);
    if (remainingStock <= 0) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item,
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId),
    );
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) =>
      updateCartItemQuantity(prevCart, productId, newQuantity),
    );
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
};