import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inizializzazione dallo storage
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('myCart');
    return localData ? JSON.parse(localData) : [];
  });

  // Sincronizzazione automatica con LocalStorage
  useEffect(() => {
    localStorage.setItem('myCart', JSON.stringify(cart));
  }, [cart]);

  // FUNZIONE: Aggiungi al carrello
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // FUNZIONE: Rimuovi singola riga
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // FUNZIONE: Svuota tutto
  const clearCart = () => setCart([]);

  // Calcolo totali derivati (memoizzati automaticamente ad ogni render)
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizzato per usare il carrello velocemente
export const useCart = () => useContext(CartContext);
