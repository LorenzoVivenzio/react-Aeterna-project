import { useEffect, useState } from "react";
import api from "../API/axios.jsx";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        const data = res.data.results || res.data;
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore API:", err);
        setLoading(false);
      });
  }, []);


  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="products-page">
      <Header />
      
      <section className="products-hero text-center text-white" style={{ paddingTop: '120px' }}>
        <div className="container">
          <h1 className="display-4 fw-bold">Archivio Aeterna</h1>
          
          {/* BARRA DI RICERCA SPOSTATA QUI */}
          <div className="search-container-products my-4">
            <input 
              className="input-nav w-50" 
              type="search" 
              placeholder="Cerca un robot per nome (es: Dodo)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '10px', borderRadius: '5px', border: 'none' }}
            />
          </div>
        </div>
      </section>

      <div className="container my-5">
        {loading ? (
          <div className="text-center text-white">Caricamento...</div>
        ) : (
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prodotto) => (
                <div key={prodotto.id} className="col-12 col-md-6 col-lg-3 mb-4">
                  <ProductCard product={prodotto} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-white-50 py-5">
                <h3>Nessun robot corrisponde alla ricerca "{searchQuery}"</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}