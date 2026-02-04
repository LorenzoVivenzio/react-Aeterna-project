import { useEffect, useState } from "react";
import api from "../API/axios.jsx"; 
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [eras, setEras] = useState([]);
  const [diets, setDiets] = useState([]);
  const [powers, setPowers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEra, setSelectedEra] = useState("");
  const [selectedDiet, setSelectedDiet] = useState("");
  const [selectedPower, setSelectedPower] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/eras"),
      api.get("/diets"),
      api.get("/power-sources")
    ]).then(([resEras, resDiets, resPowers]) => {
 
      setEras(resEras.data.results || []);
      setDiets(resDiets.data.results || []);
      setPowers(resPowers.data.results || []);
    }).catch(err => console.error("Errore categorie:", err));
  }, []);


  useEffect(() => {
    setLoading(true);
    
    const params = {
      search: searchQuery || undefined,       
      era: selectedEra || undefined,          
      diet: selectedDiet || undefined,        
      power_source: selectedPower || undefined 
    };

    api.get("/products", { params })
      .then((res) => {
       
        setProducts(res.data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore filtraggio backend:", err);
        setLoading(false);
      });
  }, [searchQuery, selectedEra, selectedDiet, selectedPower]); 

  return (
    <div className="products-page bg-black text-white min-vh-100">
      <Header />
      <div className="container" style={{ paddingTop: '150px' }}>
        <h1 className="text-center mb-5 tracking-tighter">ARCHIVIO AETERNA</h1>
        
        <div className="filters-bar bg-dark p-4 rounded-4 mb-5 border border-secondary shadow">
          <div className="row g-3">
            {/* Ricerca per Nome */}
            <div className="col-md-3">
              <input 
                className="form-control bg-black text-white border-secondary" 
                placeholder="Cerca modello..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>

            {/* Select ERE */}
            <div className="col-md-3">
              <select className="form-select bg-black text-white border-secondary" onChange={(e) => setSelectedEra(e.target.value)}>
                <option value="">Tutte le Ere</option>
                {eras.map(e => <option key={e.id} value={e.slug}>{e.name}</option>)}
              </select>
            </div>

            {/* Select DIETE */}
            <div className="col-md-3">
              <select className="form-select bg-black text-white border-secondary" onChange={(e) => setSelectedDiet(e.target.value)}>
                <option value="">Tutte le Diete</option>
                {diets.map(d => <option key={d.id} value={d.slug}>{d.name}</option>)}
              </select>
            </div>

            {/* Select POWER*/}
            <div className="col-md-3">
              <select className="form-select bg-black text-white border-secondary" onChange={(e) => setSelectedPower(e.target.value)}>
                <option value="">Alimentazione</option>
                {powers.map(p => <option key={p.id} value={p.slug}>{p.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          {loading ? (
            <div className="text-center w-100">Sincronizzazione in corso...</div>
          ) : (
            products.map(p => (
              <div key={p.id} className="col-md-4 col-lg-3 mb-4">
                <ProductCard product={p} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}