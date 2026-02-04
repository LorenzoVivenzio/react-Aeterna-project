import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

export default function DetailProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
 
    api.get(`/products/${slug}`)
      .then((res) => {
        const current = res.data.item || res.data;
        setProduct(current);

     
        return api.get("/products").then((allRes) => {
          const all = allRes.data.results || allRes.data;
          
        
          const others = all.filter(p => p.id !== current.id);

      
          const sameEra = others.find(p => p.era_name === current.era_name);
          
        
          const sameDiet = others.find(p => 
            p.diet_name === current.diet_name && p.id !== sameEra?.id
          );
          
         
          const samePower = others.find(p => 
            p.power_source_name === current.power_source_name && 
            p.id !== sameEra?.id && 
            p.id !== sameDiet?.id
          );

   
          const finalRelated = [sameEra, sameDiet, samePower].filter(p => p !== undefined);
          
          setRelatedProducts(finalRelated);
        });
      })
      .catch((err) => console.error("Errore:", err))
      .finally(() => setLoading(false));

    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <div className="text-white p-5 text-center">Analisi genetica in corso...</div>;
  if (!product) return <div className="text-white p-5 text-center">Dati non trovati.</div>;

  return (
    <>
      <Header />
      <div className="product-detail-page bg-black text-white" style={{ paddingTop: '100px' }}>
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
              <h1 className="display-4 fw-bold text-uppercase text-primary">{product.name}</h1>
              <div className="d-flex gap-2 mb-4">
                <span className="badge bg-secondary">{product.era_name}</span>
                <span className="badge bg-info text-dark">{product.diet_name}</span>
                <span className="badge bg-warning text-dark">{product.power_source_name}</span>
              </div>
              <h2 className="text-success mb-4">{Number(product.price).toFixed(2)}€</h2>
              <p className="lead text-white-50">{product.description}</p>
              <button className="btn btn-primary btn-lg mt-4 w-100">Aggiungi al Carrello</button>
            </div>
          </div>

          {/* CORRELATI */}
          {relatedProducts.length > 0 && (
            <div className="related-section pb-5">
              <h3 className="mb-5 text-center text-uppercase tracking-widest">Modelli Correlati per Caratteristiche</h3>
              <div className="row">
                {relatedProducts.map((rp, index) => (
                  <div key={rp.id} className="col-md-4">
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