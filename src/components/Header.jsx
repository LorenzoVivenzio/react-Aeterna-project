import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="nav-bar fixed-top">
      <div className="nav">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/products">Prodotti</NavLink></li>
          <li><NavLink to="/chi-siamo">Chi siamo?</NavLink></li>
        </ul>
      </div>
      <div className="logo">
        <div className="logo-img">
          <img src="src/public/img/logo-Aeterna.jpg" alt="" />
        </div>
      </div>
            <div className="icons-nav">
          <ul>
            <li>preferiti</li>
            <li>carello</li>
          </ul>
        </div>
    </div>
  );
}