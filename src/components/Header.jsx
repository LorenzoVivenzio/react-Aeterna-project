import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header>
      <div className="nav-bar fixed-top">
        {/* prova */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container-fluid">

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarMenu"
              aria-controls="navbarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarMenu">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/products" className="nav-link">Prodotti</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link">Chi siamo</NavLink>
                </li>
              </ul>
            </div>

          </div>
        </nav>
        {/* class="nav-link" */}
        {/* fine prova */}
        {/* <div className="nav">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/products">Prodotti</NavLink></li>
          <li><NavLink to="/about">Chi siamo</NavLink></li>
        </ul>
      </div> */}
        <div className="logo">
          <div className="logo-img">
            <p className="main-title">AETERNA</p>
          </div>
        </div>
        <div className="icons-nav">
          <ul>
            <li>
              <NavLink to="/wishlist"><FontAwesomeIcon icon={faHeart} /></NavLink>
            </li>

            <li>
              <NavLink to="/cart"><FontAwesomeIcon icon={faCartShopping} /></NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}