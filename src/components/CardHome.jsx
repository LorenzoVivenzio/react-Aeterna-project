import "./Bestseller.css";
import { Link, useNavigate } from "react-router-dom";
import "./CardHome.css";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext.jsx";

export default function CardHome({ product }) {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  if (!product) return null;

  const cartItem = cart.find((item) => item.slug === product.slug);
  const isAdded = !!cartItem;
  const favorite = isInWishlist(product.slug);

  function handleWishlist(e) {
    e.stopPropagation();
    e.preventDefault();
    if (favorite) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist(product);
    }
  }

  return (
    <div className="card-container bestseller h-100">
      <div 
        className="bestseller-img" 
        onClick={() => navigate(`/product/${product.slug}`)}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/images/${product.url_image}`}
          alt={product.name}
          className="card-image img-fluid"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x400?text=Immagine+non+trovata";
          }}
        />
      </div>

      <div className="product-info p-3">
        <h5 className="mt-3 product-name">{product.name}</h5>
        <p className="pt-1 product-price">€ {Number(product.price).toFixed(2)}</p>

        {/* CONTENITORE AZIONI IDENTICO A PRODUCTCARD + CUORE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {isAdded ? (
            <div className="status-container" style={{ flex: 1 }}>
              <span className="status-label">Aggiunto</span>
              <div className="quantity-controls">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (cartItem.quantity > 1) {
                      updateQuantity(product.slug, cartItem.quantity - 1);
                    } else {
                      removeFromCart(product.slug);
                    }
                  }}
                >
                  -
                </button>
                <span className="quantity-value">{cartItem.quantity}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    updateQuantity(product.slug, cartItem.quantity + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <button
              className="btn-cart2"
              style={{ flex: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addToCart(product);
              }}
            >
              Aggiungi
            </button>
          )}

          {/* PULSANTE CUORE */}
          <button
            onClick={handleWishlist}
            aria-label={favorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              cursor: "pointer",
              padding: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s ease",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={favorite ? "#e0b969" : "none"}
              stroke={favorite ? "#e0b969" : "#575757"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}