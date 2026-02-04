export default function VideoBanner() {
    return (
        <>
            <section className="section-video pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-8 video-lv roundend-1">
                            <div className="video-product ">
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="video-banner "
                                    src="src/public/video/viedo-banner.mp4">
                                </video>
                                <div className="btn-video">
                                    <button className="btn-btn-video ">Scopri di più</button>
                                </div>
                            </div>


                        </div>
                        <div className="col-4 bg-white roundend-1">
                            <h3 className="text-center my-5">L'Eccellenza Sotto la Scocca: Ingegneria Senza Tempo</h3>
                            <p className="text-center my-4">
                                Aeterna offre prodotti di bio-ingegneria avanzata che uniscono estetica naturale e tecnologia d’avanguardia. Ogni unità è progettata come un bene duraturo e collezionabile, destinata a evolversi senza invecchiare. La struttura in Titanio Grado 5 garantisce resistenza, leggerezza, biocompatibilità e durata nel tempo, mentre ogni componente è testato per milioni di cicli operativi. Non si tratta solo di tecnologia, ma di artigianato digitale che preserva la bellezza naturale attraverso la perfezione meccanica.

                                Ogni esemplare è un equilibrio perfetto tra potenza e eleganza, capace di integrarsi armoniosamente nell’ambiente umano. La precisione ingegneristica assicura performance costanti e affidabili, mentre il design senza tempo lo rende un oggetto ammirato tanto quanto funzionale. Aeterna non vende solo macchine: offre un’esperienza sensoriale e un investimento per il futuro. Il risultato è una tecnologia che sfida il tempo.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}