import { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../API/axios.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Checkout() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    
    // Stato per gestire il toggle della fatturazione
    const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true);

    // Stato del Form
    const [formData, setFormData] = useState({
        customer_email: "",
        shipping_name: "",
        shipping_surname: "",
        shipping_street: "",
        shipping_city: "",
        shipping_postcode: "",
        shipping_province_state: "",
        shipping_country: "Italia",
        
        billing_name: "",
        billing_surname: "",
        billing_street: "",
        billing_city: "",
        billing_postcode: "",
        billing_province_state: "",
        billing_country: "Italia",
        
        payment_method: "Credit Card"
    });

    // Protezione: se il carrello è vuoto, rimanda l'utente indietro
    if (cart.length === 0) {
        return (
            <div className="container text-center text-white" style={{ paddingTop: "200px" }}>
                <h2 className="display-6 fw-bold text-uppercase">Il tuo carrello è vuoto</h2>
                <p className="opacity-50">Aggiungi dei prodotti prima di procedere al pagamento.</p>
                <Link to="/products" className="btn btn-primary mt-3 text-uppercase fw-bold">Vai ai prodotti</Link>
            </div>
        );
    }

    // Calcoli totali (Usiamo Number() per sicurezza)
    const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
    const shippingCost = subtotal >= 1000 ? 0 : 50;
    const totalAmount = subtotal + shippingCost;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const billingInfo = isBillingSameAsShipping ? {
            billing_name: formData.shipping_name,
            billing_surname: formData.shipping_surname,
            billing_street: formData.shipping_street,
            billing_city: formData.shipping_city,
            billing_postcode: formData.shipping_postcode,
            billing_province_state: formData.shipping_province_state,
            billing_country: formData.shipping_country
        } : {
            billing_name: formData.billing_name,
            billing_surname: formData.billing_surname,
            billing_street: formData.billing_street,
            billing_city: formData.billing_city,
            billing_postcode: formData.billing_postcode,
            billing_province_state: formData.billing_province_state,
            billing_country: formData.billing_country
        };

        const finalPayload = {
            ...formData,
            ...billingInfo,
            subtotal,
            shipping_cost: shippingCost,
            total_amount: totalAmount,
            cart_items: cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                unit_price: item.price
            }))
        };

        try {
            const response = await api.post("/orders", finalPayload);
            if (response.status === 200 || response.status === 201) {
                alert("Ordine confermato!");
                clearCart();
                navigate("/"); 
            }
        } catch (err) {
            console.error("Errore invio ordine:", err);
            alert("Errore durante l'invio dell'ordine. Riprova.");
        }
    };

    return (
        <div className="checkout-page bg-black text-white min-vh-100" style={{ paddingTop: "120px" }}>
            <div className="container pb-5">
                
                {/* HEADER CON TASTO TORNA AL CARRELLO */}
                <div className="d-flex align-items-center mb-5">
                    <button 
                        onClick={() => navigate("/cart")} 
                        className="btn btn-outline-primary btn-sm me-4 d-flex align-items-center gap-2"
                    >
                        <i className="bi bi-chevron-left"></i> Torna al Carrello
                    </button>
                    <h1 className="display-5 fw-bold text-uppercase m-0">Checkout</h1>
                </div>
                
                <form onSubmit={handleSubmit} className="row">
                    {/* COLONNA SINISTRA: DATI */}
                    <div className="col-lg-8">
                        {/* SEZIONE SPEDIZIONE */}
                        <div className="bg-dark p-4 rounded-4 border border-secondary mb-4 shadow-sm">
                            <h4 className="mb-4 text-uppercase fw-bold text-primary small">1. Indirizzo di Spedizione</h4>
                            <div className="mb-3">
                                <label className="small opacity-50">Email di contatto</label>
                                <input type="email" name="customer_email" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="small opacity-50">Nome</label>
                                    <input type="text" name="shipping_name" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="small opacity-50">Cognome</label>
                                    <input type="text" name="shipping_surname" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="small opacity-50">Indirizzo (Via, civico, interno)</label>
                                <input type="text" name="shipping_street" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                            </div>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label className="small opacity-50">Città</label>
                                    <input type="text" name="shipping_city" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="small opacity-50">CAP</label>
                                    <input type="text" name="shipping_postcode" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="small opacity-50">Provincia</label>
                                    <input type="text" name="shipping_province_state" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* SEZIONE FATTURAZIONE */}
                        <div className="bg-dark p-4 rounded-4 border border-secondary mb-4 shadow-sm">
                            <h4 className="mb-4 text-uppercase fw-bold text-primary small">2. Fatturazione</h4>
                            <div className="form-check form-switch mb-4">
                                <input 
                                    className="form-check-input shadow-none" 
                                    type="checkbox" 
                                    role="switch" 
                                    id="checkBilling" 
                                    checked={isBillingSameAsShipping} 
                                    onChange={() => setIsBillingSameAsShipping(!isBillingSameAsShipping)} 
                                />
                                <label className="form-check-label ms-2" htmlFor="checkBilling">L'indirizzo di fatturazione coincide con la spedizione</label>
                            </div>

                            {!isBillingSameAsShipping && (
                                <div className="row border-top border-secondary pt-4 mt-2">
                                    <div className="col-md-6 mb-3">
                                        <label className="small opacity-50">Nome (Fattura)</label>
                                        <input type="text" name="billing_name" className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="small opacity-50">Cognome (Fattura)</label>
                                        <input type="text" name="billing_surname" className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="small opacity-50">Indirizzo Fatturazione</label>
                                        <input type="text" name="billing_street" className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="small opacity-50">Città</label>
                                        <input type="text" name="billing_city" className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="small opacity-50">Provincia</label>
                                        <input type="text" name="billing_province_state" className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* COLONNA DESTRA: RIEPILOGO */}
                    <div className="col-lg-4">
                        <div className="bg-primary bg-opacity-10 p-4 rounded-4 border border-primary sticky-top" style={{ top: "140px" }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="text-uppercase fw-bold m-0">Riepilogo</h4>
                                <Link to="/cart" className="text-primary small text-decoration-none fw-bold">Modifica</Link>
                            </div>

                            <div className="mb-4 border-bottom border-secondary pb-3">
                                {cart.map(item => (
                                    <div key={item.id} className="d-flex justify-content-between small mb-2">
                                        <span className="opacity-75">{item.name} <span className="text-primary">x{item.quantity}</span></span>
                                        <span>{(Number(item.price) * item.quantity).toFixed(2)}€</span>
                                    </div>
                                ))}
                            </div>

                            <div className="d-flex justify-content-between mb-2 small">
                                <span className="opacity-50">Subtotale</span>
                                <span>{subtotal.toFixed(2)}€</span>
                            </div>
                            <div className="d-flex justify-content-between mb-4 small">
                                <span className="opacity-50">Spedizione</span>
                                <span className={shippingCost === 0 ? "text-success fw-bold" : ""}>
                                    {shippingCost === 0 ? "Gratis" : `${shippingCost.toFixed(2)}€`}
                                </span>
                            </div>
                            <hr className="border-primary opacity-25" />
                            <div className="d-flex justify-content-between mb-4 fs-3 fw-bold">
                                <span>TOTALE</span>
                                <span className="text-primary">{totalAmount.toFixed(2)}€</span>
                            </div>
                            
                            <button type="submit" className="btn btn-primary w-100 py-3 text-uppercase fw-bold shadow-lg">
                                Conferma e Paga
                            </button>
                            <p className="text-center small opacity-25 mt-3 mb-0">Transazione sicura e crittografata</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}