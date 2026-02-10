import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [previw, SetPreview] = useState(false);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    SetPreview(true);
    const timer = setTimeout(() => {
      SetPreview(false);
    }, 2000);
    setCart((prevCart) => {
      if (!product) return prevCart;
      // Usiamo lo slug come identificatore principale per il frontend
      const existingIndex = prevCart.findIndex(
        (item) => item.slug === product.slug,
      );

      if (existingIndex !== -1) {
        const newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + 1,
        };
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Usiamo lo slug per rimuovere
  const removeFromCart = (slug) => {
    setCart((prevCart) => prevCart.filter((item) => item.slug !== slug));
  };

  // Usiamo lo slug per aggiornare la quantità
  const updateQuantity = (slug, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.slug === slug ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        previw,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
