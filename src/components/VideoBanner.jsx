export default function VideoBanner(){
    return(
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
                    <h3 className="text-center">bla bla bla</h3>
                    <p className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                </div>
            </div>
        </div>
        </section>
        </>
    )
}