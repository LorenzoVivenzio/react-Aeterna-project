import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const backendUrl = "http://localhost:3001";
  const imageUrl = `${backendUrl}/images/${product.url_image}`;
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Funzione per gestire il click sul bottone senza attivare la card
  const handleAddToCart = (e) => {
    e.stopPropagation(); // <--- FERMA LA PROPAGAZIONE AL DIV GENITORE
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div 
        onClick={() => { navigate(`/product/${product.slug}`) }}
        className="card-image-wrapper"
        style={{ cursor: "pointer" }}
      >
        <img
          src={imageUrl}
          alt={product.name}
          onError={(e) =>
            (e.target.src =
              "https://placehold.co/400x400?text=Immagine+non+trovata")
          }
        />
      </div>

      <div className="card-content">
        <h3 className="card-title anta-font">{product.name}</h3>
        <p className="card-price">
          {Number(product.price).toFixed(2)}€
        </p>

        <div className="card-actions">
          <button 
            className="btn-cart2" 
            onClick={handleAddToCart} // <--- Usa la nuova funzione
          >
            Aggiungi
          </button>
        </div>
      </div>
    </div>
  );
}