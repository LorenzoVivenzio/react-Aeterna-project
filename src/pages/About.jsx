import React from "react";

export default function About() {
  return (
    <div className="container-fluid p-0 overflow-hidden">
      <section
        className="bg-dark text-white text-center py-5 shadow"
        style={{
          background:
            "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "45vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <h1 className="display-2 fw-bold tracking-tight">
            AETERNA <span className="text-primary">DYNAMICS</span>
          </h1>
          <p className="lead fs-4 opacity-75">
            Architetti della biosfera. Pionieri del domani.
          </p>
        </div>
      </section>

      <section className="container py-5 mt-lg-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h6 className="text-primary fw-bold text-uppercase ls-2 mb-3">
              Chi Siamo
            </h6>
            <h2 className="display-5 fw-bold mb-4">
              La Scienza al Servizio della Vita
            </h2>
            <p className="text-muted fs-5 mb-4 leading-relaxed">
              Nata nei laboratori di bio-ingegneria più avanzati,{" "}
              <strong>Aeterna Dynamics</strong> si pone l'obiettivo di invertire
              la rotta dell'estinzione globale.
            </p>
            <p className="mb-5 fs-5">
              Non ci limitiamo a studiare il DNA; lo interpretiamo per ridare
              voce a specie che il tempo ha dimenticato. Ogni nostra cellula
              artificiale è progettata per integrarsi perfettamente negli
              ecosistemi moderni, garantendo un equilibrio tra tecnologia e
              natura mai visto prima.
            </p>

            <div className="d-flex justify-content-center gap-5 mt-4">
              <div className="text-center">
                <h3 className="fw-bold text-primary mb-0 display-6">150+</h3>
                <small className="text-uppercase text-muted fw-bold">
                  Specie Protette
                </small>
              </div>
              <div className="vr"></div>
              <div className="text-center">
                <h3 className="fw-bold text-primary mb-0 display-6">24/7</h3>
                <small className="text-uppercase text-muted fw-bold">
                  Monitoraggio IA
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE VALORI: Bootstrap Cards */}
      <section className="bg-light py-5 border-top border-bottom mt-5">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm transition-hover">
                <div className="card-body p-4 text-center">
                  <div className="bg-primary-subtle text-primary p-3 rounded-circle d-inline-block mb-3">
                    <span className="fs-3">🧬</span>
                  </div>
                  <h5 className="fw-bold">Bio-Genetica Avanzata</h5>
                  <p className="card-text text-muted small">
                    Algoritmi proprietari per la ricostruzione di sequenze
                    genomiche complesse con precisione del 99.9%.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm transition-hover">
                <div className="card-body p-4 text-center">
                  <div className="bg-success-subtle text-success p-3 rounded-circle d-inline-block mb-3">
                    <span className="fs-3">🌿</span>
                  </div>
                  <h5 className="fw-bold">Ecologia Etica</h5>
                  <p className="card-text text-muted small">
                    Ogni progetto Aeterna è certificato dal protocollo Bio-Safe
                    per il rispetto della fauna esistente.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm transition-hover">
                <div className="card-body p-4 text-center">
                  <div className="bg-info-subtle text-info p-3 rounded-circle d-inline-block mb-3">
                    <span className="fs-3">📡</span>
                  </div>
                  <h5 className="fw-bold">Controllo Remoto</h5>
                  <p className="card-text text-muted small">
                    Monitoraggio costante tramite rete satellitare Aeterna-Net
                    per garantire la sicurezza delle installazioni.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
