import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../API/axios.jsx";
import ProductCard from "../components/ProductCard";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

import "./DetailProduct.css"

export default function DetailProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  const { addToCart } = useCart();

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
        <div className="text-white p-5 text-center">Ricerca in corso...</div>
      </div>
    );

  return (
    <>
      <div
        className="product-detail-page"
        style={{ paddingTop: "50px" }}>


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



            <div className="col-md-6 px-5">
              <h3 className="product-name mb-4">
                {product.name}
              </h3>

              <h6>Dimensioni prodotto: {product.dimension}</h6>
              <h5 className=" card-price">
                € {Number(product.price).toFixed(2)}
              </h5>
              <p className="text-free">(Per odini superiori ai €1000, la spedizione è gratuita)</p>
              <p className="lead">{product.description}</p>


              <h5>{product.eras} / {product.diets}</h5>
              <p className="text-primary">{product.power_sources}</p>
              <div>
                <button
                  onClick={() => addToCart(product)}
                  className="btn-cart2">
                  AGGIUNGI AL CARRELLO
                </button>
              </div>
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
