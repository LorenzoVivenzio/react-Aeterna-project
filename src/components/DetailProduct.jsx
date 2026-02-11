import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../API/axios.jsx";
import ProductCard from "../components/ProductCard";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // Aggiunto import
import ShippingBanner from "./ShippingBanner.jsx";

import "./DetailProduct.css"

export default function DetailProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false); 
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Aggiunto hook

  useEffect(() => {
    setLoading(true);
    setFade(false); 

    api.get(`/products/${slug}`)
      .then((res) => {
        const current = res.data.item || res.data;
        if (!current) {
           navigate("/404");
           return;
        }
        setProduct(current);
        setLoading(false);
        window.scrollTo(0, 0);
        setTimeout(() => setFade(true), 50);
      })
      .catch((err) => {
        console.error(err);
        navigate("/404");
      });
  }, [slug, navigate]);

  if (loading)
    return (
      <div className="pt-5 container min-vh-100">
        <div className="text-white p-5 text-center anta-font">
            <div className="spinner-border text-primary mb-3"></div>
            <div>Sincronizzazione dati in corso...</div>
        </div>
      </div>
    );

  const favorite = isInWishlist(product.slug);

  function handleWishlist() {
    if (favorite) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist(product);
    }
  }

  return (
    <>
      <div className={`product-detail-page ${fade ? "fade-in-active" : "fade-in-init"}`}>
        <ShippingBanner />

        <div className="container product-detail">
          <div className=" row mb-5 py-5 border-bottom border-secondary">
            <div className="row-cart col-md-6 mb-4">
              <img
                src={`http://localhost:3001/images/${product.url_image}`}
                className="img-fluid  img-border shadow-lg"
                alt={product.name}
              />
            </div>

            <div className="col-md-6 px-5">
              <h1 className="anta-font fw-bold mb-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '15px' }}>
                {product.name}
                
                {/* BOTTONE CUORE ACCANTO AL NOME */}
                <button 
                  onClick={handleWishlist}
                  style={{
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <svg 
                    width="28" 
                    height="28" 
                    viewBox="0 0 24 24" 
                    fill={favorite ? "#e0b969" : "none"} 
                    stroke={favorite ? "#e0b969" : "#575757"} 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </h1>

              <div className="mb-1">
                <div className="card-price-big">
                  € {Number(product.price).toFixed(2)}
                </div>
              </div>

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
              
              <div className="mb-4 border-top pt-2">
                <h5 className="mb-1 anta-font">Descrizione:</h5>
                <p className="lead">
                  {product.description}
                </p>
              </div>

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