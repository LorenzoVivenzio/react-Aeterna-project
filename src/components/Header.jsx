import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header>
      <div className="nav-bar fixed-top">
        {/* prova */}
        <div class="dropdown">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>

          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
        {/* fine prova */}
        <div className="nav d-none d-lg-flex">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/products">Prodotti</NavLink></li>
            <li><NavLink to="/about">Chi siamo</NavLink></li>
          </ul>
        </div>

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