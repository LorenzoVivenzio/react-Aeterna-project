import { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../API/axios.jsx";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true);

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

    if (cart.length === 0) return null;

    const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
    const shippingCost = subtotal >= 1000 ? 0 : 50;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mappa i campi per il backend Express (oggetti billing e customer)
        const payload = {
            customer: {
                email: formData.customer_email,
                shipping_name: formData.shipping_name,
                shipping_surname: formData.shipping_surname,
                shipping_street: formData.shipping_street,
                shipping_city: formData.shipping_city,
                shipping_postcode: formData.shipping_postcode,
                shipping_province_state: formData.shipping_province_state,
                shipping_country: formData.shipping_country,
                payment_method: formData.payment_method
            },
            billing: {
                name: isBillingSameAsShipping ? formData.shipping_name : formData.billing_name,
                surname: isBillingSameAsShipping ? formData.shipping_surname : formData.billing_surname,
                street: isBillingSameAsShipping ? formData.shipping_street : formData.billing_street,
                city: isBillingSameAsShipping ? formData.shipping_city : formData.billing_city,
                postcode: isBillingSameAsShipping ? formData.shipping_postcode : formData.billing_postcode,
                province_state: isBillingSameAsShipping ? formData.shipping_province_state : formData.billing_province_state,
                country: isBillingSameAsShipping ? formData.shipping_country : formData.billing_country
            },
            cart: cart.map(item => ({
                product_id: item.id, // <--- Fondamentale per il tuo controller
                quantity: item.quantity
            }))
        };

        try {
            const response = await api.post("/products", payload);
            if (response.status === 201) {
                alert("Ordine inviato!");
                clearCart();
                navigate("/");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Errore invio ordine");
        }
    };

    return (
        <div className="checkout-page bg-black text-white min-vh-100" style={{ paddingTop: "120px" }}>
            <div className="container pb-5">
                <form onSubmit={handleSubmit} className="row">
                    <div className="col-lg-8">
                        <div className="bg-dark p-4 rounded-4 border border-secondary mb-4">
                            <h4 className="text-primary fw-bold mb-4">1. SPEDIZIONE</h4>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <input type="email" name="customer_email" placeholder="Email" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="shipping_name" placeholder="Nome" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="shipping_surname" placeholder="Cognome" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                </div>
                                <div className="col-12 mb-3">
                                    <input type="text" name="shipping_street" placeholder="Indirizzo e Civico" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <input type="text" name="shipping_city" placeholder="Città" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <input type="text" name="shipping_postcode" placeholder="CAP" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <input type="text" name="shipping_province_state" placeholder="Provincia" required className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-dark p-4 rounded-4 border border-secondary">
                            <h4 className="text-primary fw-bold mb-4">2. FATTURAZIONE</h4>
                            <div className="form-check form-switch mb-3">
                                <input className="form-check-input" type="checkbox" checked={isBillingSameAsShipping} onChange={() => setIsBillingSameAsShipping(!isBillingSameAsShipping)} />
                                <label className="form-check-label">Usa dati spedizione</label>
                            </div>
                            {!isBillingSameAsShipping && (
                                <div className="row border-top border-secondary pt-4 mt-3">
                                    <div className="col-md-6 mb-3">
                                        <input type="text" name="billing_name" placeholder="Nome Fattura" className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" name="billing_surname" placeholder="Cognome Fattura" className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <input type="text" name="billing_street" placeholder="Indirizzo Fattura" className="form-control bg-black text-white border-secondary" onChange={handleChange} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="bg-primary bg-opacity-10 p-4 rounded-4 border border-primary">
                            <h4 className="fw-bold mb-4">RIEPILOGO</h4>
                            {cart.map(item => (
                                <div key={`summary-${item.id}`} className="d-flex justify-content-between small mb-1">
                                    <span>{item.name} x{item.quantity}</span>
                                    <span>{(item.price * item.quantity).toFixed(2)}€</span>
                                </div>
                            ))}
                            <hr/>
                            <div className="d-flex justify-content-between fs-4 fw-bold text-primary">
                                <span>TOTALE</span>
                                <span>{(subtotal + shippingCost).toFixed(2)}€</span>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 py-3 mt-4 fw-bold">ORDINA ORA</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}