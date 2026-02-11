import { Link } from "react-router-dom";

export default function VideoBanner() {
  return (
    <>
      <section className="section-video pt-5">
        <div className="container">
          <div className="row">
            <div 
            className="col-sm-12 col-md-12 col-lg-8 video-lv rounded-1">
              <div className="video-product ">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="video-banner "
                  src="src/public/video/viedo-banner.mp4"
                  // src="src/public/Pierfilippo_IA.mp4"
                ></video>
                <div className="btn-video">
                  <Link to="/products">
                    <button className="btn-btn-banner anta-font text-dark">Scopri di più</button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="descrition col-sm-12 col-md-12 col-lg-4 mt-5">
              {" "}
              {/* Corretto typo 'roundend' */}
              <h4 className="text-center pt-5 pb-2 anta-head">
               Bio-ingegneria di lusso e precisione
              </h4>
              <p
                className="text-center my-4 px-3"
              >
                "Aeterna non progetta macchine, ma scolpisce il futuro nel titanio: 
                dove la perfezione meccanica incontra l'immortalità del design."
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
