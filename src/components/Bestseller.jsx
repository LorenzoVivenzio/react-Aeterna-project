// I PIU VENDUTI
import "./Bestseller.css"


export default function Bestseller() {
    return (
        <>
            <section className="mt-5 ">
                <div className="container border-top">

                    <h3 className="mt-3 mb-3">BESTSELLER</h3>
                    <div className="row">

                        <div className=" col-6 card-container bestseller">
                            <div className="bestseller-img">
                                <img  src="src/public/img/dodo.jpg" alt="" className="card-image"/>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <h3 className="mt-3 product-name">Dodo</h3>
                                    <p className="pt-1 product-price">$13,99</p>
                                </div>
                                <div className="col-4">
                                    <button className="btn-bestseller">scopri di più</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </>
    )
}