import React, { Fragment, useEffect } from 'react'
import PhoneRegistration from './PhoneRegistration'
import EmailRegistration from './EmailRegistration'
import OneClickRegistration from './OneClickRegistration'
import RegisterBonus from '../RegisterBonus';
import $ from 'jquery';
import { useRouter } from 'next/navigation';
import { RouteConfig } from '@/Config/CommonConfig';
import { saveToLocalStorage, saveToSessionStorage } from '@/utils/Helper';

const RegisterModal = () => {

    const router = useRouter();

    const handleNavigate = (route: any) => {
        router.push(route)
        $('.btn-close').click()
    }


    return (
        <>
            <div className="modal moder_s1 fade" id="RegisterModel" tabIndex={-1} aria-labelledby="LoginModelLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><img src="images/close-btn.svg" /></button>
                            <div className="row">
                                <RegisterBonus />
                                {/* <div className="d-none d-lg-flex col-lg-4 mText_left text-center">
                                    <div className="modelLeft p-4">
                                        <h6>Get 4 FreeBets 4,500 in total</h6>
                                        <img src="images/modleRight.png" alt="modelLogo" />
                                    </div>
                                </div> */}
                                <div className="col-lg-8">
                                    <div className="modleRight">
                                        <h1>Registration</h1>
                                        <ul className="nav nav-pills mb-3 mt-5" id="pills-tab" role="tablist">
                                            <li className="nav-item flex-fill" role="presentation">
                                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home1" type="button" role="tab" aria-controls="pills-home1" aria-selected="true"><img src="images/mobile.svg" /> BY PHONE</button>
                                            </li>
                                            <li className="nav-item flex-fill" role="presentation">
                                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile1" type="button" role="tab" aria-controls="pills-profile1" aria-selected="false"><img src="images/email.svg" />BY E-MAIL</button>
                                            </li>
                                            <li className="nav-item flex-fill" role="presentation">
                                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile2" type="button" role="tab" aria-controls="pills-profile2" aria-selected="false"><img src="images/superpowers.svg" />ONE-CLICK</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <PhoneRegistration />
                                            <EmailRegistration />
                                            <OneClickRegistration />
                                        </div>
                                        <div className="bottomTex">
                                            {/* <p>This site is protected by reCAPTCHA and the Google <a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.Pages}?slug=privacypolicy`)}>Privacy Policy</a> and <a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.Pages}?slug=terms_of_service`)}>Terms of Service</a> apply.</p> */}
                                            {/* <div className="d-flex ms-5">
                                                <input type="checkbox" className="me-2 fs-6 form-check-input" onClick={(e: any) => saveToSessionStorage('acceptTnC', e?.target?.checked)} />
                                                <p>I acknowledge that I have read and agree to the <a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.Pages}?slug=privacypolicy`)}>Terms and Conditions</a> & <a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.Pages}?slug=terms_of_service`)}>Privacy Policy</a>.</p>
                                            </div> */}
                                            {/* <p>By clicking this button you confirm that you have read and agree to the <a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.Pages}?slug=terms_and_condition`)}>Terms and Conditions</a> and <a className='cursor-pointer' onClick={() => handleNavigate(`${RouteConfig?.Pages}?slug=privacypolicy`)}>Privacy Policy</a> of the company and confirm that you are of legal age</p> */}
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

export default RegisterModal