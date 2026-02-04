// I PIU VENDUTI
import "./Bestseller.css";
import { Link } from "react-router-dom";

export default function CardHome({ product }) {
  return (
    <>
      <div className="col card-container bestseller">
        <div className="bestseller-img">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/images/${
              product.url_image
            }`}
            alt=""
            className="card-image"
          />
        </div>

        <div className="col">
          <h3 className="mt-3 product-name">{product.name}</h3>
          <p className="pt-1 product-price">{product.price}</p>
          <Link to={`/product/${product.slug}`}>dettagli</Link>
        </div>
      </div>
    </>
  );
}
