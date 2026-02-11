import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
    const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const navigate = useNavigate();

    const backendUrl = "http://localhost:3001";
    const imageUrl = `${backendUrl}/images/${product.url_image}`;

    const cartItem = cart.find(item => item.slug === product.slug);
    const isAdded = !!cartItem;

    const favorite = isInWishlist(product.slug);

    function handleWishlist(e) {
        e.stopPropagation();
        if (favorite) {
            removeFromWishlist(product.slug);
        } else {
            addToWishlist(product);
        }
    }

    return (
        <div className="product-card" style={{ position: 'relative' }}>
            
            {/* BOTTONE CUORE PIATTO (FLAT) */}
            <button 
                onClick={handleWishlist}
                style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    zIndex: 10,
                    padding: 0,
                    fontSize: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.3s ease'
                }}
            >
                {/* Usiamo un SVG per garantire che sia perfettamente piatto e senza ombre su ogni dispositivo */}
                <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill={favorite ? "#e0b969" : "none"} // Oro se attivo, vuoto se no
                    stroke={favorite ? "#e0b969" : "#575757"} // Grigio scuro/Oro per il bordo
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>

            <div 
                onClick={() => navigate(`/product/${product.slug}`)} 
                className="card-image-wrapper"
            >
                <Link to={`/product/${product.slug}`}>
                    <img 
                        src={imageUrl} 
                        alt={product.name} 
                        onError={(e) => {
                            e.target.src = "https://placehold.co/400x400?text=Immagine+non+trovata";
                        }} 
                    />
                </Link>
            </div>

            <div className="card-content">
                <h3 className="card-title anta-font">{product.name}</h3>
                <p className="card-price">{Number(product.price).toFixed(2)}€</p>
                
                <div className="card-actions">
                    {isAdded ? (
                        <div className="status-container">
                            <span className="status-label">Aggiunto</span>
                            <div className="quantity-controls">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (cartItem.quantity > 1) {
                                            updateQuantity(product.slug, cartItem.quantity - 1);
                                        } else {
                                            removeFromCart(product.slug);
                                        }
                                    }}
                                >-</button>
                                <span className="quantity-value">{cartItem.quantity}</span>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateQuantity(product.slug, cartItem.quantity + 1);
                                    }}
                                >+</button>
                            </div>
                        </div>
                    ) : (
                        <button 
                            className="btn-cart2" 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                addToCart(product); 
                            }}
                        >
                            Aggiungi
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}