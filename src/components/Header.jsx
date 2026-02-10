import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import "./Header.css";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { cart, previw } = useCart();

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
        {/* 1. SEZIONE SINISTRA: MENU (Desktop & Mobile) */}
        <div className="d-flex align-items-center" style={{ flex: 1 }}>
          {/* MOBILE MENU BUTTON */}
          <div className="d-md-none">
            <button
              className="btn btn-outline-dark border-0 anta-head"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasResponsive"
            >
              Menu
            </button>

            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="offcanvasResponsive"
              aria-labelledby="offcanvasResponsiveLabel"
            >
              <div className="offcanvas-header border-bottom">
                <h5
                  className="offcanvas-title anta-head"
                  id="offcanvasResponsiveLabel"
                >
                  AETERNA
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav flex-column gap-3 mt-3">
                  <li className="anta-head fs-5 border-bottom pb-2">
                    <NavLink
                      to="/"
                      className="text-decoration-none text-dark"
                      data-bs-dismiss="offcanvas"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="anta-head fs-5 border-bottom pb-2">
                    <NavLink
                      to="/products"
                      className="text-decoration-none text-dark"
                      data-bs-dismiss="offcanvas"
                    >
                      Prodotti
                    </NavLink>
                  </li>
                  <li className="anta-head fs-5 border-bottom pb-2">
                    <NavLink
                      to="/about"
                      className="text-decoration-none text-dark"
                      data-bs-dismiss="offcanvas"
                    >
                      Chi siamo
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* DESKTOP LINKS */}
          <div className="nav d-none d-md-flex">
            <ul className="d-flex list-unstyled m-0 gap-4">
              <li className="anta-head bold">
                <NavLink to="/" className="text-decoration-none text-dark">
                  Home
                </NavLink>
              </li>
              <li className="anta-head bold">
                <NavLink
                  to="/products"
                  className="text-decoration-none text-dark"
                >
                  Prodotti
                </NavLink>
              </li>
              <li className="anta-head bold">
                <NavLink to="/about" className="text-decoration-none text-dark">
                  Chi siamo
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. SEZIONE CENTRALE: LOGO O SEARCH MOBILE */}
        <div className="d-flex justify-content-center" style={{ flex: 1 }}>
          {/* LOGO DESKTOP: Centrato */}
          <div className="logo2 d-none d-md-block">
            <p
              className="main-title m-0 fw-bold"
              style={{ letterSpacing: "2px", whiteSpace: "nowrap" }}
            >
              AETERNA
            </p>
          </div>

          {/* SEARCH BAR MOBILE */}
          <div
            className="d-block d-md-none w-100"
            style={{ maxWidth: "180px" }}
          >
            <div className="position-relative d-flex align-items-center">
              <input
                type="text"
                placeholder="Cerca..."
                className="form-control form-control-sm ps-4 rounded-pill"
                style={{
                  fontSize: "0.8rem",
                  borderColor: "#e2e8f0",
                  backgroundColor: "#f8fafc",
                }}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="position-absolute ms-2 text-muted"
                style={{ fontSize: "0.7rem" }}
              />
            </div>
          </div>
        </div>

        {/* 3. SEZIONE DESTRA: ICONS + SEARCH DESKTOP */}
        <div
          className="d-flex justify-content-end align-items-center"
          style={{ flex: 1 }}
        >
          <ul className="d-flex list-unstyled m-0 align-items-center gap-2 gap-md-3">
            {/* SEARCH DESKTOP CON TASTO AFFIANCATO */}
            <li className="d-none d-lg-flex align-items-center">
              <div className="d-flex align-items-center">
                <div className="position-relative">
                  <input
                    type="text"
                    placeholder="Cerca..."
                    className="form-control form-control-sm ps-4"
                    style={{
                      width: "150px",
                      fontSize: "0.8rem",
                      borderColor: "#e2e8f0",
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                      borderRight: "none",
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="position-absolute text-muted"
                    style={{
                      fontSize: "0.7rem",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                </div>
                <button
                  className="btn btn-dark btn-sm"
                  style={{
                    fontSize: "0.7rem",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    paddingRight: "12px",
                    fontWeight: "600",
                    height: "31px", // Allineato all'input sm
                  }}
                >
                  CERCA
                </button>
              </div>
            </li>

            <li>
              <NavLink to="/wishlist" className="text-dark p-2">
                <FontAwesomeIcon icon={faHeart} />
              </NavLink>
            </li>

            {/* CARRELLO CON PREVIEW AL PASSAGGIO DEL MOUSE */}
            <li
              className="position-relative"
              onMouseEnter={() => SetPreview(true)}
              onMouseLeave={() => SetPreview(false)}
            >
              <NavLink
                to="/cart"
                className="text-dark p-2 d-flex align-items-center"
                style={{ textDecoration: "none" }}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  size="lg"
                  style={{ color: "#0f172a" }}
                />
                {cart.length > 0 && (
                  <span
                    className="position-absolute translate-middle badge rounded-pill"
                    style={{
                      top: "8px",
                      left: "85%",
                      backgroundColor: "#d4af37",
                      color: "#000000",
                      fontSize: "0.7rem",
                      fontWeight: "800",
                      border: "2px solid #ffffff",
                    }}
                  >
                    {countProduct()}
                  </span>
                )}
              </NavLink>

              {/* ANTEPRIMA CARRELLO */}
              {previw && cart.length > 0 && (
                <div
                  className="position-absolute end-0 mt-2 shadow-lg border rounded-3 bg-white"
                  style={{ width: "340px", zIndex: 2100, top: "100%" }}
                >
                  <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center rounded-top">
                    <small
                      className="fw-bold text-muted text-uppercase"
                      style={{ letterSpacing: "1px" }}
                    >
                      Il tuo carrello
                    </small>
                    <span
                      className="badge rounded-pill bg-white text-dark border px-2 py-1"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {cart.length} prodotti
                    </span>
                  </div>

                  <ul
                    className="list-group list-group-flush"
                    style={{ maxHeight: "350px", overflowY: "auto" }}
                  >
                    {cart.map((c, index) => (
                      <li
                        key={index}
                        className="list-group-item py-3 px-3 border-bottom"
                      >
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded border shadow-sm"
                            style={{
                              width: "60px",
                              height: "60px",
                              flexShrink: 0,
                              backgroundImage: `url(http://localhost:3001/images/${c.url_image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex justify-content-between">
                              <h6
                                className="fw-bold mb-0 text-truncate"
                                style={{
                                  maxWidth: "130px",
                                  fontSize: "0.9rem",
                                }}
                              >
                                {c.name}
                              </h6>
                              <span
                                className="fw-bold text-dark"
                                style={{ fontSize: "0.9rem" }}
                              >
                                €{c.price}
                              </span>
                            </div>
                            <div className="mt-2">
                              <small
                                className="text-muted d-block"
                                style={{
                                  fontSize: "0.8rem",
                                  borderLeft: "2px solid #d4af37",
                                  paddingLeft: "8px",
                                }}
                              >
                                Quantità:{" "}
                                <span className="text-dark fw-bold">
                                  {c.quantity}
                                </span>
                              </small>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3 bg-white rounded-bottom">
                    <NavLink
                      to="/cart"
                      className="btn btn-dark w-100 py-2 fw-bold"
                      style={{ borderRadius: "8px", fontSize: "0.9rem" }}
                      onClick={() => SetPreview(false)}
                    >
                      Visualizza Carrello
                    </NavLink>
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
