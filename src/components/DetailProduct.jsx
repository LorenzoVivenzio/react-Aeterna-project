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
      console.log(res)
      
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
        className="product-detail-page"
        style={{ paddingTop: "50px" }}
      >
        <div className="container">
          {/* SCHEDA PRODOTTO */}
          <div className=" row mb-5 py-5 border-bottom border-secondary">
            <div className="row-cart col-md-6 mb-4">
              <img
                src={`http://localhost:3001/images/${product.url_image}`}
                className="img-fluid rounded border border-info shadow-lg"
                alt={product.name}
              />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-between">
              <h2 className="product-name border-bottom pb-2 mb-4">
                {product.name}
              </h2>

              <h4>Dimensioni prodotto: {product.dimension}</h4>
              <div className="d-flex gap-2 mb-4 ">
                <span className="badge bg-secondary">{product.era_name}</span>
                <span className="badge bg-info text-dark">
                  {product.diet_name}
                </span>
                <p className="badge bg-warning text-dark">
                  {product.power_source_name}
                </p>
              </div>
              <h4 className=" product-price text-info mb-4">
                {Number(product.price).toFixed(2)}€
              </h4>
              <p className="lead">{product.description}</p>

              
              <button className="btn-cart">
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
