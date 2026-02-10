import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  let location = useLocation();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [previw, SetPreview] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.slug === product.slug,
      );
      if (location.pathname !== "/cart") {
        SetPreview(true);
        setTimeout(() => {
          SetPreview(false);
        }, 3000);
      }
      if (existingIndex !== -1) {
        const newCart = [...prevCart];

        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + (product.quantity || 1),
        };
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  // Usiamo lo slug per rimuovere
  const removeFromCart = (slug) => {
    if (location.pathname !== "/cart") {
      SetPreview(true);
      setTimeout(() => {
        SetPreview(false);
      }, 2000);
    }
    setCart((prevCart) => prevCart.filter((item) => item.slug !== slug));
  };

  // Usiamo lo slug per aggiornare la quantità
  const updateQuantity = (slug, quantity) => {
    if (location.pathname !== "/cart") {
      SetPreview(true);
      setTimeout(() => {
        SetPreview(false);
      }, 2000);
    }
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
