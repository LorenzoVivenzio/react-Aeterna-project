import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const backendUrl = "http://localhost:3001";
  const imageUrl = `${backendUrl}/images/${product.url_image}`;

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
        <div className="card-category text-white-50">
          {product.era || "Aeterna Model"}
        </div>
        <h3 className="card-title text-white">{product.name}</h3>
        <p className="card-price text-white">
          {Number(product.price).toFixed(2)}€
        </p>

        <div className="card-actions">
          <button className="btn-add-cart">Aggiungi</button>
        </div>
      </div>
    </div>
  );
}
