import { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../API/axios.jsx";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"

export default function Checkout() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    // STATI AGGIUNTI
    const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true);
    const [isOrdered, setIsOrdered] = useState(false); // Per mostrare il successo
    const [orderData, setOrderData] = useState(null); // Per i dati ricevuti dal server

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
        payment_method: "Credit Card" // Valore iniziale
    });

    if (cart.length === 0 && !isOrdered) return null;

    const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
    const shippingCost = subtotal >= 1000 ? 0 : 50;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                product_slug: item.slug, // MODIFICATO: ora usa lo slug per il backend
                quantity: item.quantity
            }))
        };

        try {
            // Invio al tuo endpoint Express
            const response = await api.post("/orders", payload);
            if (response.status === 201) {
                setOrderData(response.data); // Salviamo la risposta (ID ordine, fattura, etc)
                setIsOrdered(true); // Attiviamo la vista di successo
                clearCart();
            }
        } catch (err) {
            alert(err.response?.data?.message || "Errore invio ordine");
        }
    };

    // SE L'ORDINE È ANDATO A BUON FINE, MOSTRA QUESTO:
    if (isOrdered) {
        return (
            <div className="container text-center text-white" style={{ paddingTop: "200px", minHeight: "100vh" }}>
                <div className=" p-5 ordine-confermato shadow-lg d-inline-block">
                    <i className="bi bi-check-circle-fill text-primary display-1 mb-4"></i>
                    <h1 className="fw-bold text-uppercase title-order">Ordine Confermato!</h1>
                    <p className="lead opacity-75 text-grazie">Grazie per aver scelto la tecnologia Aeterna.</p>
                    <hr className="border-secondary my-4" />
                    <p className="mb-1 text-grazie">ID Ordine: <span className="text-gold fw-bold">#{orderData?.ordine_id}</span></p>
                    <p className="mb-4 text-grazie">Fattura: <span className="text-gold">{orderData?.fattura}</span></p>
                    <button onClick={() => navigate("/")} className="order-btn px-5 py-3 fw-bold">TORNA ALLA HOME</button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page  text-white min-vh-100" style={{ paddingTop: "120px" }}>
            <div className="container pb-5">
                <form onSubmit={handleSubmit} className="row">
                    <div className="col-lg-8">
                        {/* 1. SPEDIZIONE */}
                        <div className="p-4 border-checkout mb-4">
                            <h4 className="fw-bold mb-4">1. SPEDIZIONE</h4>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="customer_email" className="px-2">Email:</label>
                                    <input type="email" name="customer_email" placeholder="Email" required className="form-control input-checkout" onChange={handleChange} />

                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="shipping_name" className="px-2">Nome:</label>
                                    <input type="text" name="shipping_name" placeholder="Nome" required className="form-control input-checkout" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="shipping_surname" className="px-2">Cognome:</label>
                                    <input type="text" name="shipping_surname" placeholder="Cognome" required className="form-control input-checkout" onChange={handleChange} />
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="shipping_street" className="px-2">Indirizzo:</label>
                                    <input type="text" name="shipping_street" placeholder="Indirizzo e Civico" required className="form-control input-checkout" onChange={handleChange} />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="shipping_city" className="px-2">Città:</label>
                                    <input type="text" name="shipping_city" placeholder="Città" required className="form-control input-checkout" onChange={handleChange} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="shipping_postcode" className="px-2">CAP:</label>
                                    <input type="text"
                                        name="shipping_postcode"
                                        placeholder="CAP"
                                        maxLength={5}
                                        inputMode="numeric"
                                        required className="form-control input-checkout"
                                        onChange={handleChange} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="shipping_province_state" className="px-2">Provincia:</label>
                                    <input type="text" name="shipping_province_state" placeholder="Provincia" required className="form-control input-checkout" onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* 2. FATTURAZIONE */}
                        <div className=" p-4 border-checkout mb-4">
                            <h4 className="fw-bold mb-4">2. FATTURAZIONE</h4>
                            <div className="form-check form-switch mb-3">
                                <input className="form-check-input" type="checkbox" checked={isBillingSameAsShipping} onChange={() => setIsBillingSameAsShipping(!isBillingSameAsShipping)} />
                                <label className="form-check-label">Usa dati spedizione</label>
                            </div>
                            {!isBillingSameAsShipping && (
                                <div className="row border-top border-secondary pt-4 mt-3">
                                    <div className="col-md-6 mb-3">
                                        <input type="text" name="billing_name" placeholder="Nome Fattura" className="form-control input-checkout" onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" name="billing_surname" placeholder="Cognome Fattura" className="form-control input-checkout" onChange={handleChange} />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <input type="text" name="billing_street" placeholder="Indirizzo Fattura" className="form-control input-checkout" onChange={handleChange} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 3. METODO DI PAGAMENTO (INTEGRATO) */}
                        <div className=" p-4 border-checkout mb-4">
                            <h4 className="fw-bold mb-4">3. METODO DI PAGAMENTO</h4>
                            <div className="row">
                                <div className="col-12">
                                    <select
                                        name="payment_method"
                                        className="form-select payment_method py-3"
                                        onChange={handleChange}
                                        value={formData.payment_method}
                                    >
                                        <option value="Credit Card">Carta di Credito</option>
                                        <option value="PayPal">PayPal</option>
                                        <option value="Crypto">Neural Transfer (Crypto)</option>
                                        <option value="Bank Transfer">Bonifico Bancario</option>
                                    </select>
                                    <p className="small opacity-50 mt-2 text-center">Transazione sicura e crittografata.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className=" p-4 riepilogo sticky-top shadow-lg" style={{ top: "140px" }}>
                            <h4 className="fw-bold mb-4 text-center text-uppercase border-bottom">Riepilogo</h4>
                            <hr />
                            <div className="d-flex justify-content-between fs-3  mb-4 ">
                                <h4 className="totale anta-font">TOTALE:</h4>
                                <span className="totale fw-bold">{(subtotal + shippingCost).toFixed(2)}€</span>
                            </div>
                            <button type="submit" className="order-btn w-100 py-3 fw-bold text-uppercase shadow">
                                ORDINA ORA
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}