import { useEffect, useState } from "react";
// css
import "./ShippingBanner.css";
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ShippingBanner() {
    const [visible, setVisible] = useState(true);

    
    useEffect(() => {
    // riprendo il potenziale tempo salvato dalla chiusura del banner
        const savedTime = localStorage.getItem("bannerClosedTime");


        if(savedTime) {
        // prendo la data attuale
            const now = Date.now();

        // calcolo i ms in un giorno
            const oneDay = 24 * 60 * 60 * 1000;

            // se è passato meno di un giorno non mostra di nuovo il banner
            if(now - savedTime < oneDay){
                setVisible(false);  
            } 
        }
    }, []);

    
    const closeBanner = () => {
        setVisible(false);
        
    // salvo il tempo in cui è stato chiuso il banner
        localStorage.setItem("bannerClosedTime", Date.now());
    }

    if (!visible) return null;
    return (
        <div className="banner">
            <div >
                Per odini superiori ai €1000, la spedizione è gratuita
            </div>
            <button
                className="banner-close"
                onClick={closeBanner}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );

}