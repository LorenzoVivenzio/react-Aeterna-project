import { useEffect, useState } from "react";
import CardHome from "../components/CardHome";
import VideoBanner from "../components/VideoBanner";
import axios from "axios";
import Chat from "../components/Chat.jsx";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [created, setCreated] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/?is_featured=suggested`,
      )
      .then((res) => {
        setFeatured(res.data.results);
      })
      .catch((err) => console.error("Errore consigliati:", err));

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/?created_at=last`)
      .then((res) => {
        setCreated(res.data.results);
      })
      .catch((err) => console.error("Errore ultimi arrivi:", err));
  }, []);

  return (
    <>
      <div className="hero-banner">
        <div className="top-hero-banner">
          <p className="text-hero text-center text-white p-2">
            Il 20% del ricavato sarà donato ad associazioni che sostengono
            specie a rischio
          </p>
        </div>
        <div className="slogan">
          <h1 className="text-slogan text-white anta-head">
            TOUCH WHAT TIME ERASED
          </h1>
          <div className="btn-slogan">
            <button className="btn-btn-banner">
              <a className="text-white mt-4" href="#ultimi-arrivi ">
                vai alle notività
              </a>
            </button>
          </div>
        </div>
      </div>

      <VideoBanner />

      <div className="container my-5">
        <section className="mb-5">
          <h1 className="mb-4">I nostri consigliati</h1>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {featured.map((product, index) => (
              <div key={index} className="col">
                <CardHome product={product} />
              </div>
            ))}
          </div>
        </section>

        <hr />

        {/* <section
          id="ultimi-arrivi"
          className="mt-5">
          <h1 className="mb-4">Ultimi arrivi</h1>
          <div className="row ">
            {created.map((product) => (
              <div className="col-2" key={product.id}>
                <CardHome product={product} />
              </div>
            ))}
          </div>
        </section> */}

        <section id="ultimi-arrivi" className="mt-5">
          <h1 className="mb-4">Ultimi arrivi</h1>
          {/* Cambia 'row' con 'scroll-wrapper' */}
          <div className="scroll-wrapper">
            {created.map((product, index) => (
              /* Rimuovi 'col-2' e usa una classe per la card */
              <div key={index} className="scroll-item">
                <CardHome product={product} />
              </div>
            ))}
          </div>
        </section>
        <Chat />
      </div>
    </>
  );
}
