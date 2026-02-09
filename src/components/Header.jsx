import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useCart } from "../context/CartContext.jsx";
import { useEffect, useState } from "react";

export default function Header() {
  const [previw, SetPreview] = useState(false);
  const { cart } = useCart();

  function countProduct() {
    let countQuantity = 0;
    cart.forEach((p) => {
      countQuantity += p.quantity;
    });
    return countQuantity;
  }

  useEffect(() => {
    SetPreview(true);
    const timer = setTimeout(() => {
      SetPreview(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [cart]);

  return (
    <header className="nav-bar fixed-top header-border-bot bg-white">
      <div className="container-fluid d-flex align-items-center justify-content-between py-2">
        {/* MOBILE MENU */}
        <div className="d-md-none">
          <button
            className="btn-custom anta-head"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasResponsive"
          >
            Menu
          </button>

          <div
            className="offcanvas-md offcanvas-start"
            tabIndex="-1"
            id="offcanvasResponsive"
          >
            <div className="offcanvas-header anta-head">
              <h5 className="offcanvas-title">Menu</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="list-unstyled">
                <li className="anta-head li-bord-bot py-2">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="anta-head li-bord-bot py-2">
                  <NavLink to="/products">Prodotti</NavLink>
                </li>
                <li className="anta-head li-bord-bot py-2">
                  <NavLink to="/about">Chi siamo</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <div className="nav d-none d-md-flex">
          <ul className="d-flex list-unstyled m-0 gap-4">
            <li className="anta-head bold">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="anta-head bold">
              <NavLink to="/products">Prodotti</NavLink>
            </li>
            <li className="anta-head bold">
              <NavLink to="/about">Chi siamo</NavLink>
            </li>
          </ul>
        </div>

        <div className="logo2">
          <p className="main-title m-0">AETERNA</p>
        </div>

        <div className="icons-nav position-relative">
          <ul className="d-flex list-unstyled m-0 align-items-center gap-3">
            <li>
              <NavLink to="/wishlist" className="text-dark">
                <FontAwesomeIcon icon={faHeart} />
              </NavLink>
            </li>

            <li className="position-relative">
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
                    className="position-absolute translate-middle badge rounded-pill shadow-sm"
                    style={{
                      top: "8px",
                      left: "85%",
                      backgroundColor: "#0f172a",
                      color: "#38bdf8",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      padding: "0.4em 0.6em",
                      border: "2px solid #ffffff",
                      minWidth: "1.6rem",
                    }}
                  >
                    {countProduct()}
                  </span>
                )}
              </NavLink>

              {previw && cart.length > 0 && (
                <div
                  className="position-absolute end-0 mt-2 shadow-lg border rounded-3 bg-white cart-preview-container"
                  style={{ width: "320px", zIndex: 1050, top: "100%" }}
                >
                  <div className="p-2 border-bottom bg-light rounded-top">
                    <small className="fw-bold text-muted px-2">
                      RECENTEMENTE AGGIUNTO
                    </small>
                  </div>

                  <ul
                    className="list-group list-group-flush cart-preview-list"
                    style={{ maxHeight: "320px", overflowY: "auto" }}
                  >
                    {cart.map((c, index) => {
                      const imageUrl = `http://localhost:3001/images/${c.url_image}`;
                      return (
                        <li
                          key={index}
                          className="list-group-item cart-item border-bottom py-3 px-3"
                        >
                          <div className="d-flex align-items-center">
                            <div
                              className="img-container rounded me-3 shadow-sm"
                              style={{
                                width: "65px",
                                height: "65px",
                                flexShrink: 0,
                                backgroundImage: `url(${imageUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundColor: "#f8fafc",
                                border: "1px solid #e2e8f0",
                              }}
                            />

                            <div className="flex-grow-1 overflow-hidden">
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <h6
                                  className="fw-bolder mb-0 text-truncate"
                                  style={{
                                    fontSize: "0.9rem",
                                    color: "#1e293b",
                                    letterSpacing: "-0.2px",
                                    maxWidth: "150px",
                                  }}
                                  title={c.name}
                                >
                                  {c.name}
                                </h6>
                                <span
                                  className="fw-bold text-end"
                                  style={{
                                    fontSize: "0.95rem",
                                    color: "#0f172a",
                                    minWidth: "fit-content",
                                    marginLeft: "10px",
                                  }}
                                >
                                  €
                                  {c.price.toLocaleString("it-IT", {
                                    minimumFractionDigits: 2,
                                  })}
                                </span>
                              </div>

                              <div className="d-flex justify-content-between align-items-center mt-2">
                                <small
                                  className="text-muted"
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  Quantità: <b>{c.quantity}</b>
                                </small>
                                <small
                                  className="text-uppercase fw-bold"
                                  style={{
                                    fontSize: "0.6rem",
                                    color: "#38bdf8",
                                  }}
                                >
                                  {c.diets}
                                </small>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="p-2 text-center bg-light rounded-bottom">
                    <NavLink
                      to="/cart"
                      className="btn btn-sm btn-dark w-100 py-2"
                      onClick={() => SetPreview(false)}
                    >
                      Vai al carrello
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
