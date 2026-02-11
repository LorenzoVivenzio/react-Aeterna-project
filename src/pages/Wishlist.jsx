import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import {useCart}from "../context/CartContext";
import "./Cart.css"

export default function Wishlist() {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
       const { addToCart  } = useCart();

    return (
        <>

             <div className="cart-page  text-white min-vh-100" style={{ paddingTop: "120px" }}>
                <div className="container pb-5">
                  <h1 className="display-5 fw-bold text-uppercase mb-5 cart-title">i tuoi preferiti</h1>


                    {wishlist.length === 0 ? (
                        <div className="text-center py-5">
                           <p className="text-gray mb-4">La tua lista  dei Preferiti è vuota.</p>
                            <Link to="/products" className="btn-gold px-5 py-3 fw-bold">TORNA ALLO SHOP</Link>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-lg-8">
                                {wishlist.map((item) => (






                                    <div key={item.slug} className="d-flex align-items-center bg-dark p-3 rounded-4 mb-3 border border-secondary shadow">
                                        <img src={`http://localhost:3001/images/${item.url_image}`}
                                            alt={item.name}
                                            style={{ width: "90px", height: "90px", objectFit: "cover" }}
                                            className="rounded-3 border border-primary me-4"
                                        />
                                        <div className="flex-grow-1">
                                            <h5 className="mb-0 fw-bold">{item.name}</h5>
                                            <p className="text-info mb-0 fw-semibold">{Number(item.price).toFixed(2)}€</p>
                                        </div>
                                        <button onClick ={()=>addToCart(item.slug)}></button>
                                        <button onClick={()=>removeFromWishlist(item.slug)}
                                            className="btn btn-link text-danger p-0 border-0 me-2" 
                                             title="Rimuovi prodotto">
                                            Elimina
                                        </button>
                                    </div>
                                                                       
                                ))}
                                <button onClick={clearWishlist} 
                                className="btn btn-outline-secondary btn-sm mt-3 opacity-75">
                                    Svuota Lista Preferiti
                                </button>
                            </div>
                        </div>
                    )

                    }

                </div>
            </div>
        </>

    );
}