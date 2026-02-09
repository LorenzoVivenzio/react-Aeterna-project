import "./Bestseller.css";
import { Link } from "react-router-dom";
import "./CardHome.css";


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
        <h5 className="mt-3 product-name">{product.name}</h5>
        <p className="pt-1 product-price">€ {product.price},00</p>
        <Link to={`/product/${product.slug}`} className="btn-cart2">
          dettagli
        </Link>
      </div>
    </div>
  );
}
