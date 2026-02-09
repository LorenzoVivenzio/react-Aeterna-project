import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../API/axios.jsx";
import ProductCard from "../components/ProductCard";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import ShippingBanner from "./ShippingBanner.jsx";



import "./DetailProduct.css"

export default function DetailProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const { addToCart } = useCart();

 useEffect(() => {
    api.get(`/products/${slug}`)
      .then((res) => {
        const current = res.data.item || res.data;
        if (!current) {
           navigate("/404"); // Se l'API risponde ma l'oggetto è nullo
        }
        setProduct(current);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        navigate("/404"); // Se l'API dà errore (es. 404 dal server)
      });
  }, [slug, navigate]);

  if (loading)
    return (
      <div className="pt-5 container">
        <div className="text-white p-5 text-center">Ricerca in corso...</div>
      </div>
    );

  return (
    <>
      <div className="product-detail-page">

        {/* BANNER SCONTO ORDINI */}
        <ShippingBanner />


        <div className="container product-detail">
          {/* SCHEDA PRODOTTO */}
          <div className=" row mb-5 py-5 border-bottom border-secondary">
            <div className="row-cart col-md-6 mb-4">
              <img
                src={`http://localhost:3001/images/${product.url_image}`}
                className="img-fluid  img-border shadow-lg"
                alt={product.name}
              />
            </div>



            <div className="col-md-6 px-5">

              {/* TITOLO */}
              <h1 className="anta-font fw-bold mb-1">
                {product.name}
              </h1>

              {/* PREZZO */}
              <div className="mb-1">
                <div className="card-price-big">
                  € {Number(product.price).toFixed(2)}
                </div>
                
              </div>

              {/* CARATTERISTICHE*/}
              <div className="mb-4 border-top">
                <div>
                  <div className="col-12 py-3">
                    <strong>Dimensioni: </strong>  
                      {product.dimension}

                  </div>
                  <div className="row pb-3">
                    <div className="col-6">
                      <strong className="anta-font">Era:</strong> <br />
                      {product.eras}
                    </div>
                    <div className="col-6 border-left">
                      <strong className="anta-font">Dieta:</strong>  <br />
                      {product.diets}
                    </div>
                  </div>

                  <div className="col-12">
                    <strong className="anta-font">Alimentazione:</strong>  <br />
                    {product.power_sources}
                  </div>
                </div>
              </div>
              
              {/* DESCRIZIONE */}
              <div className="mb-4 border-top pt-2">
                <h5 className="mb-1 anta-font">Descrizione:</h5>
                <p className="lead">
                  {product.description}
                </p>
              </div>

              {/* BOTTONE addToCart */}
              <div className="d-grid border-top pt-1">
                <p className="text-muted small mb-2">
                  Spedizione gratuita sopra i €1000
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="btn-cart2">
                  Aggiungi al carrello
                </button>
              </div>

            </div>
          </div>







          {/* CORRELATI */}
          {product.recommended.length > 0 && (
            <div className="related-section pb-5">
              <h3 className="mb-5 text-center text-uppercase tracking-widest anta-font">
                Modelli Correlati per Caratteristiche
              </h3>
              <div className="row">
                {product.recommended.map((rp, index) => (
                  <div key={index} className="col-md-4">
                    <p className="text-center text-secondary small text-uppercase">
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
