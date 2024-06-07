import React from 'react'

const Maintenance = () => {
    return (
        <div className="container p-0 text-center text-md-start">
            <div className="row g-0 align-items-center">
                <div className="col-md-6 p-5">
                    <div className="row">
                        <div className="col-md-12 col-lg-9">
                            <h1>Playxchip</h1>
                            <p className="mt-3 mt-lg-5"><img style={{ width: "100px" }} src="images/image-maintenance.png" /></p>
                            <h1 className="mt-lg-5">Under Maintenence</h1>
                            <p>Our website is currentyly undergoing scheduled maintenance. We should be back shortyly.<br /> Thank you for your patience.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <img src="images/img-2.svg" style={{ maxHeight: "700px" }} />
                </div>
            </div>
        </div>
    )
}

export default Maintenance