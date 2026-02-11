import "./Bestseller.css";
import { Link } from "react-router-dom";
import "./CardHome.css";
import { useWishlist } from "../context/WishlistContext"; 

export default function CardHome({ product }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  if (!product) return null;

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
    <div className="card-container bestseller h-100">
      <div className="bestseller-img">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/images/${product.url_image}`}
          alt={product.name}
          className="card-image img-fluid"
        />
      </div>
      
      <div className="product-info p-3">
        <h5 className="mt-3 product-name">{product.name}</h5>
        <p className="pt-1 product-price">€ {product.price},00</p>
        
        {/* CONTENITORE AZIONI (BOTTONE + CUORE) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
          
          <button
            onClick={() => addToCart(product)}
            className="btn-cart2"
            style={{ flex: 1, padding: '8px 12px' }} // flex: 1 lo rimpicciolisce quanto basta
          >
            Aggiungi 
          </button>

          <button 
              onClick={handleWishlist}
              style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
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