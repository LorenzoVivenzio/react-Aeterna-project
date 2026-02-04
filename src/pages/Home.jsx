import { useEffect, useState } from "react";
import CardHome from "../components/CardHome";
import Header from "../components/Header";
import VideoBanner from "../components/VideoBanner";
import axios from "axios";
export default function Home() {
  const [Featured, setFeatured] = useState([]);
  const [created, setCreated] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/?is_featured=suggested`,
      )
      .then((data) => {
        setFeatured(data.data.results);
      });
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/?created_at=last`)
      .then((data) => {
        setCreated(data.data.results);
      });
  }, []);

  return (
    <>
      <div className="hero-banner">
        <div className="top-hero-banner">
          <p className="text-hero text-center">
            Il 20% del ricavato sarà donato ad associazioni che sostengono
            specie a rischio
          </p>
        </div>
        <div className="slogan">
          <h1 className="text-slogan text-white">TOUCH WAHT TIME ERASED</h1>
        </div>
      </div>

      <VideoBanner />
      <div className="container">
        <h1>I nostri consigliati</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {Featured.map((product) => (
            <CardHome key={product.id} product={product} />
          ))}
        </div>
        <h1>Ultimi arrivi</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {created.map((product) => (
            <CardHome key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
