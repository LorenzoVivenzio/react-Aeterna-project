import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../API/axios.jsx";
import Header from "../components/Header";

export default function DetailProduct() {
  
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    api.get(`/products/${slug}`)
      .then((res) => {
        
        const data = res.data.item || res.data;
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore nel caricamento del dettaglio:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-white p-5">Accesso ai dati protetti...</div>;
  
  if (!product) return <div className="text-white p-5 text-center">Prodotto non trovato.</div>;

  const imageUrl = `http://localhost:3001/images/${product.url_image}`;

  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: '120px' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline-light mb-4">
          &larr; Torna indietro
        </button>

        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="detail-image-wrapper">
              <img 
                src={imageUrl} 
                alt={product.name} 
                className="img-fluid rounded shadow"
                onError={(e) => e.target.src = "https://placehold.co/600x600?text=Immagine+non+disponibile"}
              />
            </div>
          </div>
          
          <div className="col-md-6 text-white">
            <span className="badge bg-primary mb-2">{product.era_name || 'Protocollo Aeterna'}</span>
            <h1 className="display-4 fw-bold mb-3">{product.name}</h1>
            <h3 className="text-success mb-4">{Number(product.price).toFixed(2)}€</h3>
            
            <div className="product-description mb-5">
              <h5>Specifiche Tecniche:</h5>
              <p className="text-white-50">
                {product.description || "Questo modello di replica robotica è stato progettato per simulare perfettamente il comportamento e l'estetica della specie originale. Costruito con materiali eco-sostenibili e circuiti neurali avanzati."}
              </p>
            </div>

            <button className="btn btn-primary btn-lg w-100">
              Aggiungi al Carrello
            </button>
          </div>
        </div>
      </div>
    </>
  );
}