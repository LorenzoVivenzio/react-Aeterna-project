import { useEffect, useState } from "react";
import api from "../API/axios";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../components/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [eras, setEras] = useState([]);
  const [diets, setDiets] = useState([]);
  const [powers, setPowers] = useState([]);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [searchTerm, setSearchTerm] = useState(search);

  const [minPrice, setMinPrice] = useState(Number(searchParams.get("minPrice")) || 0);
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get("maxPrice")) || 15000);

  const [selectedEra, setSelectedEra] = useState(searchParams.get("era") || "");
  const [selectedDiet, setSelectedDiet] = useState(searchParams.get("diet") || "");
  const [selectedPower, setSelectedPower] = useState(searchParams.get("power_source") || "");
  const [dimension, setDimension] = useState(searchParams.get("dimension") || "");

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchTerm);
  };

  const handleReset = () => {
    setSearch("");
    setSearchTerm("");
    setSelectedEra("");
    setSelectedDiet("");
    setSelectedPower("");
    setDimension("");
    setMinPrice(0);
    setMaxPrice(15000);
    setSearchParams({});
  };

  useEffect(() => {
    const newParams = {};
    if (search) newParams.search = search;
    if (selectedEra) newParams.era = selectedEra;
    if (selectedDiet) newParams.diet = selectedDiet;
    if (selectedPower) newParams.power_source = selectedPower;
    if (dimension) newParams.dimension = dimension;
    if (minPrice > 0) newParams.minPrice = minPrice;
    if (maxPrice < 15000) newParams.maxPrice = maxPrice;
    setSearchParams(newParams);
  }, [search, selectedEra, selectedDiet, selectedPower, dimension, minPrice, maxPrice]);

  useEffect(() => {
    Promise.all([api.get("/eras"), api.get("/diets"), api.get("/power-sources")])
      .then(([resEras, resDiets, resPowers]) => {
        setEras(resEras.data.results || []);
        setDiets(resDiets.data.results || []);
        setPowers(resPowers.data.results || []);
      })
      .catch((err) => console.error("Errore categorie:", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {
      search: search || undefined,
      era: selectedEra || undefined,
      diet: selectedDiet || undefined,
      power_source: selectedPower || undefined,
      dimension: dimension || undefined,
      minPrice,
      maxPrice,
    };
    api.get("/products", { params })
      .then((res) => {
        setProducts(res.data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore filtraggio:", err);
        setLoading(false);
      });
  }, [search, selectedEra, selectedDiet, selectedPower, dimension, minPrice, maxPrice]);

  return (
    <div className="products-page">
      <Header />

      <div className="container" style={{ paddingTop: "50px" }}>
        {/* TITLE */}
        <h1 className="catalog-title">Catalogo Aeterna</h1>

        {/* FILTER ROW */}
        <div className="filter-row">
          <form onSubmit={handleSearchSubmit} className="d-flex align-items-end gap-3 flex-wrap">
            {/* SEARCH INPUT */}
            <div className="flex-grow-1">
              <label className="apple-label">Modello Robot</label>
              <input
                type="text"
                className="apple-input"
                placeholder="Cerca per nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* SELECT FILTERS */}
            <div className="flex-filters d-flex gap-2 flex-wrap">
              <div>
                <label className="apple-label">Periodo Storico</label>
                <select className="apple-select" value={selectedEra} onChange={(e) => setSelectedEra(e.target.value)}>
                  <option value="">Tutte le Ere</option>
                  {eras.map((e, idx) => <option key={idx} value={e.slug}>{e.name}</option>)}
                </select>
              </div>
              <div>
                <label className="apple-label">Dieta Biologica</label>
                <select className="apple-select" value={selectedDiet} onChange={(e) => setSelectedDiet(e.target.value)}>
                  <option value="">Tutte le Diete</option>
                  {diets.map((d, idx) => <option key={idx} value={d.slug}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="apple-label">Alimentazione</label>
                <select className="apple-select" value={selectedPower} onChange={(e) => setSelectedPower(e.target.value)}>
                  <option value="">Tutte le Fonti</option>
                  {powers.map((p, idx) => <option key={idx} value={p.slug}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="apple-label">Taglia</label>
                <select className="apple-select" value={dimension} onChange={(e) => setDimension(e.target.value)}>
                  <option value="">Tutte le Taglie</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Extra Large">Extra Large</option>
                </select>
              </div>
            </div>

            {/* FILTER BUTTON */}
            <div>
              <button type="submit" className="apple-button filter-btn">Filtra</button>
            </div>
          </form>

          {/* BUDGET RANGE */}
          <div className="mt-3">
            <label className="apple-label">Budget: {minPrice}€ - {maxPrice}€</label>
            <input
              type="range"
              min="0"
              max="15000"
              step="100"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="apple-range"
            />
          </div>

          {/* RESET */}
          <div className="d-flex justify-content-end mt-2">
            <button onClick={handleReset} className="apple-reset">✕ Azzera filtri</button>
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="results-count mt-3">
          {!loading && <>Risultati trovati: <strong>{products.length}</strong></>}
        </div>

        {/* PRODUCT GRID */}
        <div className="row mt-3">
          {loading ? (
            <div className="text-center p-5 fw-light text-secondary w-100">
              <div className="spinner-border text-primary mb-3" role="status"></div>
              <p>Analisi del database in corso...</p>
            </div>
          ) : products.length > 0 ? (
            products.map((p, idx) => (
              <div key={idx} className="col-md-4 col-lg-3 mb-4">
                <ProductCard product={p} />
              </div>
            ))
          ) : (
            <div className="text-center p-5 text-muted italic w-100">
              Nessun robot trovato con questi parametri.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}