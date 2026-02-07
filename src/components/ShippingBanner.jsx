import { useEffect, useState } from "react";
// css
import "./ShippingBanner.css";
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ShippingBanner() {
    const [visible, setVisible] = useState(true);

    // renderizza una volta, se è stato cliccata la X non renderizza nulla
    useEffect(() => {
        if(localStorage.getItem("bannerClosed")) {
            setVisible(false);
        }
    }, []);

    // chiude il badge e mette in localStorage bannerClosed, ricollegandosi all'if precedente
    const closeBanner = () => {
        setVisible(false);
        localStorage.setItem("bannerClosed", "true")
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