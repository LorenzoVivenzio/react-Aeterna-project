import Header from "../components/Header";
import VideoBanner from "../components/VideoBanner";

export default function Home() {
  return (
    <>
      <div className="hero-banner">
        <Header />
        <div className="top-hero-banner">
          <p className="text-hero text-center">il 5% delle entrate andrà al wwf</p>
        </div>

        <div className="slogan">
          <h1 className="text-slogan text-white">SAVE THE ANIMALS</h1>
          <p className="text-white text-center">AETERNA : Nati per restare</p>
        </div>

        <div className="btn-banner">
          <button className="btn-btn-banner">visualizza i prodotti</button>
        </div>
      </div>

    
      
      <VideoBanner />

      <div className="container py-5">
        <p className="text-white-50">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>
    </>
  );
}