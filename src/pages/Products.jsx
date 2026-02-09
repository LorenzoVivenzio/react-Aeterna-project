import { useEffect, useState } from "react";
import api from "../API/axios";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [eras, setEras] = useState([]);
  const [diets, setDiets] = useState([]);
  const [powers, setPowers] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedEra, setSelectedEra] = useState("");
  const [selectedDiet, setSelectedDiet] = useState("");
  const [selectedPower, setSelectedPower] = useState("");
  const [dimension, setDimension] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(15000);
  const navigate= useNavigate();

  useEffect(() => {
    Promise.all([
      api.get("/eras"),
      api.get("/diets"),
      api.get("/power-sources"),
    ])
      .then(([resEras, resDiets, resPowers]) => {
        setEras(resEras.data.results || []);
        setDiets(resDiets.data.results || []);
        setPowers(resPowers.data.results || []);
      })
      .catch((err) => console.error("Errore caricamento categorie:", err));
  }, []);

  useEffect(() => {
    setLoading(true);

    const params = {
      search: search || undefined,
      era: selectedEra || undefined,
      diet: selectedDiet || undefined,
      power_source: selectedPower || undefined,
      dimension: dimension || undefined,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };

    api
      .get("/products", { params })
      .then((res) => {
        setProducts(res.data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore durante il filtraggio:", err);
        setLoading(false);
      });
  }, [
    search,
    selectedEra,
    selectedDiet,
    selectedPower,
    dimension,
    minPrice,
    maxPrice,
  ]);

  return (
    <div className="products-page bg-white text-dark min-vh-100 pb-5">
      <Header />

      <div className="container" style={{ paddingTop: "50px" }}>
        <h1 className="text-center mb-5 fw-bold text-uppercase tracking-widest text-primary">
          Catalogo Aeterna
        </h1>

        {/* Filtri */}
        <div className="filters-container bg-dark p-4 rounded-4 border border-secondary mb-5 shadow-lg">
          <div className="row g-4">
            {/* Nome */}
            <div className="col-md-6">
              <label className="small text-info mb-2 text-uppercase fw-bold">
                Modello Robot
              </label>
              <input
                className="form-control bg-black text-white border-secondary shadow-none"
                placeholder="Cerca per nome..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Era */}
            <div className="col-md-6">
              <label className="small text-info mb-2 text-uppercase fw-bold">
                Periodo Storico
              </label>
              <select
                className="form-select bg-black text-white border-secondary"
                value={selectedEra}
                onChange={(e) => setSelectedEra(e.target.value)}
              >
                <option value="">Tutte le Ere</option>
                {eras.map((e, index) => (
                  <option key={index} value={e.slug}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dieta */}
            <div className="col-md-4">
              <label className="small text-info mb-2 text-uppercase fw-bold">
                Dieta Biologica
              </label>
              <select
                className="form-select bg-black text-white border-secondary"
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
              >
                <option value="">Tutte le Diete</option>
                {diets.map((d, index) => (
                  <option key={index} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Alimentazione */}
            <div className="col-md-4">
              <label className="small text-info mb-2 text-uppercase fw-bold">
                Alimentazione
              </label>
              <select
                className="form-select bg-black text-white border-secondary"
                value={selectedPower}
                onChange={(e) => setSelectedPower(e.target.value)}
              >
                <option value="">Tutte le Fonti</option>
                {powers.map((p, index) => (
                  <option key={index} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dimensione */}
            <div className="col-md-4">
              <label className="small text-info mb-2 text-uppercase fw-bold">
                Taglia (Dimension)
              </label>
              <select
                className="form-select bg-black text-white border-secondary"
                value={dimension}
                onChange={(e) => setDimension(e.target.value)}
              >
                <option value="">Tutte le Taglie</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Extra Large">Extra Large</option>
              </select>
            </div>

            {/* Prezzo Minimo */}
            <div className="col-md-6">
              <label className="small text-info d-flex justify-content-between mb-2">
                Budget Minimo: <span className="text-white">{minPrice} €</span>
              </label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="15000"
                step="100"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
            </div>

            {/* Prezzo Massimo */}
            <div className="col-md-6">
              <label className="small text-info d-flex justify-content-between mb-2">
                Budget Massimo: <span className="text-white">{maxPrice} €</span>
              </label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="15000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Griglia */}
        <div className="row">
          {loading ? (
            <div className="text-center p-5 fw-light text-secondary">
              <div
                className="spinner-border text-primary mb-3"
                role="status"
              ></div>
              <p>Analisi del database in corso...</p>
            </div>
          ) : products.length > 0 ? (
            products.map((p, index) => (
              <div key={index} className="col-md-4 col-lg-3 mb-4">
                <ProductCard product={p} />
              </div>
            ))
          ) : (
            <div className="text-center p-5 text-muted italic">
              Nessun robot trovato con questi parametri.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
