import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useCart } from "../context/CartContext.jsx";
import { useEffect, useState } from "react";

export default function Header() {
  const { cart, previw } = useCart();
  console.log(cart, previw);
  function countProduct() {
    let countQuantity = 0;
    cart.forEach((p) => {
      countQuantity += p.quantity;
    });
    return countQuantity;
  }

  return (
    <header className="nav-bar fixed-top header-border-bot bg-white shadow-sm">
      <div className="container-fluid d-flex align-items-center justify-content-between py-2">
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

        <div className="logo2">
          <p className="main-title m-0 fw-bold">AETERNA</p>
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
                    className="position-absolute translate-middle badge rounded-pill"
                    style={{
                      top: "8px",
                      left: "85%",
                      backgroundColor: "#0f172a",
                      color: "#38bdf8",
                      fontSize: "0.7rem",
                      border: "2px solid #ffffff",
                    }}
                  >
                    {countProduct()}
                  </span>
                )}
              </NavLink>

              {/* ANTEPRIMA CARRELLO CORRETTA */}
              {previw && cart.length > 0 && (
                <div
                  className="position-absolute end-0 mt-2 shadow-lg border rounded-3 bg-white"
                  style={{ width: "340px", zIndex: 1050, top: "100%" }}
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
                    {cart.map((c, index) => {
                      const imageUrl = `http://localhost:3001/images/${c.url_image}`;
                      return (
                        <li
                          key={index}
                          className="list-group-item py-3 px-3 border-bottom"
                        >
                          <div className="d-flex align-items-center">
                            <div
                              className="rounded border shadow-sm"
                              style={{
                                width: "70px",
                                height: "70px",
                                flexShrink: 0,
                                backgroundImage: `url(${imageUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundColor: "#f8fafc",
                              }}
                            />

                            <div className="flex-grow-1 ms-3">
                              <div className="d-flex justify-content-between align-items-start w-100">
                                <h6
                                  className="fw-bold text-dark mb-0 text-truncate"
                                  style={{
                                    fontSize: "0.9rem",
                                    maxWidth: "140px",
                                  }}
                                >
                                  {c.name}
                                </h6>
                                <span
                                  className="fw-bold text-dark ms-2"
                                  style={{
                                    fontSize: "0.9rem",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  €{c.price}
                                </span>
                              </div>

                              <div className="mt-2">
                                <small
                                  className="text-muted d-block"
                                  style={{
                                    fontSize: "0.8rem",
                                    letterSpacing: "0.3px",
                                    borderLeft: "2px solid #38bdf8", // Un piccolo tocco di colore laterale
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
                      );
                    })}
                  </ul>

                  <div className="p-3 bg-white rounded-bottom">
                    <NavLink
                      to="/cart"
                      className="btn btn-dark w-100 py-2 fw-bold"
                      style={{ borderRadius: "8px", fontSize: "0.9rem" }}
                      onClick={() => SetPreview(false)}
                    >
                      Visualizza Carrello intero
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
