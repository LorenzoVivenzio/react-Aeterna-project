import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";



export default function Header() {


  return (
    <header className="nav-bar fixed-top header-border-bot ">
      {/* OFFCANVAS------------------- */}
      <div className="d-md-none">
        <button className="btn-custom d-md-none anta-head" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">Menu</button>

        <div className="offcanvas-md offcanvas-start" tabIndex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
          <div className="offcanvas-header anta-head">
            <h5 className="offcanvas-title " id="offcanvasResponsiveLabel">Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
          </div>
          {/* BODY OFFCANVAS---------- */}
          <div className="offcanvas-body d-md-none ">
            <ul className="d-flex row ">
              <li className="anta-head li-bord-bot"><NavLink to="/">Home</NavLink></li>
              <li className="anta-head li-bord-bot"><NavLink to="/products">Prodotti</NavLink></li>
              <li className="anta-head li-bord-bot"><NavLink to="/about">Chi siamo</NavLink></li>
            </ul>
          </div>
        </div>
      </div>

      {/* LINKS--------------------------- */}
      <div className="nav d-none d-md-flex">
        <ul>
          <li className="anta-head bold"><NavLink to="/">Home</NavLink></li>
          <li className="anta-head bold"><NavLink to="/products">Prodotti</NavLink></li>
          <li className="anta-head bold"><NavLink to="/about">Chi siamo</NavLink></li>
        </ul>
      </div>

      {/* LOGO---------------------------- */}
      <div className="logo2">
        <p className="main-title">AETERNA</p>
      </div>

      {/* ICONS------------------------------- */}
      <div className="icons-nav">
        <ul>
          <li className="">
            <NavLink to="/wishlist"><FontAwesomeIcon icon={faHeart} /></NavLink>
          </li>

          <li>
            <NavLink to="/cart"><FontAwesomeIcon icon={faCartShopping} /></NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

// <div className="nav-bar fixed-top">
//   <div className="nav d-none d-lg-flex">
//
//     <ul>
//       <li><NavLink to="/">Home</NavLink></li>
//       <li><NavLink to="/products">Prodotti</NavLink></li>
//       <li><NavLink to="/about">Chi siamo</NavLink></li>
//     </ul>
//
//   </div>

//   <div className="logo">
//     <div className="logo-img">
//       <p className="main-title">AETERNA</p>
//     </div>
//   </div>
//   <div className="icons-nav">
//     <ul>
//       <li>
//         <NavLink to="/wishlist"><FontAwesomeIcon icon={faHeart} /></NavLink>
//       </li>

//       <li>
//         <NavLink to="/cart"><FontAwesomeIcon icon={faCartShopping} /></NavLink>
//       </li>
//     </ul>
//   </div>
// </div>