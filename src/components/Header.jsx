import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="nav-bar fixed-top">
      <div className="nav">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/products">Prodotti</NavLink></li>
          <li><NavLink to="/wishlist">Wishlist</NavLink></li>
        </ul>
      </div>
      <div className="logo">
        <h4>ETERNAL</h4>
      </div>
      {/* La search-bar è stata rimossa da qui */}
    </div>
  );
}