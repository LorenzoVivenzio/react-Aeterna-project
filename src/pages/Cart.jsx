import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

    // Calcolo del totale 
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal >= 1000 ? 0 : 50;
    const total = subtotal + shipping;

    return (
        <div className="cart-page bg-black text-white min-vh-100" style={{ paddingTop: "120px" }}>
            <div className="container">
                <h1 className="display-5 fw-bold text-uppercase mb-5 text-primary">Il Tuo Carrello</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="lead opacity-50">Il carrello è vuoto.</p>
                        <Link to="/" className="btn btn-primary">Torna allo Shop</Link>
                    </div>
                ) : (
                    <div className="row">
                        {/* COLONNA SINISTRA: LISTA PRODOTTI */}
                        <div className="col-lg-8">
                            {cart.map((item) => (
                                <div key={item.id} className="d-flex align-items-center bg-dark p-3 rounded-4 mb-3 border border-secondary shadow-sm">
                                    <img
                                        src={`http://localhost:3001/images/${item.url_image}`}
                                        alt={item.name}
                                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                        className="rounded border border-primary me-4"
                                    />

                                    <div className="flex-grow-1">
                                        <h5 className="mb-0 fw-bold">{item.name}</h5>
                                        <p className="text-info mb-0">{Number(item.price).toFixed(2)}€</p>
                                    </div>

                                    {/* SELETTORE QUANTITÀ */}
                                    <div className="d-flex align-items-center gap-3 mx-4">
                                        <button 
                                            className="btn btn-sm btn-outline-light"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >-</button>
                                        <span className="fw-bold">{item.quantity}</span>
                                        <button 
                                            className="btn btn-sm btn-outline-light"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >+</button>
                                    </div>

                                    <button onClick={() => removeFromCart(item.id)} className="btn btn-outline-danger btn-sm border-0">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            ))}
                            <button onClick={clearCart} className="btn btn-sm btn-link text-secondary mt-2">
                                Svuota carrello
                            </button>
                        </div>

                        {/* COLONNA DESTRA: RIEPILOGO */}
                        <div className="col-lg-4">
                            <div className="bg-primary bg-opacity-10 p-4 rounded-4 border border-primary sticky-top" style={{ top: "140px" }}>
                                <h4 className="mb-4 text-uppercase fw-bold">Riepilogo</h4>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotale</span>
                                    <span>{subtotal.toFixed(2)}€</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span>Spedizione</span>
                                    <span className={shipping === 0 ? "text-success" : ""}>
                                        {shipping === 0 ? "Gratis" : `${shipping.toFixed(2)}€`}
                                    </span>
                                </div>
                                <hr className="border-secondary" />
                                <div className="d-flex justify-content-between mb-4 fw-bold fs-4">
                                    <span>Totale</span>
                                    <span className="text-primary">{total.toFixed(2)}€</span>
                                </div>
                                <Link to="/checkout" className="btn btn-primary w-100 py-3 fw-bold text-uppercase">
                                    Procedi al Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}