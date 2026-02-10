import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="product-detail-page bg-black min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container d-flex justify-content-center">
        {/* Usiamo la classe card-container che ha il clip-path HUD */}
        <div className="card-container text-center" style={{ maxWidth: "600px" }}>
          <h1 className="display-1 fw-bold anta-font" style={{ color: "#50cbd1" }}>
            404
          </h1>
          <h2 className="anta-font mb-4 text-uppercase">Sistema Corrotto</h2>
          <p className="mb-5">
            L'unità informativa richiesta è andata perduta nel tempo o non è mai stata sintetizzata dai laboratori Aeterna.
          </p>
          
          <div className="d-flex justify-content-center">
            <Link to="/" className="btn-cart2 text-decoration-none">
              TORNA ALLA HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}