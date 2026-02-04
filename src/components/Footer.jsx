// ------------FontAwesome------------
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
// ----------------CSS----------------
import './Footer.css'

// import { NavLink, Link } from 'react-router-dom';

export default function Footer() {


    return (
        <>
            <footer className='bg-dark'>
                <div className='top-footer'>
                    <section className='foot-columns'>
                        <div>
                            <h5 className='c-white'>Esplora</h5>
                            <ul className='foot-list c-gray'>
                                <li>Chi siamo</li>
                                <li>Contatti</li>
                                <li>FAQ</li>

                            </ul>
                        </div>

                        <div>
                            <h5 className='c-white'>Policy</h5>
                            <ul className='foot-list c-gray'>
                                <li>Cookie</li>
                                <li>Privacy</li>
                                <li>Termini e condizioni</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className='c-white'>Supporto</h5>
                            <ul className='foot-list c-gray'>
                                <li>Il tuo robot ha bisogno di cure?</li>
                                <li>Assistenza</li>

                            </ul>
                        </div>
                    </section>
                    <section className='font-sect c-white'>
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faXTwitter} />
                        <FontAwesomeIcon icon={faYoutube} />
                    </section>
                </div>

                <div className='bot-footer'>
                    <p>©2026 Aeterna. Touch what time erased.</p>
                </div>
            </footer>
        </>
    )
}