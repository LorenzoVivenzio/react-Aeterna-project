import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // 1. Importa l'hook



export default function ProductCard({ product }) {
  const backendUrl = "http://localhost:3001";
  const imageUrl = `${backendUrl}/images/${product.url_image}`;
  
  // 2.funzione addToCart
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="card-image-wrapper">
        <Link to={`/product/${product.slug}`}>
          <img
            src={imageUrl}
            alt={product.name}
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/400x400?text=Immagine+non+trovata")
            }
          />
        </Link>
      </div>

      <div className="card-content">
        <div className="card-category">
          {product.eras}
        </div>
        <h3 className="card-title anta-font">{product.name}</h3>
        <p className="card-price ">
          {Number(product.price).toFixed(2)}€
        </p>

        <div className="card-actions">
          {/* 3. Collega la funzione */}
          <button 
            className="btn-cart2" 
            onClick={() => addToCart(product)}
          >
            Aggiungi
          </button>
        </div>
      </div>
    </div>
  );
}