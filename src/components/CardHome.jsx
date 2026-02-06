import "./Bestseller.css";
import { Link } from "react-router-dom";

export default function CardHome({ product }) {
  if (!product) return null;

  return (
    <div className="card-container bestseller h-100">
      {" "}
      <div className="bestseller-img">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/images/${product.url_image}`}
          alt={product.name}
          className="card-image img-fluid"
        />
      </div>
      <div className="product-info p-3">
        {" "}
        <h3 className="mt-3 product-name">{product.name}</h3>
        <p className="pt-1 product-price">€ {product.price}</p>
        <Link to={`/product/${product.slug}`} className="btn-link">
          dettagli
        </Link>
      </div>
    </div>
  );
}
