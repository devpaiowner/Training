import React from 'react'
import { Images } from '../../constants/ImageConstants'
import { useSelector } from 'react-redux';
import Loader from '../../components/Layouts/Loader';

const Home = () => {
    const profile = useSelector((state: any) => state.GetProfileState);

    return (
        <>
            {profile?.loading && <Loader />}
            <main className="main-content">
                <section className="get-ride-sec">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <img className="w-100 h-100" src={Images?.GET_RIDE_IMG} alt="" />
                            </div>
                            <div className="col-md-6">
                                <form className="get-ride-form dark-bg-2">
                                    <h1 className="ttl">Get a Ride</h1>
                                    <div className="icon-input">
                                        <i className="icon-pickup"></i>
                                        <input className="com-input" type="text" placeholder="Pickup" />
                                    </div>
                                    <div className="icon-input">
                                        <i className="icon-location"></i>
                                        <input className="com-input" type="text" placeholder="Destination" />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-7">
                                            <button className="com-btn w-100">Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-content text-white">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 pt-4">
                                <h2 className="text-white">Drive when you want, make what you need</h2>
                                <div className="txt-grp">
                                    <h3 className="text-white">RIDE WITH <span className="golden-text">DAIS</span> TODAY!</h3>
                                    <p>Dais provides fast and simple booking of on-demand wheelchair-accessible and adaptive rides</p>
                                </div>
                                <div className="txt-grp">
                                    <h3 className="text-white">SELECT YOUR <span className="golden-text">DAIS</span> RIDE</h3>
                                    <p>Simply choose which ride service will best meet your needs, book the ride, and be automatically connected to the nearest professional driver</p>
                                </div>
                                <div className="txt-grp">
                                    <h3 className="text-white">ENJOY YOUR RIDE!</h3>
                                    <p>Rest assured and be prepared for pick up with live tracking of your drivers location within the Dais application.</p>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <a className="com-btn w-100" href="#">Get Started</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 ps-5">
                                <img src={Images?.CURV_IMG_1} alt="ride img" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-content text-white">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 pe-5">
                                <img src={Images?.CURV_IMG_2} alt="ride img" />
                            </div>
                            <div className="col-md-6 pt-4">
                                <h2 className="text-white">Dais provide you platform grow your lifestyle</h2>
                                <div className="txt-grp">
                                    <h3 className="text-white">Drive with <span className="golden-text">DAIS</span></h3>
                                    <p>Join the first on-demand ride-sharing platform exclusively for wheelchair users and individuals with mobility limitations.</p>
                                </div>
                                <div className="txt-grp">
                                    <h3 className="text-white">EARN THE MOST</h3>
                                    <p><span className="golden-text">Dais</span> pays the highest commissions in the industry. We also strongly encourage and facilitate rider tips at the time of booking. </p>
                                </div>
                                <div className="txt-grp">
                                    <h3 className="text-white">Professional Driver Community</h3>
                                    <p><span className="golden-text">Dais</span> provides free and fast training for all drivers. We ensure you have the skills necessary to assist a population that has been long underserved.</p>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <a className="com-btn w-100" href="#">Get Started</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </main>

        </>
    )
}

export default Home