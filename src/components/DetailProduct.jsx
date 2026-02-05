import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function DetailProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${slug}`).then((res) => {
      const current = res.data.item || res.data;
      setLoading(false);
      setProduct(current);
    });
  }, [slug]);

  if (loading)
    return (
      <div className="pt-5 container">
        <div className="text-black p-5 text-center">Ricerca in corso</div>;
      </div>
    );
  return (
    <>
      <div
        className="product-detail-page bg-black text-white"
        style={{ paddingTop: "100px" }}
      >
        <div className="container">
          {/* SCHEDA PRODOTTO */}
          <div className="row mb-5 py-5 border-bottom border-secondary">
            <div className="col-md-6 mb-4">
              <img
                src={`http://localhost:3001/images/${product.url_image}`}
                className="img-fluid rounded border border-primary shadow-lg"
                alt={product.name}
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-4 fw-bold text-uppercase text-primary">
                {product.name}
              </h1>
              <div className="d-flex gap-2 mb-4">
                <span className="badge bg-secondary">{product.era_name}</span>
                <span className="badge bg-info text-dark">
                  {product.diet_name}
                </span>
                <span className="badge bg-warning text-dark">
                  {product.power_source_name}
                </span>
              </div>
              <h2 className="text-success mb-4">
                {Number(product.price).toFixed(2)}€
              </h2>
              <p className="lead text-white-50">{product.description}</p>
              <button className="btn btn-primary btn-lg mt-4 w-100">
                Aggiungi al Carrello
              </button>
            </div>
          </div>

          {/* CORRELATI */}

          {product.recommended.length > 0 && (
            <div className="related-section pb-5">
              <h3 className="mb-5 text-center text-uppercase tracking-widest">
                Modelli Correlati per Caratteristiche
              </h3>
              <div className="row">
                {product.recommended.map((rp, index) => (
                  <div key={index} className="col-md-4">
                    <p className="text-center text-primary small text-uppercase">
                      {index === 0 && "Stesso Periodo"}
                      {index === 1 && "Stessa Dieta"}
                      {index === 2 && "Stessa Alimentazione"}
                    </p>
                    <ProductCard product={rp} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
