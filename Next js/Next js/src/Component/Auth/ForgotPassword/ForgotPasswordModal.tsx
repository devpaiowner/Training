import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PhoneForgotPassword from './PhoneForgotPassword';
import EmailForgotPassword from './EmailForgotPassword';
import { PLAYXCHIP_DEFAULT_IMAGE_URL } from '@/Config/Config';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });
const ForgotPasswordModal = () => {

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
            <div className="modal moder_s1 fade" id="ForgotModel" tabIndex={-1} aria-labelledby="LoginModelLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-xl modal-dialog-centered">
                    <div className="modal-content" style={{ height: "500px" }}>
                        <div className="modal-body">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><img src="images/close-btn.svg" /></button>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className='modleRight'>
                                        <h6 className="text-center my-4">Forgot Password</h6>

                                        <div className="row">
                                            <div className="col-md-9 mx-auto mt-5">
                                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                    <li className="nav-item flex-fill" role="presentation">
                                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-forgot-phone" type="button" role="tab" aria-controls="pills-home" aria-selected="true">BY PHONE</button>
                                                    </li>
                                                    <li className="nav-item flex-fill" role="presentation">
                                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-forgot-email" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">BY E-MAIL</button>
                                                    </li>
                                                </ul>
                                                <div className="tab-content" id="pills-tabContent">
                                                    <PhoneForgotPassword />
                                                    <EmailForgotPassword />
                                                </div>
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
export default ForgotPasswordModal
{/* <div className='row'>
    <div className='col-md-9 mx-auto mt-5'>
        <form>
            <div className="formBox">
                <div>
                    <input type="email" className="form-control" placeholder="Enter Email Address" />
                    <span className="icon_L icon-email"></span>
                </div>
            </div>
            <button type="button" className="btn btn-primary f-24 mt-4 w-100">Submit</button>
        </form>
    </div>
</div> */}
