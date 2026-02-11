import { useEffect, useState } from "react";
import api from "../API/axios";
import ProductCard from "../components/ProductCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [eras, setEras] = useState([]);
  const [diets, setDiets] = useState([]);
  const [powers, setPowers] = useState([]);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [searchTerm, setSearchTerm] = useState(search);

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("minPrice")) || 0,
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice")) || 15000,
  );
  const [minTerm, setMinTerm] = useState(minPrice);
  const [maxTerm, setMaxTerm] = useState(maxPrice);

  const [selectedEra, setSelectedEra] = useState(searchParams.get("era") || "");
  const [selectedDiet, setSelectedDiet] = useState(
    searchParams.get("diet") || "",
  );
  const [selectedPower, setSelectedPower] = useState(
    searchParams.get("power_source") || "",
  );
  const [dimension, setDimension] = useState(
    searchParams.get("dimension") || "",
  );

  const navigate = useNavigate();

  useEffect(() => {
    const querySearch = searchParams.get("search") || "";
    setSearch(querySearch);
    setSearchTerm(querySearch);
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchTerm);
    setMinPrice(minTerm);
    setMaxPrice(maxTerm);
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
    setMinTerm(0);
    setMaxTerm(15000);
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
  }, [
    search,
    selectedEra,
    selectedDiet,
    selectedPower,
    dimension,
    minPrice,
    maxPrice,
  ]);

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
    api
      .get("/products", { params })
      .then((res) => {
        const results = res.data.results || [];
        setProducts(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore filtraggio:", err);
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
    navigate,
  ]);

  return (
    <div className="products-page bg-white text-dark min-vh-100 pb-5">
      <div className="container" style={{ paddingTop: "120px" }}>
        <h1 className="text-center mb-5 title-order fw-bold text-uppercase">
          Catalogo
        </h1>

        {/* BOX RICERCA E BUDGET - STILE BORDER-CHECKOUT */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="p-4 border-checkout shadow-sm">
              <form onSubmit={handleSearchSubmit}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-9">
                    <label className="anta-head small mb-2 text-uppercase fw-bold">
                      Modello Robot
                    </label>
                    <input
                      className="form-control input-checkout py-2"
                      placeholder="Cerca per nome..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (e.target.value === "") setSearch("");
                      }}
                    />
                  </div>
                  <div className="col-md-3">
                    <button
                      type="submit"
                      className="btn order-btn w-100 text-uppercase fw-bold py-2"
                    >
                      Applica
                    </button>
                  </div>

                  {/* RANGE SLIDER */}
                  <div className="col-12 mt-4">
                    <div className="p-3 riepilogo">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="small anta-head text-uppercase fw-bold">
                          Range di Budget
                        </span>
                        <span className="fw-bold totale">
                          {minTerm} € — {maxTerm} €
                        </span>
                      </div>
                      <div
                        className="position-relative"
                        style={{ height: "40px" }}
                      >
                        <input
                          type="range"
                          min="0"
                          max="15000"
                          step="100"
                          value={minTerm}
                          onChange={(e) =>
                            setMinTerm(
                              Math.min(Number(e.target.value), maxTerm - 500),
                            )
                          }
                          className="position-absolute top-50 start-0 w-100"
                          style={{
                            zIndex: minTerm > 7500 ? "5" : "3",
                            appearance: "none",
                            background: "none",
                            pointerEvents: "none",
                            height: "0",
                          }}
                        />
                        <input
                          type="range"
                          min="0"
                          max="15000"
                          step="100"
                          value={maxTerm}
                          onChange={(e) =>
                            setMaxTerm(
                              Math.max(Number(e.target.value), minTerm + 500),
                            )
                          }
                          className="position-absolute top-50 start-0 w-100"
                          style={{
                            zIndex: "4",
                            appearance: "none",
                            background: "none",
                            pointerEvents: "none",
                            height: "0",
                          }}
                        />
                        <div
                          className="position-absolute top-50 start-0 w-100 rounded"
                          style={{
                            height: "6px",
                            transform: "translateY(-50%)",
                            zIndex: "1",
                            backgroundColor: "rgba(69, 194, 216, 0.2)",
                          }}
                        ></div>
                        <style>{`
                          input[type=range]::-webkit-slider-thumb { pointer-events: auto; appearance: none; width: 20px; height: 20px; background: #e1bb70; border-radius: 50%; cursor: pointer; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
                          input[type=range]::-moz-range-thumb { pointer-events: auto; width: 20px; height: 20px; background: #e1bb70; border-radius: 50%; cursor: pointer; border: 2px solid white; }
                        `}</style>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FILTRI TECNICI - STILE RIEPILOGO */}
        <div className="p-4 riepilogo mb-4 shadow-sm">
          <div className="row g-4">
            <div className="col-md-3">
              <label className="small anta-head mb-2 text-uppercase fw-bold">
                Periodo Storico
              </label>
              <select
                className="form-select input-checkout shadow-none"
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
            <div className="col-md-3">
              <label className="small anta-head mb-2 text-uppercase fw-bold">
                Dieta Biologica
              </label>
              <select
                className="form-select input-checkout shadow-none"
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
            <div className="col-md-3">
              <label className="small anta-head mb-2 text-uppercase fw-bold">
                Alimentazione
              </label>
              <select
                className="form-select input-checkout shadow-none"
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
            <div className="col-md-3">
              <label className="small anta-head mb-2 text-uppercase fw-bold">
                Taglia
              </label>
              <select
                className="form-select input-checkout shadow-none"
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
          </div>
        </div>

        {/* AZIONI GLOBALI E CONTEGGIO */}
        <div className="d-flex justify-content-between align-items-center mb-5 px-2">
          <div className="text-grazie text-uppercase small tracking-widest fw-bold">
            {!loading && (
              <>
                Risultati trovati:{" "}
                <span className="text-gold fw-bold">{products.length}</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="btn-svuota"
            style={{ fontSize: "0.75rem", letterSpacing: "1px" }}
          >
            <span className="me-2">✕</span> Azzera tutti i filtri
          </button>
        </div>

        {/* GRIGLIA PRODOTTI */}
        <div className="row">
          {loading ? (
            <div className="text-center p-5 fw-light text-grazie">
              <div
                className="spinner-border text-gold mb-3"
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
            <div className="text-center p-5 text-muted italic w-100">
              Nessun robot trovato con questi parametri.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
