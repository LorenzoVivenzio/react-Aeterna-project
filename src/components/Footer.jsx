// ------------FontAwesome------------
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
// ----------------CSS----------------
import './Footer.css'
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();

    // Funzione per navigare e resettare lo scroll
    const handleNavigation = (path) => {
        window.scrollTo(0, 0);
        navigate(path);
    };

    return (
        <>
            <footer className='bg-dark'>
                <div className='top-footer'>
                    <section className='foot-columns'>
                        <div>
                            <h5 className='c-white'>Esplora</h5>
                            <ul className='foot-list c-gray'>
                                {/* Navigazione programmata per simulare il cambio pagina */}
                                <li onClick={() => handleNavigation("/about")} style={{ cursor: 'pointer' }}>
                                    Chi siamo
                                </li>
                                <li style={{ cursor: 'pointer' }}>Contatti</li>
                                <li style={{ cursor: 'pointer' }}>FAQ</li>
                            </ul>
                        </div>

                        <div>
                            <h5 className='c-white'>Policy</h5>
                            <ul className='foot-list c-gray'>
                                <li style={{ cursor: 'pointer' }}>Cookie</li>
                                <li style={{ cursor: 'pointer' }}>Privacy</li>
                                <li style={{ cursor: 'pointer' }}>Termini e condizioni</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className='c-white'>Supporto</h5>
                            <ul className='foot-list c-gray'>
                                <li style={{ cursor: 'pointer' }}>Il tuo robot ha bisogno di cure?</li>
                                <li style={{ cursor: 'pointer' }}>Assistenza</li>
                            </ul>
                        </div>
                    </section>

                    <section className='font-sect c-white'>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faXTwitter} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                    </section>
                </div>

                <div className='bot-footer'>
                    <p>©2026 Aeterna. Touch what time erased.</p>
                </div>
            </footer>
        </>
    )
}