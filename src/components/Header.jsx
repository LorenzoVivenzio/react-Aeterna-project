import { NavLink, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faCartShopping,
  faHeart,
  faMagnifyingGlass,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import "./Header.css";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { cart, previw, setPreview } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // STATO PER LA RICERCA E NAVIGAZIONE
  const [localSearch, setLocalSearch] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // FUNZIONE PER ESEGUIRE LA RICERCA
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (localSearch.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(localSearch.trim())}`);
      setLocalSearch(""); // Pulisce la barra dopo l'invio
      closeMenu(); // Chiude il menu mobile se aperto
    }
  };

  // GESTIONE TASTO INVIO
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  function countProduct() {
    let countQuantity = 0;
    cart.forEach((p) => {
      countQuantity += p.quantity;
    });
    return countQuantity;
  }

  return (
    <header
      className="nav-bar fixed-top header-border-bot bg-white shadow-sm"
      style={{ zIndex: 2000 }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between py-2">
        {/* 1. SEZIONE SINISTRA */}
        <div className="d-flex align-items-center" style={{ flex: 1 }}>
          <div className="d-md-none">
            <button
              className="btn btn-outline-dark border-0 anta-head"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faBars} className="me-2" />
              Menu
            </button>
          </div>

          <div className={`custom-menu-offcanvas ${isMenuOpen ? "open" : ""}`}>
            <div className="offcanvas-header-manual border-bottom">
              <h5 className="anta-head m-0">AETERNA</h5>
              <button className="btn-close-manual" onClick={closeMenu}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="offcanvas-body-manual">
              <ul className="navbar-nav flex-column gap-3 mt-3">
                <li className="anta-head fs-5 border-bottom pb-2 px-3">
                  <NavLink to="/" className="text-decoration-none text-dark d-block" onClick={closeMenu}> Home </NavLink>
                </li>
                <li className="anta-head fs-5 border-bottom pb-2 px-3">
                  <NavLink to="/products" className="text-decoration-none text-dark d-block" onClick={closeMenu}> Prodotti </NavLink>
                </li>
                <li className="anta-head fs-5 border-bottom pb-2 px-3">
                  <NavLink to="/about" className="text-decoration-none text-dark d-block" onClick={closeMenu}> Chi siamo </NavLink>
                </li>
              </ul>
            </div>
          </div>
          {isMenuOpen && <div className="menu-overlay-manual" onClick={closeMenu}></div>}

          <div className="nav d-none d-md-flex">
            <ul className="d-flex list-unstyled m-0 gap-4">
              <li className="anta-head bold"><NavLink to="/" className="text-decoration-none text-dark underline">Home</NavLink></li>
              <li className="anta-head bold"><NavLink to="/products" className="text-decoration-none text-dark underline">Prodotti</NavLink></li>
              <li className="anta-head bold"><NavLink to="/about" className="text-decoration-none text-dark underline">Chi siamo</NavLink></li>
            </ul>
          </div>
        </div>

       {/* 2. SEZIONE CENTRALE: LOGO (Desktop) O SEARCH (Mobile/Tablet con tasto) */}
        <div className="d-flex justify-content-center" style={{ flex: 1 }}>
          <div className="logo2 d-none d-lg-block">
            <p className="main-title m-0 fw-bold" style={{ letterSpacing: "2px", whiteSpace: "nowrap" }}>
              AETERNA
            </p>
          </div>

          {/* SEARCH MOBILE/TABLET */}
          <div className="d-block d-lg-none w-100" style={{ maxWidth: "220px" }}>
            <div className="d-flex align-items-center">
              <div className="position-relative flex-grow-1">
                <input
                  type="text"
                  placeholder="Cerca..."
                  className="form-control form-control-sm ps-4"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    fontSize: "0.8rem",
                    borderColor: "#e2e8f0",
                    backgroundColor: "#f8fafc",
                    borderTopLeftRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    borderRight: "none",
                    height: "31px"
                  }}
                />
                <FontAwesomeIcon 
                  icon={faMagnifyingGlass} 
                  className="position-absolute text-muted" 
                  style={{ fontSize: "0.7rem", left: "10px", top: "50%", transform: "translateY(-50%)" }} 
                />
              </div>
              <button
                onClick={handleSearch}
                className="btn btn-dark btn-sm search-btn-fixed"
                style={{
                  fontSize: "0.65rem",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  padding: "0 10px",
                  fontWeight: "600",
                  height: "31px",
                }}
              >
                CERCA
              </button>
            </div>
          </div>
        </div>

        {/* 3. SEZIONE DESTRA: ICONS + SEARCH DESKTOP */}
        <div className="d-flex justify-content-end align-items-center" style={{ flex: 1 }}>
          <ul className="d-flex list-unstyled m-0 align-items-center gap-2 gap-md-3">
            {/* SEARCH DESKTOP */}
            <li className="d-none d-lg-flex align-items-center">
              <div className="d-flex align-items-center">
                <div className="position-relative">
                  <input
                    type="text"
                    placeholder="Cerca..."
                    className="form-control form-control-sm ps-4"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                      width: "150px",
                      fontSize: "0.8rem",
                      borderColor: "#6a6c70",
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                      borderRight: "none",
                    }}
                  />
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="position-absolute text-muted " style={{ fontSize: "0.7rem", left: "8px", top: "50%", transform: "translateY(-50%)" }} />
                </div>
                <button
                  onClick={handleSearch}
                  className="btn btn-dark btn-sm search-btn-fixed"
                  style={{
                    fontSize: "0.7rem",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    paddingRight: "12px",
                    fontWeight: "600",
                    height: "31px",
                  }}
                >
                  CERCA
                </button>
              </div>
            </li>

            <li>
              <NavLink to="/wishlist" className="text-dark p-2 underline">
                <FontAwesomeIcon icon={faHeart} />
              </NavLink>
            </li>

            <li className="position-relative">
              <NavLink to="/cart" className="text-dark p-2 d-flex align-items-center underline" style={{ textDecoration: "none" }}>
                <FontAwesomeIcon icon={faCartShopping} size="lg" style={{ color: "#0f172a" }} />
                {cart.length > 0 && (
                  <span className="position-absolute translate-middle badge rounded-pill" style={{ top: "8px", left: "85%", backgroundColor: "#d4af37", color: "#000000", fontSize: "0.7rem", fontWeight: "800", border: "2px solid #ffffff" }}>
                    {countProduct()}
                  </span>
                )}
              </NavLink>

              {previw && cart.length > 0 && (
                <div className="position-absolute end-0 mt-2 shadow-lg border rounded-3 bg-white" style={{ width: "340px", zIndex: 2100, top: "100%" }}>
                  <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center rounded-top">
                    <small className="fw-bold text-muted text-uppercase" style={{ letterSpacing: "1px" }}> Il tuo carrello </small>
                    <span className="badge rounded-pill bg-white text-dark border px-2 py-1" style={{ fontSize: "0.7rem" }}> {cart.length} prodotti </span>
                  </div>
                  <ul className="list-group list-group-flush" style={{ maxHeight: "350px", overflowY: "auto" }}>
                    {cart.map((c, index) => (
                      <li key={index} className="list-group-item py-3 px-3 border-bottom">
                        <div className="d-flex align-items-center">
                          <div className="rounded border shadow-sm" style={{ width: "60px", height: "60px", flexShrink: 0, backgroundImage: `url(http://localhost:3001/images/${c.url_image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex justify-content-between">
                              <h6 className="fw-bold mb-0 text-truncate" style={{ maxWidth: "130px", fontSize: "0.9rem" }}> {c.name} </h6>
                              <span className="fw-bold text-dark" style={{ fontSize: "0.9rem" }}> €{c.price} </span>
                            </div>
                            <div className="mt-2">
                              <small className="text-muted d-block" style={{ fontSize: "0.8rem", borderLeft: "2px solid #d4af37", paddingLeft: "8px" }}> Quantità: <span className="text-dark fw-bold">{c.quantity}</span></small>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 bg-white rounded-bottom">
                    <NavLink to="/cart" className="btn btn-dark w-100 py-2 fw-bold" style={{ borderRadius: "8px", fontSize: "0.9rem" }} onClick={() => setPreview(false)}> Visualizza Carrello </NavLink>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}