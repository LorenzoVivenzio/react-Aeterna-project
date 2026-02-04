import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="nav-bar fixed-top">
      <div className="nav">
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
              <NavLink to = "/wishlist"><FontAwesomeIcon icon={faHeart} /></NavLink>
              </li>

            <li>
              <NavLink to = "/cart"><FontAwesomeIcon icon={faCartShopping} /></NavLink>
              </li>
          </ul>
        </div>
    </div>
  );
}