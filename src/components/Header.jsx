import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useCart } from "../context/CartContext.jsx";
import { useEffect, useState } from "react";

export default function Header() {
  const [previw, SetPreview] = useState(false);

  const { cart, addToCart } = useCart();
  console.log(cart);
  function countProduct() {
    let countQuantity = 0;
    cart.forEach((p) => {
      countQuantity += p.quantity;
    });
    return countQuantity;
  }

  useEffect(() => {
    SetPreview(true);

    setTimeout(() => {
      SetPreview(false);
    }, 3000);
  }, [cart]);
  return (
    <header className="nav-bar fixed-top header-border-bot">
      <div className="container-fluid d-flex align-items-center justify-content-between py-2">
        <div className="d-md-none">
          <button
            className="btn-custom anta-head"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasResponsive"
            aria-controls="offcanvasResponsive"
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
                data-bs-target="#offcanvasResponsive"
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

        {/* LOGO CENTRAL */}
        <div className="logo2">
          <p className="main-title m-0">AETERNA</p>
        </div>

        {/* ICONS (WISHLIST & CART) */}
        <div className="icons-nav">
          <ul className="d-flex list-unstyled m-0 align-items-center gap-3">
            <li>
              <NavLink to="/wishlist" className="text-dark">
                <FontAwesomeIcon icon={faHeart} />
              </NavLink>
            </li>

            <li className="position-relative d-inline-block list-unstyled">
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

                {cart.length === 0 ? (
                  ""
                ) : (
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    {countProduct()}
                  </span>
                )}
              </NavLink>
            </li>
            <div className="card-header">
              <ul className="list-group list-group-flush">
                {previw &&
                  cart.map((c, index) => {
                    return (
                      <li key={index} className="list-group-item">
                        A second item
                      </li>
                    );
                  })}
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
}
