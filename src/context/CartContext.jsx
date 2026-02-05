import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    
    // Caricamento iniziale
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("aeterna_cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Sincronizzazione LocalStorage
    useEffect(() => {
        localStorage.setItem("aeterna_cart", JSON.stringify(cart));
    }, [cart]);

    // --- AGGIUNGI ---
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
           
            return [...prevCart, { 
                id: product.id,
                name: product.name, 
                price: product.price, 
                url_image: product.url_image, 
                slug: product.slug,
                quantity: 1 
            }];
        });
    };

    // --- AGGIORNA QUANTITÀ (+ e -) ---
    const updateQuantity = (productId, newQuantity) => {
        setCart((prevCart) => {
            if (newQuantity <= 0) {
                return prevCart.filter((item) => item.id !== productId);
            }
            return prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    // --- RIMUOVI ---
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    // --- SVUOTA ---
    const clearCart = () => setCart([]);

    // --- TOTALE PEZZI ---
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            updateQuantity, 
            removeFromCart, 
            clearCart, 
            totalItems 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart deve essere usato all'interno di un CartProvider");
    return context;
};