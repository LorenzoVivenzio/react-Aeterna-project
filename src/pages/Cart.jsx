import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

    const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
    const shipping = subtotal >= 1000 ? 0 : 50;
    const total = subtotal + shipping;

    return (
        <div className="cart-page bg-black text-white min-vh-100" style={{ paddingTop: "120px" }}>
            <div className="container pb-5">
                <h1 className="display-5 fw-bold text-uppercase mb-5 text-primary">Il Tuo Carrello</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="lead opacity-50 mb-4">Il carrello è vuoto.</p>
                        <Link to="/products" className="btn btn-primary px-5 py-3 fw-bold">TORNA ALLO SHOP</Link>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-lg-8">
                            {cart.map((item) => (
                                <div key={`cart-item-${item.slug}`} className="d-flex align-items-center bg-dark p-3 rounded-4 mb-3 border border-secondary shadow">
                                    <img
                                        src={`http://localhost:3001/images/${item.url_image}`}
                                        alt={item.name}
                                        style={{ width: "90px", height: "90px", objectFit: "cover" }}
                                        className="rounded-3 border border-primary me-4"
                                    />
                                    <div className="flex-grow-1">
                                        <h5 className="mb-0 fw-bold">{item.name}</h5>
                                        <p className="text-info mb-0 fw-semibold">{Number(item.price).toFixed(2)}€</p>
                                    </div>
                                    
                                    {/* CONTROLLI QUANTITÀ: Usiamo item.slug */}
                                    <div className="d-flex align-items-center gap-3 mx-4 bg-black rounded-pill p-1 border border-secondary">
                                        <button 
                                            className="btn btn-sm btn-outline-primary rounded-circle border-0" 
                                            onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                                            style={{ width: "32px", height: "32px" }}
                                        > - </button>
                                        <span className="fw-bold px-2" style={{ minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                                        <button 
                                            className="btn btn-sm btn-outline-primary rounded-circle border-0" 
                                            onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                                            style={{ width: "32px", height: "32px" }}
                                        > + </button>
                                    </div>

                                    {/* RIMOZIONE: Usiamo item.slug */}
                                    <button 
                                        onClick={() => removeFromCart(item.slug)} 
                                        className="btn btn-link text-danger p-0 border-0 me-2"
                                        title="Rimuovi prodotto"
                                    >
                                        <i className="bi bi-trash3-fill fs-5"></i> Elimina
                                    </button>
                                </div>
                            ))}
                            <button onClick={clearCart} className="btn btn-outline-secondary btn-sm mt-3 opacity-75">Svuota carrello</button>
                        </div>

                        <div className="col-lg-4">
                            <div className="bg-dark p-4 rounded-4 border border-primary sticky-top shadow-lg" style={{ top: "140px" }}>
                                <h4 className="mb-4 text-uppercase fw-bold text-center">Riepilogo</h4>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="opacity-75">Subtotale</span>
                                    <span>{subtotal.toFixed(2)}€</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="opacity-75">Spedizione</span>
                                    <span className={shipping === 0 ? "text-success fw-bold" : ""}>
                                        {shipping === 0 ? "GRATIS" : `${shipping.toFixed(2)}€`}
                                    </span>
                                </div>
                                <hr className="border-secondary mb-4" />
                                <div className="d-flex justify-content-between mb-4 fw-bold fs-3">
                                    <span>TOTALE</span>
                                    <span className="text-primary">{total.toFixed(2)}€</span>
                                </div>
                                <Link to="/checkout" className="btn btn-primary w-100 py-3 fw-bold text-uppercase shadow">
                                    Procedi al Checkout
                                </Link>
                                <p className="small text-center mt-3 opacity-50">Spedizione gratuita sopra i 1000€</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}