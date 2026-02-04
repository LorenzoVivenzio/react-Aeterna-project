import Header from "../components/Header";
import VideoBanner from "../components/VideoBanner";


export default function Home() {
  
  return (
    <>

    <div className="hero-banner">
      
      <Header/>  
    <div className="top-hero-banner">
     <p className="text-hero text-center">il 5% delle entrate andrà al wwf</p> 
      </div>
      <div className="slogan">
        <h1 className="text-slogan text-white">SAVE THE ANIMALS</h1>
        <p className="text-white text-center">AETERNA : Nati per restare</p>
        </div>

      <div className="btn-banner">
        
        <button className="btn-btn-banner">visualizza i prodotti </button>
      </div>
    </div>
    <VideoBanner/>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
    </>
  )
}