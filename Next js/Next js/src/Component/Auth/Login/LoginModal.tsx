import React, { Fragment } from 'react'
import PhoneLogin from './PhoneLogin'
import EmailLogin from './EmailLogin'
import { useDispatch, useSelector } from 'react-redux';
import { PLAYXCHIP_DEFAULT_IMAGE_URL } from '@/Config/Config';
import dynamic from 'next/dynamic';
import RegisterBonus from '../RegisterBonus';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

const LoginModal = () => {

    const PromotionsList = useSelector((state: any) => state.GetPromotionsState);

    const banneroptions = {
        0: {
            items: 1,
            stagePadding: 0,
            nav: false,
            smartSpeed: 2000

        },
        600: {
            items: 1,
            smartSpeed: 2000

        },
        1000: {
            smartSpeed: 2000
        },
        1400: {
            smartSpeed: 2000
        },

    };

    return (
        <>
            <div className="modal moder_s1 fade" id="LoginModel" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content px-0">
                        <div className="modal-body">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><img src="images/close-btn.svg" /></button>
                            <div className="row g-0 align-items-stretch">
                                {/* <div className="d-none d-lg-flex col-lg-5 mText_left text-center">
                                    <div className="modelLeft p-4">
                                        <h6>Get 4 FreeBets 4,500 in total</h6>
                                        <img src="images/modleRight.png" alt="modelLogo" />
                                    </div>
                                </div> */}
                                <RegisterBonus />
                                <div className="col-lg-7">
                                    <div className="modleRight">
                                        <h1>Login</h1>
                                        <div className="row">
                                            <div className="col-md-9 mx-auto mt-5">
                                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                    <li className="nav-item flex-fill" role="presentation">
                                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">BY PHONE</button>
                                                    </li>
                                                    <li className="nav-item flex-fill" role="presentation">
                                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">BY E-MAIL</button>
                                                    </li>
                                                </ul>
                                                <div className="tab-content" id="pills-tabContent">
                                                    <PhoneLogin />
                                                    <EmailLogin />
                                                </div>
                                                <p className="connectWIth"><span>Connect with us</span></p>
                                                <div className="otherJoin d-flex">
                                                    <a href="#" className="btn btn-secoundry flex-fill"><img src="images/google.svg" /> Google</a>
                                                    {/* <a href="#" className="btn btn-secoundry flex-fill ms-4"><img src="images/telegram.svg" /> Telegram</a> */}
                                                </div>
                                                <p className="donotAccount">Don't have an account yet? <a href="#RegisterModel" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal">Registration</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginModal