import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    const backendUrl = "http://localhost:3001";
    const imageUrl = `${backendUrl}/images/${product.url_image}`;

    // Verifica se il prodotto è già nel carrello
    const cartItem = cart.find(item => item.slug === product.slug);
    const isAdded = !!cartItem;

    return (
        <div className="product-card">
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
