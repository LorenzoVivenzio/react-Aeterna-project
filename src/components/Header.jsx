import { NavLink } from "react-router-dom";




export default function Header(){
    return(
    <>
          <div className="nav-bar fixed-top"> 
               <div className="nav">
          <ul>
            <NavLink to= "/">Home</NavLink>
            <NavLink to= "/product">Product</NavLink>
            <NavLink to= "/wishlist">Wishlist</NavLink>
          </ul>
        </div>
        <div className="logo">
          <h4>eternal</h4>
        </div>

        <div className="search-bar">
          <input className="input-nav" type="search" name="" id="" placeholder="trova il tuo articolo" />
          <button className="submit-nav" type="submit">Cerca</button>
        </div>
      </div>
    </>
)
}